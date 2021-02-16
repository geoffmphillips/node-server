import fs from 'fs';
import path from 'path';
import { URL } from 'url';
import { resolvedNull } from './utils/resolved_null';

type authType = {
  isForbidden: boolean,
  isAuthorized: boolean,
}
type requestType = {
  headers?: any,
  url?: string,
  method?: string,
};
type responseType = {
  setHeader: (header: string, value: string) => void,
  end: (data?: string) => void,
  writeHead: (errocode: number, headers?: {}) => void,
  write: (html: Buffer) => void,
};
type contextType = {
  request: requestType,
  response: responseType,
  auth?: authType,
}
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
  
      const requestUrl: URL = new URL(`${process.env.BASE_URL}${request.url}`);
      console.log(requestUrl)
  
      const context: contextType = createContext(dbProvider, sessionHandler, ...middleware)({ 
        request, 
        response, 
        cookies,
        requestUrl,
      });

      const matchingRoute = findMatchingRoute(requestUrl.pathname, routes);
      
      if (matchingRoute && matchingRoute[context.request.method]) {
        // TO DO implement AUTH
        // if (context.auth.isAuthorized) {
        if (true) {
          matchingRoute[context.request.method](context)
        } else {
          serveError(context.auth.isForbidden ? 403 : 401, response);
        }
      } else {
        serveError(404, response);
      }
    } catch (error) {
      serveError(500, response);
    }

    response.end();
    return await resolvedNull;
  }
}

const findMatchingRoute = (pathname: string, routes): string | undefined => {
  if (!routes) return undefined;

  return routes[pathname] ? 
    routes[pathname]
  : routes[pathname + '/'] ?
    routes[pathname + '/']
  : pathname[pathname.length - 1] === '/' && routes[pathname.slice(0, pathname.length - 1)] ?
    routes[pathname.slice(0, pathname.length - 1)]
  :
    undefined;
}

const serveError = (errorCode: number, response: responseType): void => {
  const html = fs.readFileSync(path.join(__dirname + `/views/${errorCode}.html`));

  response.setHeader('Content-Type', 'text/html');
  response.writeHead(errorCode);
  response.write(html);
}

const createContext = (...middleware: middlewareType[]) => (initialContext) => middleware.reduce((accContext, fn) => fn(accContext), initialContext)

export { requestHandlerConstructor, requestHandlerType };