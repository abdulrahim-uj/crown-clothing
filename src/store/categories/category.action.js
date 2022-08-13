import CATEGORIES_ACTION_TYPES from "./category.types";
import { createActionForDispatch } from "../../utils/reducer/reducer.utils";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

/* REMOVED USING REDUX_THUNK
export const setCategories = (categoriesArray) => {
    return createActionForDispatch(
        CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
        categoriesArray
    );
};
*/

export const fetchCategoriesStart = () => {
    return createActionForDispatch(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START
    );
};

export const fetchCategoriesSuccess = (categoriesArray) => {
    return createActionForDispatch(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
        categoriesArray
    );
};

export const fetchCategoriesFailed = (error) => {
    return createActionForDispatch(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
        error
    );
};

export const fetchCategoriesThunkAsync = () => async(dispatchfunc) => {
    dispatchfunc(fetchCategoriesStart());
    
    try {
        const categoriesArray = await getCategoriesAndDocuments();
        dispatchfunc(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        dispatchfunc(fetchCategoriesFailed(error));
    }
}