import "./checkout-item.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import {
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart,
} from "../../store/cart/cart.action";

const CheckOutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const addItemHandler = () => {
        return dispatch(addItemToCart(cartItems, cartItem));
    };

    const removeItemHandler = () => {
        return dispatch(removeItemFromCart(cartItems, cartItem));
    };

    const deleteItemHandler = () => {
        return dispatch(deleteItemFromCart(cartItems, cartItem));
    };

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={removeItemHandler}>
                    &#60;
                </div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={addItemHandler}>
                    &#62;
                </div>
            </span>
            <span className="price">{price}</span>
            <div className="remove-button" onClick={deleteItemHandler}>
                &#10005;
            </div>
        </div>
    );
};

export default CheckOutItem;
