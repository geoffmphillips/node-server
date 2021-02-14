import { URL } from 'url';
import { resolvedPromise } from './utils/resolved_promise';

type contextType = {}

const requestHandlerConstructor = (
    sessionHandler,
    dbProvider,
    routes,
    middleware: ((context: contextType, request, response) => contextType)[] = [],
) => {

  return async function requestHandlerInstance(request, response) {
    console.log(request);

    const cookies = request.getHeader('Cookie').reduce((accCookies, cookie) => {
      const cookieParts = cookie.split(';');
      return {
        ...accCookies,
        [cookieParts.shift().trim()]: decodeURI(cookieParts.join('=')),
      };
    }, {});

    const middlewareContext = [dbProvider, sessionHandler, ...middleware].reduce(
      (accContext, fn) => fn(accContext, request, response)
    , {})

    const context = { 
      request, 
      response, 
      cookies,
      ...middlewareContext,
    };

    const requestUrl = new URL(context.request.url);

    if (routes[requestUrl.pathname] && routes[requestUrl.pathname][context.request.method]) {
      if (context.auth.isAuthorized) {
        routes[requestUrl.pathname][context.request.method](context)
      } else {
        routes[context.auth.isForbidden ? '403' : '401'](context);
      }
    } else {
      routes['404'](context);
    }

    response.end();
    return await resolvedPromise;
  };
}

export { requestHandlerConstructor };