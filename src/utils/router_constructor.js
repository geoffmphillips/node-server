"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerContstructor = void 0;
function routerContstructor(prefix) {
    const addRoute = (path, controllerMethod, httpMethod, __context) => {
        __context[prefix + path] = { [httpMethod]: controllerMethod };
    };
    const router = {
        addRoute,
        get: (path, method) => {
            addRoute(path, method, 'GET', router);
        },
        post: (path, method) => {
            addRoute(path, method, 'POST', router);
        },
    };
    return router;
}
exports.routerContstructor = routerContstructor;
//# sourceMappingURL=router_constructor.js.map