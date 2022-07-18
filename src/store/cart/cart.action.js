import CART_ACTION_TYPES from "./cart.types";
import { createActionForDispatch } from "../../utils/reducer/reducer.utils";

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

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createActionForDispatch(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemRemove);
    return createActionForDispatch(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const deleteItemFromCart = (cartItems, cartItemDelete) => {
    const newCartItems = deleteCartItem(cartItems, cartItemDelete);
    return createActionForDispatch(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setIsCartOpen = (valBoolean) => {
    return createActionForDispatch(CART_ACTION_TYPES.SET_IS_CART_OPEN, valBoolean);
};


