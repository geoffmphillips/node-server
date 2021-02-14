"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_provider_1 = require("./db/db_provider");
const request_handler_1 = require("./request_handler");
const index_1 = __importDefault(require("./routes/index"));
const resolved_promise_1 = require("./utils/resolved_promise");
const index_2 = require("./middleware/session/index");
const requestHandler = request_handler_1.requestHandlerConstructor(index_2.sessionHandler, db_provider_1.dbProvider, index_1.default);
const PORT = process.env.PORT;
async function startServer(requestHandler) {
    http_1.default.createServer(requestHandler).listen(PORT);
    return resolved_promise_1.resolvedPromise;
}
(async function () {
    await startServer(requestHandler);
    console.log(`listening on port ${PORT}`);
})();
//# sourceMappingURL=index.js.map