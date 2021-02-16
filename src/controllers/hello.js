"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.default = {
    index: async (context) => {
        const html = fs_1.default.readFileSync(path_1.default.join(__dirname + '/../views/hello/index.html'));
        context.response.setHeader('Content-Type', 'text/html');
        context.response.writeHead(200);
        context.response.write(html);
    }
};
//# sourceMappingURL=hello.js.map