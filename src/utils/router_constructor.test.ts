import { routerContstructor } from './router_constructor';

test('creates a router', async () => {
    const subject = routerContstructor('/test');
    subject.get('/', async function () { return await Promise.resolve(1) });
    const result = await subject['/test/'].GET();
    expect(result).toBe(1);
});