import { all, call } from "redux-saga/effects";

import { categoriesGeneratorFuncSaga } from "./categories/category.saga";

// ES6 GENERATOR FUNCTION *
export function* rootSaga() {
    yield all([call(categoriesGeneratorFuncSaga)]);
}
