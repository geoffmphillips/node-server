type controllerMethodType = (context) => Promise<any>
type addRouteType = (path: string, controllerMethod: controllerMethodType, httpMethod: string, context: routerType) => void;
type typedAddRoute = (path: string, method: controllerMethodType) => void;
type routerType = {
  addRoute: addRouteType,
  get: typedAddRoute,
  post: typedAddRoute,
}

function routerContstructor(prefix: string): routerType {
  const addRoute: addRouteType = (path, controllerMethod, httpMethod, __context) => {
    __context[prefix + path] = { [httpMethod]: controllerMethod };
  }

  const router: routerType = {
    addRoute,
    get: (path, method) => {
      addRoute(path, method, 'GET', router);
    },
    post: (path, method) => {
      addRoute(path, method, 'POST', router);
    },
  }
  return router;
}

export { routerType, routerContstructor };