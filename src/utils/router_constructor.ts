type routerType = {
  addRoute: (path: string, controllerMethod: controllerMethodType, httpMethod: string) => void,
  get: (path: string, method: controllerMethodType) => void,
  post: (path: string, method: controllerMethodType) => void,
}

function routerContstructor (prefix: string): routerType {
  return {
    addRoute: (path, controllerMethod, httpMethod) => {
      this[prefix + path + httpMethod] = controllerMethod;
    },
    get: (path, method) => {
      this.addRoute(path, method, 'get');
    },
    post: (path, method) => {
      this.addRoute(path, method, 'post');
    },
  }
}

export { routerType, routerContstructor };