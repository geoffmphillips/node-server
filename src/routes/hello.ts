import controller from '../controllers/hello';
import { routerContstructor } from '../utils/router_constructor';

type controllerMethodType = (context) => Promise<any>

const helloRouter = routerContstructor('/hello');
helloRouter.get('/', controller.index);

export default {
  '/hello/': {
    GET: controller.index,
  }
}