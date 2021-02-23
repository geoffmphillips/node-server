import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

import { db } from './db/db';
import { requestHandlerConstructor, requestHandlerType } from './request_handler';
import routes from './routes/index';
import { resolvedNull } from './utils/resolved_null';
import { sessionHandler } from './middleware/session/index';

const requestHandler = requestHandlerConstructor(
  sessionHandler,
  db,
  routes,
)

const PORT = process.env.PORT

async function startServer(requestHandler: requestHandlerType): Promise<null> {
    http.createServer(requestHandler).listen(PORT);
    return resolvedNull;
}

(async function() {
    await startServer(requestHandler);
    console.log(`listening on port ${PORT}`);
})();
