"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hello_1 = __importDefault(require("../controllers/hello"));
const router_constructor_1 = require("../utils/router_constructor");
const helloRouter = router_constructor_1.routerContstructor('/hello');
helloRouter.get('/', hello_1.default.index);
exports.default = {
    '/hello/': {
        GET: hello_1.default.index,
    }
};
//# sourceMappingURL=hello.js.map