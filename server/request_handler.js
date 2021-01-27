"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestHandlerConstructor = exports.requestHandler = void 0;
var requestHandlerConstructor = function () {
    return function requestHandlerInstance(request, response) {
        console.log(request);
    };
};
exports.requestHandlerConstructor = requestHandlerConstructor;
var requestHandler = requestHandlerConstructor();
exports.requestHandler = requestHandler;
//# sourceMappingURL=request_handler.js.map