"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestHandlerConstructor = void 0;
const url_1 = require("url");
const resolved_promise_1 = require("./utils/resolved_promise");
const requestHandlerConstructor = (sessionHandler, dbProvider, routes, middleware = []) => {
    return async function requestHandlerInstance(request, response) {
        console.log(request);
        const cookies = request.getHeader('Cookie').reduce((accCookies, cookie) => {
            const cookieParts = cookie.split(';');
            return {
                ...accCookies,
                [cookieParts.shift().trim()]: decodeURI(cookieParts.join('=')),
            };
        }, {});
        const middlewareContext = [dbProvider, sessionHandler, ...middleware].reduce((accContext, fn) => fn(accContext, request, response), {});
        const context = {
            request,
            response,
            cookies,
            ...middlewareContext,
        };
        const requestUrl = new url_1.URL(context.request.url);
        if (routes[requestUrl.pathname] && routes[requestUrl.pathname][context.request.method]) {
            if (context.auth.isAuthorized) {
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
//# sourceMappingURL=request_handler.js.map