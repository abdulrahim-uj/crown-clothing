import CATEGORIES_ACTION_TYPES from "./category.types";
import { createActionForDispatch } from "../../utils/reducer/reducer.utils";

export const setCategories = (categoriesArray) => {
    return createActionForDispatch(
        CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
        categoriesArray
    );
};
