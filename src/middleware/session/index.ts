import { dbSession } from '../../db/db_session';
import { getSettings, settingsType } from '../../config/settings';
import { contextType } from '../../request_handler';

const ONE_HOUR = 60 * 60 * 1000;

export function sessionConstructor(getSettings: () => settingsType) {
  function getSessionCookieMaxAge(settings: settingsType) {
    return settings.sessionCookieMaxAge || ONE_HOUR;
  }

  function getSessionCookieName(settings: settingsType) {
    return settings.sessionCookieName ? settings.sessionCookieName : "_sessionId";
  }

  function clearCookie(context: contextType, settings: settingsType) {
    const sessionCookieName = getSessionCookieName(settings);
    context.response.setHeader('Set-Cookie', [...context.cookies, `${sessionCookieName}=${context.session.id}; Expires=${Date.now()};` ]);
  }

  function setCookie(context: contextType, settings: settingsType) {
    const sessionCookieName = getSessionCookieName(settings);
    const sessionCookieMaxAge = getSessionCookieMaxAge(settings);

    context.response.setHeader('Set-Cookie', [...context.cookies, `${sessionCookieName}=${context.session.id}; Max-Age=${sessionCookieMaxAge}; HttpOnly` ]);
  }

  async function initSession(context: contextType, settings: settingsType) {
    const sessionCookieName = getSessionCookieName(settings);

    if (context?.cookies[sessionCookieName]) {
      context.session = await dbSession.verify(context.cookies[sessionCookieName]);
    }

    if (!context.session) {
      context.session = await dbSession.create();
    }
  }

  async function updateSessionInDb(context: contextType, settings: settingsType) {
    const sessionCookieMaxAge = getSessionCookieMaxAge(settings);
    await dbSession.update(context.session, sessionCookieMaxAge);
  }

  return function sessionHandler(context: contextType) {
    const settings = getSettings();

    initSession(context, settings);
    setCookie(context, settings);
    updateSessionInDb(context, settings);

    return context;
  }
}

export const sessionHandler = sessionConstructor(
  getSettings,
);