"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./auth");
const hello_1 = __importDefault(require("../controllers/hello"));
const router_constructor_1 = require("../utils/router_constructor");
const helloRouter = router_constructor_1.routerContstructor('/hello');
helloRouter.get('/', hello_1.default.index, auth_1.anon);
exports.default = helloRouter;
//# sourceMappingURL=hello.js.map