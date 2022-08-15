import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
// import thunk from "redux-thunk";     //Because of using REDUX-SAGA, SAGA is better one
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";


const persistConfig = {
    key: "root",
    storage: storage,
    blacklist: ["user"], //'user' is from --> root-reducer.js line 7
    whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV === "development" && logger, sagaMiddleware].filter(
    Boolean
);

const composeEnhancer =
    (process.env.NODE_ENV !== "production" &&
        window &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const Store = createStore(
    persistedReducer,
    undefined,
    composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(Store);
