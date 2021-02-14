import { routerContstructor } from './router_constructor';

test('creates a router', () => {
    const subject = routerContstructor('/test')
    subject.get('/', function () { return 1 });
    expect(subject['/test/'].GET()).toBe(1);
});