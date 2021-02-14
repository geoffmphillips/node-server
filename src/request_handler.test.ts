import { requestHandlerConstructor } from './request_handler';

test('this is a test of a test', async () => {
    const subject = requestHandlerConstructor(function() {}, function() {}, {});
    const request = { 
      getHeader: function(header) { return [] },
      url: 'https://example.org/'
    };
    const response = { end: function() {} };
    const result = await subject(request, response);
    expect(result).toBe(null);
})