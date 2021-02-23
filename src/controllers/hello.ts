import fs from 'fs';
import path from 'path';

import { contextType } from '../request_handler';

export default {
  index: async (context: contextType) => {
    const html = fs.readFileSync(path.join(__dirname + '/../views/hello/index.html'));

    context.response.setHeader('Content-Type', 'text/html');
    context.response.writeHead(200);
    context.response.write(html);
  }
}