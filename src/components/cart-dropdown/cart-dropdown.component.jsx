import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';

const CartDropDown = () => {

    const { cartItems } = useContext(CartContext);
    // useNavigate is function that hooks, that allow us to get a navigate function
    const navigate = useNavigate();

    const goTOCheckOutHandler = () => {
        return navigate('/checkout')
    };

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cartItems.map(item => {
                        return <CartItem key={item.id} cartItem={item} />
                    })
                }
            </div>
            <Button onClick={goTOCheckOutHandler}>Go To Check Out</Button>
        </div>
    );
};

export default CartDropDown;