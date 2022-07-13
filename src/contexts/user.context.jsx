import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListner, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import { createActionForDispatch } from "../utils/reducer/reducer.utils";

// ACTUAL VALUE YOU WANT TO ACCESS
export const UserContext = createContext(
    // SET INITIALS AS NULL IN USERCONTEXT
    {
        currentUser: null,
        setCurrentUser: () => null,
    }
);

// SUPPORT REDUCER
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
};

// REDUCER
const userReducer = (state, action) => {
    console.log('DISPATCH: : : -->');
    console.log('ACTION: : : -->', action);
    // DESTRUCTURE THE ACTION
    const { type, payload } = action;
    
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
    
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

// REDUCER INITIALIZE STATE
const INITIAL_STATE = {
    currentUser: null,
};


// PROVIDER
export const UserProvider = ({children}) => {
    // USING USESTATE TO SETCURRENTUSER AND PROVIDE VALUE TO CURRENT USER
    // const [currentUser, setCurrentUser] = useState(null);

    // UTLIZE USER REDUCER
    const [
        // GET BACK FROM REDUCER --> stateObject & dispatchFunction
        state, dispatch
    ] = useReducer(userReducer, INITIAL_STATE);
    console.log('SATET: : : -->', state);
    // DE STRUCTURE THE STATE
    const { currentUser } = state;
    console.log('CURRENT USER: : : -->', currentUser);

    // SET CURRENT USER FUNCTION
    const setCurrentUser = (user) => {
        dispatch(
            createActionForDispatch(USER_ACTION_TYPES.SET_CURRENT_USER, user)
            /*
            {
                type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user
            }
            */
        );
    };

    // VALUE IS AN ATTRIBUTE OF USERPROVIDER, THAT ACCESS AND PASSING CURRENT USERS
    const value = { currentUser, setCurrentUser };
    // 
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListner((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe
    }, []);
    // PASSING VALUES
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

/*
REDUCER NORMALLY:
const userReducer = (state, action) => {
    return {
        currentUser: 
    }
} 

 */