import { compose, createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
import { rootReducer } from "./root-reducer";


const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }

    console.log('TYPE: : : -->', action.type);
    console.log('PAYLOAD: : : -->', action.payload);
    console.log('CURRENTSTATE: : : -->', store.getState());

    next(action);

    console.log('NEXTSTATE: : : -->', store.getState());
}

const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const Store = createStore(rootReducer, undefined, composedEnhancers);
