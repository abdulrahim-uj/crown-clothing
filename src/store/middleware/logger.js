// THIS IS JUST A BACKUP COPY NOT USING THIS PROJECT

export const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }

    console.log("logger.js: loggerMiddleware: type: action.type: ", action.type);
    console.log("logger.js: loggerMiddleware: payload: action.payload: ", action.payload);
    console.log("logger.js: loggerMiddleware: currentState: store.getState(): ", store.getState());

    next(action);

    console.log("logger.js: loggerMiddleware: next state: store.getState(): ", store.getState());
};
