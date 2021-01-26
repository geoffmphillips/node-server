import http from 'http';

import { requestHandler } from './server/request_handler';

const PORT = process.env.PORT

http.createServer(requestHandler).listen(PORT);