import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';
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
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (
                        cartItems.map(item => {
                            return <CartItem key={item.id} cartItem={item} />
                        })
                    ) : (
                        <EmptyMessage>Your cart is empty!</EmptyMessage>
                    )
                }
            </CartItems>
            <Button onClick={goTOCheckOutHandler}>Go To Check Out</Button>
        </CartDropdownContainer>
    );
};

export default CartDropDown;