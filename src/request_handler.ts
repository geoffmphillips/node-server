import { URL } from 'url';
import { resolvedPromise } from './utils/resolved_promise';

type contextType = {};
type requestType = {
  headers?: any,
  url?: string,
};
type responseType = {
  end?: (data?: string) => void
};
type middlewareType = (context: contextType) => contextType;
type requestHandlerType = (request: requestType, reponse: responseType) => Promise<null>

const requestHandlerConstructor = (
    sessionHandler: middlewareType,
    dbProvider: middlewareType,
    routes,
    middleware: middlewareType[] = [],
): requestHandlerType => {

  return async function requestHandlerInstance(request, response): Promise<null> {
    try {
      const cookieHeaders = request.headers['cookie'];
      const cookies = cookieHeaders ? cookieHeaders.reduce((accCookies: {}, cookie: string) => {
        const cookieParts = cookie.split(';');
        return {
          ...accCookies,
          [cookieParts.shift().trim()]: decodeURI(cookieParts.join('=')),
        };
      }, {}) : {};
  
      const requestUrl = new URL(`${process.env.BASE_URL}${request.url}`);
  
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
          routes[requestUrl.pathname][context.request.method](context)
        } else {
          routes[context.auth.isForbidden ? '403' : '401'](context);
        }
      } else if (routes['404']) {
        routes['404'].GET(context);
      }
    } catch (error) {
      routes['500'].GET();
    }

    response.end();
    return await resolvedPromise;
  }
}

const createContext = (...middleware: middlewareType[]) => (initialContext) => middleware.reduce((accContext, fn) => fn(accContext), initialContext)

export { requestHandlerConstructor, requestHandlerType };