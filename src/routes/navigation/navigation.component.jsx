import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";

import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { ReactComponent as CrownLogo } from "../../assets/navigation/crown.svg";
// import { signOutUser } from "../../utils/firebase/firebase.utils";   //REMOVED FOR USING REDUX-SAGA
import { signOutStart } from "../../store/user/user.action";

import {
    NavigationContainer,
    LogoContainer,
    NavLinksContainer,
    NavLink,
} from "./navigation.styles.jsx";

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);

    const isCartOpen = useSelector(selectIsCartOpen);

    const dispatch = useDispatch();

    /*  REMOVED FOR USING REDUX-SAGA
    const signOutHandler = async () => {
        await signOutUser();
    };
    */
    const logOutUser = () => {
        return dispatch(signOutStart());
    };
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrownLogo className="logo" />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink to="/shop">Shop</NavLink>
                    {
                        // IF CURRENT USER EXISTS
                        currentUser ? (
                            // passing dynamically Its navlink but appear as span tag
                            <NavLink as={"span"} onClick={logOutUser}>
                                Sign Out
                            </NavLink>
                        ) : (
                            // IF CURRENT USER DOESNOT EXISTS
                            <NavLink to="/auth">Sign In</NavLink>
                        )
                    }
                    <CartIcon />
                </NavLinksContainer>
                {isCartOpen && <CartDropDown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;
