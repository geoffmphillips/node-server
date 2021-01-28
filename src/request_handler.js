"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestHandlerConstructor = exports.requestHandler = void 0;
const requestHandlerConstructor = () => {
    return function requestHandlerInstance(request, response) {
        console.log(request);
        response.end();
    };
};
exports.requestHandlerConstructor = requestHandlerConstructor;
const requestHandler = requestHandlerConstructor();
exports.requestHandler = requestHandler;
//# sourceMappingURL=request_handler.js.map