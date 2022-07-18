import { createContext, useReducer } from "react";
import { createActionForDispatch } from "../utils/reducer/reducer.utils";

// CART CONTEXT
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    deleteItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
});

// INITIAL STATE VALUES
const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};

// ADD CART ITEM CALLING CART CONTEXT PROVIDER
const addCartItem = (cartItems, productToAdd) => {
    // find if cartitems contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => {
        return cartItem.id === productToAdd.id;
    });
    // if found increment quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) => {
            if (cartItem.id === productToAdd.id) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
            } else {
                return cartItem;
            }
        });
    }
    // return new array with modified cartItems/new cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// REMOVE CART ITEM CALLING CART CONTEXT PROVIDER
const removeCartItem = (cartItems, cartItemRemove) => {
    // find cartItem to remove
    const existingCartItem = cartItems.find((cartItem) => {
        return cartItem.id === cartItemRemove.id;
    });
    // check quantity is equal to 1, more from the cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(
            (cartItem) => cartItem.id !== cartItemRemove.id
        );
    }
    // return back the cartItems with matching cart item with reduced quantity
    return cartItems.map((cartItem) => {
        if (cartItem.id === cartItemRemove.id) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
        } else {
            return cartItem;
        }
    });
};

// DELETE CART ITEM CALL CART CONTEXT PROVIDER
const deleteCartItem = (cartItems, cartItemDelete) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemDelete.id);
};

// CART ACTION TYPES
const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

// CART REDUCER
const cartReducer = (state, action) => {
    // DE STRUCTURE THE action
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`);
    }
};

// CART CONTEXT PROVIDER
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    // DE STRUCTURE state
    const { isCartOpen, cartItems, cartCount, cartTotal } = state;
    // HELPING / COMBINE 
    const updateCartItemsReducer = (newCartItems) => {
        /*
        1. generate newCartTotal

        2. generate newCartCount
        
        3. DISPATCH NEW ACTION WITH PAYLOAD = {THIS OBJECT --> 
            newCartItemS, newCartTotal, newCartCount
        }
        */
        const newCartTotal = newCartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity * cartItem.price;
        }, 0);

        const newCartCount = newCartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity;
        }, 0);

        dispatch(
            createActionForDispatch(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                cartCount: newCartCount,
            })
            /*
            {
                type: CART_ACTION_TYPES.SET_CART_ITEMS, 
                payload: {
                    cartItems: newCartItems,
                    cartTotal: newCartTotal,
                    cartCount: newCartCount,
                }
            }
            */
        )
    };

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = (cartItemRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemRemove);
        updateCartItemsReducer(newCartItems);
    };

    const deleteItemFromCart = (cartItemDelete) => {
        const newCartItems = deleteCartItem(cartItems, cartItemDelete);
        updateCartItemsReducer(newCartItems);
    };

    const setIsCartOpen = (valBoolean) => {
        dispatch(
            createActionForDispatch(CART_ACTION_TYPES.SET_IS_CART_OPEN, valBoolean)
            /*
            {
                type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: valBoolean,
            }
            */
        );
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        deleteItemFromCart,
        cartCount,
        cartTotal,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};