import USER_ACTION_TYPES from "./user.types";

// REDUCER INITIALIZE STATE
const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,
};

// REDUCER WITH SET INITIAL STATE VALUE
export const userReducer = (state = INITIAL_STATE, action = {}) => {
    // DESTRUCTURE THE ACTION
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: payload,
            };
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
            return {
                ...state,
                error: payload,
            }

        default:
            return state;
    }
};
