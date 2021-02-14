import {dbSession, sessionInfoType} from '../../db/db_session';
import {setting} from "../../setting";

const ONE_HOUR = 60 * 60 * 1000;

type dbSessionType = typeof dbSession;
type settingType = typeof setting;

export type ctxSessionType = {sessionInfo: sessionInfoType, userId?: string};

export function sessionCtor(dbSession: dbSessionType, setting: settingType) {
  function getSessionCookieMaxAge(setting) {
    return setting.sessionCookieMaxAge || ONE_HOUR;
  }

  function getSessionCookieName(setting) {
    if (setting.sessionCookieName) {
      return setting.sessionCookieName;
    }
    return "_sessionId";
  }

  function getSessionCookieSecure(setting) {
    return setting.sessionCookieSecure || false;
  }

  async function init(ctx, setting) {
    const sessionCookieName = getSessionCookieName(setting);
    const sessionId = ctx.cookies.get(sessionCookieName);
    debug(`init sessionId: ${JSON.stringify(sessionId)}`);

    if (sessionId) {
      ctx.sessionInfo = await dbSession.verify(sessionId, ctx.requestId);
    }

    if (!ctx.sessionInfo) {
      ctx.sessionInfo = await dbSession.create(ctx.requestId);
    }

    ctx.session = ctx.sessionInfo.data;

    debug(`sessionInfo: ${JSON.stringify(ctx.sessionInfo)}`);
  }

  async function clearCookie(ctx, setting) {
    const sessionCookieName = getSessionCookieName(setting);
    ctx.cookies.set(sessionCookieName);
  }

  async function setCookie(ctx, setting) {
    const sessionCookieName = getSessionCookieName(setting);
    const sessionCookieMaxAge = getSessionCookieMaxAge(setting);
    const secure = getSessionCookieSecure(setting);

    try {
      debug(`setCookie ${JSON.stringify({
        sessionInfo: ctx.sessionInfo,
        sessionCookieMaxAge,
        secure,
      })}`);
      ctx.cookies.set(
        sessionCookieName,
        ctx.sessionInfo.sessionId,
        {
          maxAge: sessionCookieMaxAge,
          httpOnly: true,
          secure,
        });
    } catch (e) {
      debug("Could not set Cookie (in a websocket?)");
    }
  }

  async function commit(ctx, setting) {
    const sessionCookieMaxAge = getSessionCookieMaxAge(setting);
    debug(`commit ${JSON.stringify({sessionInfo: ctx.sessionInfo, sessionCookieMaxAge})}`);
    await dbSession.update(ctx.sessionInfo, sessionCookieMaxAge, ctx.requestId);
  }

  async function middleware(ctx, next) {
    const s = await setting();
    if (ctx.url.match('/logout')) {
      await clearCookie(ctx,s);
      ctx.redirect('/app');
      return;
    } else {
      debug("init");
      await init(ctx, s);
      debug("setCookie");
      await setCookie(ctx, s);
      debug("next");
      await next();
      debug("commit");
      await commit(ctx, s);
      debug("fini");
    }
  }

  return {
    getSessionCookieName,
    getSessionCookieMaxAge,
    middleware,
  };
}

export const session = sessionCtor(
  dbSession,
  setting,
);