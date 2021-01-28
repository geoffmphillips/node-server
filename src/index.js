"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const request_handler_1 = require("./request_handler");
const PORT = process.env.PORT;
function startServer(requestHandler) {
    http_1.default.createServer(requestHandler).listen(PORT);
    return;
}
startServer(request_handler_1.requestHandler);
console.log(`listening on port ${PORT}`);
//# sourceMappingURL=index.js.map