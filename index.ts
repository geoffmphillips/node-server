import * as http from 'http';
import * as dotenv from 'dotenv';

dotenv.config();

import { requestHandler } from './server/request_handler';

const PORT = process.env.PORT

http.createServer(requestHandler).listen(PORT);
console.log(`listening on port ${PORT}`);