import './checkout-item.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckOutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    const { deleteItemFromCart, removeItemFromCart, addItemToCart } = useContext(CartContext);

    const removeItemHandler = () => {
        removeItemFromCart(cartItem);
    };

    const addItemHandler = () => {
        addItemToCart(cartItem);
    };

    const deleteItemHandler = () => {
        deleteItemFromCart(cartItem)
    };

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>&#60;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler}>&#62;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={deleteItemHandler}>&#10005;</div>
        </div>
    );
};

export default CheckOutItem;