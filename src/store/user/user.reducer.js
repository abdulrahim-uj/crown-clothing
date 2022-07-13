// SUPPORT REDUCER
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: "SET_CURRENT_USER",
};

// REDUCER INITIALIZE STATE
const INITIAL_STATE = {
    currentUser: null,
};

// REDUCER WITH SET INITIAL STATE VALUE
export const userReducer = (state = INITIAL_STATE, action) => {
    // DESTRUCTURE THE ACTION
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
            };

        default:
            return state;
    }
};
