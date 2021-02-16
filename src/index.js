"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// import { dbProvider } from './db/db_provider'
const request_handler_1 = require("./request_handler");
const index_1 = __importDefault(require("./routes/index"));
const resolved_null_1 = require("./utils/resolved_null");
const index_2 = require("./middleware/session/index");
const requestHandler = request_handler_1.requestHandlerConstructor(index_2.sessionHandler, (context) => ({ ...context }), index_1.default);
const PORT = process.env.PORT;
async function startServer(requestHandler) {
    http_1.default.createServer(requestHandler).listen(PORT);
    return resolved_null_1.resolvedNull;
}
(async function () {
    await startServer(requestHandler);
    console.log(`listening on port ${PORT}`);
})();
//# sourceMappingURL=index.js.map