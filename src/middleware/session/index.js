"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionHandler = exports.sessionCtor = void 0;
const db_session_1 = require("../../db/db_session");
const settings_1 = require("../../config/settings");
const ONE_HOUR = 60 * 60 * 1000;
function sessionCtor(getSettings) {
    function getSessionCookieMaxAge(settings) {
        return settings.sessionCookieMaxAge || ONE_HOUR;
    }
    function getSessionCookieName(settings) {
        return settings.sessionCookieName ? settings.sessionCookieName : "_sessionId";
    }
    function clearCookie(context, settings) {
        const sessionCookieName = getSessionCookieName(settings);
        context.response.setHeader('Set-Cookie', [...context.cookies, `${sessionCookieName}=${context.session.id}; Expires=${Date.now()};`]);
    }
    function setCookie(context, settings) {
        const sessionCookieName = getSessionCookieName(settings);
        const sessionCookieMaxAge = getSessionCookieMaxAge(settings);
        context.response.setHeader('Set-Cookie', [...context.cookies, `${sessionCookieName}=${context.session.id}; Max-Age=${sessionCookieMaxAge}; HttpOnly`]);
    }
    async function initSession(context, settings) {
        const sessionCookieName = getSessionCookieName(settings);
        if (context?.cookies[sessionCookieName]) {
            context.session = await db_session_1.dbSession.verify(context.cookies[sessionCookieName]);
        }
        if (!context.session) {
            context.session = await db_session_1.dbSession.create();
        }
    }
    async function updateSessionInDb(context, settings) {
        const sessionCookieMaxAge = getSessionCookieMaxAge(settings);
        await db_session_1.dbSession.update(context.session, sessionCookieMaxAge);
    }
    return function sessionHandler(context) {
        const settings = getSettings();
        initSession(context, settings);
        setCookie(context, settings);
        updateSessionInDb(context, settings);
        return context;
    };
}
exports.sessionCtor = sessionCtor;
exports.sessionHandler = sessionCtor(settings_1.getSettings);
//# sourceMappingURL=index.js.map