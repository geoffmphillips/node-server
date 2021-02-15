"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestHandlerConstructor = void 0;
const url_1 = require("url");
const resolved_promise_1 = require("./utils/resolved_promise");
const requestHandlerConstructor = (sessionHandler, dbProvider, routes, middleware = []) => {
    return async function requestHandlerInstance(request, response) {
        const cookieHeaders = request.headers['cookie'];
        const cookies = cookieHeaders ? cookieHeaders.reduce((accCookies, cookie) => {
            const cookieParts = cookie.split(';');
            return {
                ...accCookies,
                [cookieParts.shift().trim()]: decodeURI(cookieParts.join('=')),
            };
        }, {}) : {};
        const requestUrl = new url_1.URL(`${process.env.BASE_URL}${request.url}`);
        const context = createContext(dbProvider, sessionHandler, ...middleware)({
            request,
            response,
            cookies,
            requestUrl,
        });
        if (routes[requestUrl.pathname] && routes[requestUrl.pathname][context.request.method]) {
            // TO DO implement AUTH
            // if (context.auth.isAuthorized) {
            if (true) {
                routes[requestUrl.pathname][context.request.method](context);
            }
            else {
                routes[context.auth.isForbidden ? '403' : '401'](context);
            }
        }
        else if (routes['404']) {
            routes['404'].GET(context);
        }
        response.end();
        return await resolved_promise_1.resolvedPromise;
    };
};
exports.requestHandlerConstructor = requestHandlerConstructor;
const createContext = (...middleware) => (initialContext) => middleware.reduce((accContext, fn) => fn(accContext), initialContext);
//# sourceMappingURL=request_handler.js.map