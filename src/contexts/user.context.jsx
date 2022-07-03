import { createContext, useState } from "react";

// ACTUAL VALUE YOU WANT TO ACCESS
export const UserContext = createContext(
    // SET INITIALS AS NULL IN USERCONTEXT
    {
        currentUser: null,
        setCurrentUser: () => null,
    }
);

// PROVIDER
export const UserProvider = ({children}) => {
    // USING USESTATE TO SETCURRENTUSER AND PROVIDE VALUE TO CURRENT USER
    const [currentUser, setCurrentUser] = useState(null);
    // VALUE IS AN ATTRIBUTE OF USERPROVIDER, THAT ACCESS AND PASSING CURRENT USERS
    const value = { currentUser, setCurrentUser };
    // PASSING VALUES
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}