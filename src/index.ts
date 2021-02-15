import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

// import { dbProvider } from './db/db_provider'
import { requestHandlerConstructor, requestHandlerType } from './request_handler';
import routes from './routes/index';
import { resolvedPromise } from './utils/resolved_promise';
import { sessionHandler } from './middleware/session/index';

const requestHandler = requestHandlerConstructor(
  sessionHandler,
  (context) => ({ ...context }),
  routes,
)

const PORT = process.env.PORT

async function startServer(requestHandler: requestHandlerType): Promise<null> {
    http.createServer(requestHandler).listen(PORT);
    return resolvedPromise;
}

(async function() {
    await startServer(requestHandler);
    console.log(`listening on port ${PORT}`);
})();
