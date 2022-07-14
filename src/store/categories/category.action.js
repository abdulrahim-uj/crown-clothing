import CATEGORIES_ACTION_TYPES from "./category.types";
import { createActionForDispatch } from "../../utils/reducer/reducer.utils";

export const setCategoriesMap = (categoriesMap) => {
    return createActionForDispatch(
        CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP,
        categoriesMap
    );
};
