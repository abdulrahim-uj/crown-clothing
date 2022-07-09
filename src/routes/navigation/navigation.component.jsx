import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrownLogo } from '../../assets/navigation/crown.svg';
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from './navigation.styles.jsx';

const Navigation = () => {
    // ACCESSING THE CURRENT USER DATA FROM USERCONTEXT
    const { currentUser } = useContext(UserContext);

    const { isCartOpen } = useContext(CartContext);

    const signOutHandler = async () => {
        await signOutUser();
    }

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrownLogo className="logo" />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink to="/shop">
                        Shop
                    </NavLink>
                    {
                        // IF CURRENT USER EXISTS
                        currentUser ? (
                            // passing dynamically Its navlink but appear as span tag
                            <NavLink as={'span'} onClick={signOutHandler}>Sign Out</NavLink>
                        ) : // IF CURRENT USER DOESNOT EXISTS 
                        (
                            <NavLink to="/auth">Sign In</NavLink>
                        )
                    }
                    <CartIcon />
                </NavLinksContainer>
                {
                    isCartOpen && <CartDropDown />
                }
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;
