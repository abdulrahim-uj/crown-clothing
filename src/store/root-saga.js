import { all, call } from "redux-saga/effects";

import { categoriesGeneratorFuncSaga } from "./categories/category.saga";
import { userGeneratorFuncSaga } from "./user/user.saga";

// ES6 GENERATOR FUNCTION *
export function* rootSaga() {
    yield all([call(categoriesGeneratorFuncSaga), call(userGeneratorFuncSaga)]);
}
