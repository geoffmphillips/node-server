import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

import routes from './routes/index';
import { dbProvider } from './db/db_provider'
import { sessionHandler } from './middleware/session/index';


import { requestHandlerConstructor } from './request_handler';

const requestHandler = requestHandlerConstructor(
  sessionHandler,
  dbProvider,
  routes,
)

const PORT = process.env.PORT

async function startServer<T>(requestHandler: requestHandlerType): Promise<T> {
    http.createServer(requestHandler).listen(PORT);
    return;
}

(async function() {
    await startServer(requestHandler);
    console.log(`listening on port ${PORT}`);
})();
