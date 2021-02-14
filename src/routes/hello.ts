import controller from '../controllers/hello';

export default {
  '/hello/': {
    GET: controller.index,
  }
}