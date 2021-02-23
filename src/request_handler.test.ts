import { requestHandlerConstructor } from './request_handler';
import { dbConstructor } from './db/db';
import { getSettings } from './config/settings';

test('nominal request handler construction', async () => {
    const subject = requestHandlerConstructor(
      function() {
        return {
          request: {},
          response: { 
            end: function() {},
            setHeader: function(header: string, value: string | string[]) {},
            writeHead: function(code: number, headers?: {}) {},
            write: function(html: Buffer) {},
          },
          requestUrl: 'test',
        }
      }, 
      dbConstructor(getSettings, true),
      { 
        addRoute: () => {}, 
        get: () => {}, 
        post: () => {},
      },
    );

    const request = { 
      getHeader: function(header) { return [] },
      headers: {
        cookie: [],
      },
      url: '/',
    };
    const response = { 
      end: function() {},
      setHeader: function(header: string, value: string | string[]) {},
      writeHead: function(code: number, headers?: {}) {},
      write: function(html: Buffer) {}
    };
    const result = await subject(request, response);

    expect(result).toBe(null);
})