import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

import { requestHandler, requestHandlerType } from './request_handler';

const PORT = process.env.PORT

async function startServer<T>(requestHandler: requestHandlerType): Promise<T> {
    http.createServer(requestHandler).listen(PORT);
    return;
}

await startServer(requestHandler);

console.log(`listening on port ${PORT}`);