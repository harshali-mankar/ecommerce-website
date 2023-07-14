import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

const initialState = {
  
}

//const CartContext = React.createContext()

export const CartProvider = ({  }) => {
  return ( <h2> Hello</h2>
    // <CartContext.Provider value='cart context'>{children}</CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  // return useContext(CartContext)
}


//export const CartProvider = ({ children  }) => {