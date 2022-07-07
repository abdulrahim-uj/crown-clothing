import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    // find if cartitems contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => {
        return cartItem.id === productToAdd.id;
    });
    // if found increment quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) => {
            if (cartItem.id === productToAdd.id) {
                return {...cartItem, quantity: cartItem.quantity + 1}
            } else {
                return cartItem
            }
        });
    }
    // return new array with modified cartItems/new cart item
    return [...cartItems, {...productToAdd, quantity: 1}];
};

const removeCartItem = (cartItems, cartItemRemove) => {
    // find cartItem to remove
    const existingCartItem = cartItems.find((cartItem) => {
        return cartItem.id === cartItemRemove.id;
    });
    // check quantity is equal to 1, more from the cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemRemove.id);
    }
    // return back the cartItems with matching cart item with reduced quantity
    return cartItems.map((cartItem) => {
        if (cartItem.id === cartItemRemove.id) {
            return {...cartItem, quantity: cartItem.quantity - 1}
        } else {
            return cartItem
        }
    })
};

const deleteCartItem = (cartItems, cartItemDelete) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemDelete.id);
};

export const CartContext = createContext(
    {
        isCartOpen: false,
        setIsCartOpen: () => {},
        cartItems: [],
        addItemToCart: () => {},
        removeItemFromCart: () => {},
        deleteItemFromCart: () => {},
        cartCount: 0,
        cartTotal: 0,
    }
);

/*
product {
    id, name, price, imageUrl
}
cartItem {
    id, name, price, imageUrl, quantity
}
*/

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => {return total + cartItem.quantity}, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity * cartItem.price
        }, 0);
        setCartTotal(newCartTotal);
    }, [cartItems]);
    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    };

    const removeItemFromCart = (cartItemRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemRemove))
    };

    const deleteItemFromCart = (cartItemDelete) => {
        setCartItems(deleteCartItem(cartItems, cartItemDelete))
    };

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, deleteItemFromCart, cartCount, cartTotal};
    
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
};