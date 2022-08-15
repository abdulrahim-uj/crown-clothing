import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import CheckOut from "./routes/checkout/checkout.component";
import { setCurrentUser } from "./store/user/user.action";

import { onAuthStateChangedListner, createUserDocumentFromAuth, getCurrentUser } from "./utils/firebase/firebase.utils";

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        /* REMOVED: Redux-Saga: Converting onAuthSateChanged Listener to Promise
        const unsubscribe = onAuthStateChangedListner((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            dispatch(setCurrentUser(user));
        });
        return unsubscribe
        */
       getCurrentUser().then((user) => {
        return console.log('App.js: useEffect: getCurrentUser:-->firebase.utils.js: ', user);
       })
    }, [dispatch]);

    return (
        <Routes>
            <Route path="/" element={<Navigation />} >
                <Route index={true} element={<Home />} />
                <Route path="shop/*" element={<Shop />} />
                <Route path="auth" element={<Authentication />} />
                <Route path="checkout" element={<CheckOut />} />
            </Route>
        </Routes>
    );
};

export default App;
