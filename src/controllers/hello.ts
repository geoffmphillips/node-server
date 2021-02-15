import fs from 'fs';
import path from 'path';
import { resolvedPromise } from "../utils/resolved_promise";

export default {
  index: async (context) => {
    const html = fs.readFileSync(path.join(__dirname + '/../views/hello/index.html'));

    context.response.setHeader('Content-Type', 'text/html');
    context.response.writeHead(200);
    context.response.write(html);
    return await resolvedPromise;
  }
}