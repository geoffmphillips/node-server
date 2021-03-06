import { anon } from './auth';
import controller from '../controllers/hello';
import { routerContstructor } from '../utils/router_constructor';

const helloRouter = routerContstructor('/hello');
helloRouter.get('/', controller.index, anon);

export default helloRouter;