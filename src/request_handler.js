"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestHandlerConstructor = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const resolved_null_1 = require("./utils/resolved_null");
const requestHandlerConstructor = (sessionHandler, db, routes, middleware = []) => {
    return async function requestHandlerInstance(request, response) {
        try {
            const cookieHeaders = request?.headers['cookie'];
            const cookies = cookieHeaders ? cookieHeaders.reduce((accCookies, cookie) => {
                const cookieParts = cookie.split(';');
                return {
                    ...accCookies,
                    [cookieParts.shift().trim()]: decodeURI(cookieParts.join('=')),
                };
            }, {}) : {};
            const requestUrl = new url_1.URL(`${process.env.BASE_URL}${request.url}`);
            const context = createContext(sessionHandler, ...middleware)({
                request,
                response,
                cookies,
            });
            const matchingRoute = findMatchingRoute(requestUrl.pathname, routes);
            if (matchingRoute && matchingRoute[context.request.method]) {
                if (matchingRoute[context.request.method].auth(context.session)) {
                    db.tx((db) => {
                        context.db = db;
                        matchingRoute[context.request.method].handler(context);
                    });
                }
                else {
                    serveError(403, response);
                }
            }
            else {
                serveError(404, response);
            }
        }
        catch (error) {
            console.error(`Error: ${error.message}`, error);
            serveError(500, response);
        }
        response.end();
        return await resolved_null_1.resolvedNull;
    };
};
exports.requestHandlerConstructor = requestHandlerConstructor;
const findMatchingRoute = (pathname, routes) => {
    if (!routes) {
        return undefined;
    }
    return routes[pathname] ?
        routes[pathname]
        : routes[pathname + '/'] ?
            routes[pathname + '/']
            : pathname[pathname.length - 1] === '/' && routes[pathname.slice(0, pathname.length - 1)] ?
                routes[pathname.slice(0, pathname.length - 1)]
                :
                    undefined;
};
const serveError = (errorCode, response) => {
    const html = fs_1.default.readFileSync(path_1.default.join(__dirname + `/views/${errorCode}.html`));
    response.setHeader('Content-Type', 'text/html');
    response.writeHead(errorCode);
    response.write(html);
};
const createContext = (...middleware) => (initialContext) => middleware.reduce((accContext, fn) => fn(accContext), initialContext);
//# sourceMappingURL=request_handler.js.map