const requestHandlerConstructor = () => {
    return function requestHandlerInstance(request, response) {
        console.log(request);
        response.end();
    };
}

const requestHandler = requestHandlerConstructor();
type requestHandlerType = typeof requestHandler;
export { requestHandler, requestHandlerConstructor, requestHandlerType };