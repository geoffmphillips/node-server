"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var dotenv = require("dotenv");
dotenv.config();
var request_handler_1 = require("./server/request_handler");
var PORT = process.env.PORT;
http.createServer(request_handler_1.requestHandler).listen(PORT);
console.log("listening on port " + PORT);
//# sourceMappingURL=index.js.map