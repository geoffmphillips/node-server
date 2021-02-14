type controllerMethodType = (context) => Promise<any>
type routerType = {
  addRoute: (path: string, controllerMethod: controllerMethodType, httpMethod: string, context) => void,
  get: (path: string, method: controllerMethodType) => void,
  post: (path: string, method: controllerMethodType) => void,
}

function routerContstructor(prefix: string): routerType {
  const addRoute = (path, controllerMethod, httpMethod, __context) => {
    __context[prefix + path] = { [httpMethod]: controllerMethod };
  }

  const router = {
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