import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { rootReducer } from "./root-reducer";

const middleWares = [
    process.env.NODE_ENV === "development" && logger,
    thunk,
].filter(Boolean);

const composeEnhancer =
    (process.env.NODE_ENV !== "production" &&
        window &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const persistConfig = {
    key: "root",
    storage: storage,
    blacklist: ["user"], //'user' is from --> root-reducer.js line 7
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const Store = createStore(
    persistedReducer,
    undefined,
    composedEnhancers
);

export const persistor = persistStore(Store);
