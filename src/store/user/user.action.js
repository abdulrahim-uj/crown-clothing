import USER_ACTION_TYPES from "./user.types";
import { createActionForDispatch } from "../../utils/reducer/reducer.utils";

export const setCurrentUser = (user) => {
    return createActionForDispatch(USER_ACTION_TYPES.SET_CURRENT_USER, user);
};

export const checkUserSession = () => {
    return createActionForDispatch(USER_ACTION_TYPES.CHECK_USER_SESSION)
}

export const googleSignInStart = () => {
    return createActionForDispatch(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
}

export const emailSignInStart = (email, password) => {
    return createActionForDispatch(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password })
}

export const signInSuccess = (user) => {
    return createActionForDispatch(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
}

export const signInFailed = (error) => {
    return createActionForDispatch(USER_ACTION_TYPES.SIGN_IN_FAILED, error)
}