import { authType } from '../routes/auth/index';
import { contextType } from '../request_handler';

type controllerMethodType = (context) => Promise<any>
type addRouteType = (
  path: string, 
  controllerMethod: controllerMethodType, 
  httpMethod: string,
  auth: authType,
) => void;
type typedAddRoute = (path: string, method: controllerMethodType, auth) => void;
type routeType = {
  [httpMethod: string]: {
    auth: authType,
    handler: (context: contextType) => void,
  }
};
type routerType = {
  addRoute: addRouteType,
  get: typedAddRoute,
  post: typedAddRoute,
}


function routerContstructor(prefix: string): routerType {
  let router: undefined | routerType;

  const addRoute: addRouteType = (path, controllerMethod, httpMethod, auth) => {
    router[prefix + path] = { 
      [httpMethod]: {
        auth,
        handler: controllerMethod,
      }
    };
  }

  router = {
    addRoute,
    get: (path, method, auth) => {
      addRoute(path, method, 'GET', auth);
    },
    post: (path, method, auth) => {
      addRoute(path, method, 'POST', auth);
    },
  }

  return router;
}

export { routerType, routerContstructor };