"use strict";
// import { dbSession, sessionInfoType } from '../../db/db_session';
// import { getSettings } from "../../config/settings";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionHandler = void 0;
// const ONE_HOUR = 60 * 60 * 1000;
// type dbSessionType = typeof dbSession;
// type settingType = typeof setting;
// export type ctxSessionType = {sessionInfo: sessionInfoType, userId?: string};
// export function sessionCtor(dbSession: dbSessionType, setting: settingType) {
//   function getSessionCookieMaxAge(setting) {
//     return setting.sessionCookieMaxAge || ONE_HOUR;
//   }
//   function getSessionCookieName(setting) {
//     if (setting.sessionCookieName) {
//       return setting.sessionCookieName;
//     }
//     return "_sessionId";
//   }
//   function getSessionCookieSecure(setting) {
//     return setting.sessionCookieSecure || false;
//   }
//   async function init(ctx, setting) {
//     const sessionCookieName = getSessionCookieName(setting);
//     const sessionId = ctx.cookies.get(sessionCookieName);
//     if (sessionId) {
//       ctx.sessionInfo = await dbSession.verify(sessionId, ctx.requestId);
//     }
//     if (!ctx.sessionInfo) {
//       ctx.sessionInfo = await dbSession.create(ctx.requestId);
//     }
//     ctx.session = ctx.sessionInfo.data;
//   }
//   async function clearCookie(ctx, setting) {
//     const sessionCookieName = getSessionCookieName(setting);
//     ctx.cookies.set(sessionCookieName);
//   }
//   async function setCookie(ctx, setting) {
//     const sessionCookieName = getSessionCookieName(setting);
//     const sessionCookieMaxAge = getSessionCookieMaxAge(setting);
//     const secure = getSessionCookieSecure(setting);
//     try {
//       ctx.cookies.set(
//         sessionCookieName,
//         ctx.sessionInfo.sessionId,
//         {
//           maxAge: sessionCookieMaxAge,
//           httpOnly: true,
//           secure,
//         });
//     } catch (e) {
//     }
//   }
//   async function commit(ctx, getSettings) {
//     const sessionCookieMaxAge = getSessionCookieMaxAge(setting);
//     await dbSession.update(ctx.sessionInfo, sessionCookieMaxAge, ctx.requestId);
//   }
//   async function middleware(ctx, next) {
//     const s = await getSettings();
//     if (ctx.url.match('/logout')) {
//       await clearCookie(ctx, s);
//       ctx.redirect('/app');
//       return;
//     } else {
//       await init(ctx, s);
//       await setCookie(ctx, s);
//       await next();
//       await commit(ctx, s);
//     }
//   }
//   return {
//     getSessionCookieName,
//     getSessionCookieMaxAge,
//     middleware,
//   };
// }
function sessionHandler(context) {
    return {
        ...context,
    };
}
exports.sessionHandler = sessionHandler;
// export const session = sessionCtor(
//   dbSession,
//   getSettings,
// );
//# sourceMappingURL=index.js.map