const requestHandlerConstructor = () => {
    return function requestHandlerInstance(request, response) {
        console.log(request);
        response.end();
    };
};
const requestHandler = requestHandlerConstructor();
export { requestHandler, requestHandlerConstructor };
//# sourceMappingURL=request_handler.js.map