"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolved_promise_1 = require("../utils/resolved_promise");
exports.default = {
    index: async (context) => {
        console.log('just saying hi here in the controller');
        return await resolved_promise_1.resolvedPromise;
    }
};
//# sourceMappingURL=hello.js.map