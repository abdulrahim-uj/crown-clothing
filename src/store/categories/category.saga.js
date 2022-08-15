import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import {
    fetchCategoriesSuccess,
    fetchCategoriesFailed,
} from "./category.action";
import CATEGORIES_ACTION_TYPES from "./category.types";

export function* fetchCategoriesSagaAsync() {
    try {
        const categoriesArray = yield call(
            getCategoriesAndDocuments,
            "categories"
        );
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        yield put(fetchCategoriesFailed(error));
    }
}

export function* onFetchCategoriesGeneratorFunc() {
    yield takeLatest(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
        fetchCategoriesSagaAsync
    );
}

export function* categoriesGeneratorFuncSaga() {
    yield all([call(onFetchCategoriesGeneratorFunc)]);
}
