import { resolvedPromise } from "../utils/resolved_promise";

export default {
  index: async (context) => {
    console.log('just saying hi here in the controller');
    return await resolvedPromise;
  }
}