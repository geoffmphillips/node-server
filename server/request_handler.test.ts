const { requestHandlerConstructor } = require('./request_handler');

test('this is a test of a test', () => {
    const subject = requestHandlerConstructor()
    const result = subject();
    expect(1).toBe(1);
})