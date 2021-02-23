import { routerContstructor } from './router_constructor';

test('creates a router', async () => {
    const subject = routerContstructor('/test');
    subject.get('/', async function () { return await Promise.resolve(1) }, (session) => true);
    const authResult = subject['/test/']['GET'].auth();
    const result = await subject['/test/']['GET'].handler();

    expect(result).toBe(1);
    expect(authResult).toBe(true);
});