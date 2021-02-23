"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerContstructor = void 0;
function routerContstructor(prefix) {
    let router;
    const addRoute = (path, controllerMethod, httpMethod, auth) => {
        router[prefix + path] = {
            [httpMethod]: {
                auth,
                handler: controllerMethod,
            }
        };
    };
    router = {
        addRoute,
        get: (path, method, auth) => {
            addRoute(path, method, 'GET', auth);
        },
        post: (path, method, auth) => {
            addRoute(path, method, 'POST', auth);
        },
    };
    return router;
}
exports.routerContstructor = routerContstructor;
//# sourceMappingURL=router_constructor.js.map