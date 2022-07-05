import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrownLogo } from '../../assets/navigation/crown.svg';
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import './navigation.styles.scss';

const Navigation = () => {
    // ACCESSING THE CURRENT USER DATA FROM USERCONTEXT
    const { currentUser } = useContext(UserContext);

    const { isCartOpen } = useContext(CartContext);

    const signOutHandler = async () => {
        await signOutUser();
    }

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <CrownLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        Shop
                    </Link>
                    {
                        // IF CURRENT USER EXISTS
                        currentUser ? (
                            <span className="nav-link" onClick={signOutHandler}>Sign Out</span>
                        ) : // IF CURRENT USER DOESNOT EXISTS 
                        (
                            <Link className="nav-link" to="/auth">Sign In</Link>
                        )
                    }
                    <CartIcon />
                </div>
                {
                    isCartOpen && <CartDropDown />
                }
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;
