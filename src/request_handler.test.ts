import { requestHandlerConstructor } from './request_handler';

test('this is a test of a test', () => {
    const subject = requestHandlerConstructor(function() {}, function() {}, {})
    const result = subject({}, { end: function() {} });
    expect(1).toBe(1);
})