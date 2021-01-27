const requestHandlerConstructor = () => {
    return function requestHandlerInstance(request, response) {
        console.log(request);
    };
}

const requestHandler = requestHandlerConstructor();

export { requestHandler, requestHandlerConstructor };