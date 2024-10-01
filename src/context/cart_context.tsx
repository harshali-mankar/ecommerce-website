import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

//function that checks whether item is already available in cart or not

const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart") || "{}"); // use || '{}' because string value is getting assigned to null
  } else {
    return [];
  }
};

const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_cost: 0,
  shipping_fee: 345,
  addToCart: (id: any, color: any, amount: any, product: any) => {},
  removeItem: (id: any) => {},
  clearCart: () => {},
  toggleItem: (id: any, value: any) => {},
};
interface Props {
  children: React.ReactNode;
}
const CartContext = React.createContext(initialState);

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //function to add elements to cart
  const addToCart = (id: any, color: any, amount: any, product: any) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  };

  //function to remove element from cart
  const removeItem = (id: any) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };

  //function to clear cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  //function to toggle element from cart
  const toggleItem = (id: any, value: any) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };

  //store the cart data on laocalstorage
  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, clearCart, toggleItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
