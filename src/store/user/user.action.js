import USER_ACTION_TYPES from "./user.types";
import { createActionForDispatch } from "../../utils/reducer/reducer.utils";

export const setCurrentUser = (user) => {
    return createActionForDispatch(USER_ACTION_TYPES.SET_CURRENT_USER, user);
};