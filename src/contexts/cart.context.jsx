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

export const CartContext = createContext(
    {
        isCartOpen: false,
        setIsCartOpen: () => {},
        cartItems: [],
        addItemToCart: () => {},
        cartCount: 0,
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

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => {return total + cartItem.quantity}, 0);
        setCartCount(newCartCount);
    }, [cartItems])
    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    };

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount};
    
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
};