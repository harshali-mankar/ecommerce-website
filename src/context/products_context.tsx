
import axios from 'axios'
import React, { useContext, useEffect, useReducer, createContext } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

interface State {
  isSidebarOpen: boolean;
}

const initialState: State = {
  isSidebarOpen: false
}

// Generate context
interface ProductsContextType {
  state: State;
  
  openSidebar: () => void;
  closeSidebar:()=>void;
}

const ProductsContext = createContext<ProductsContextType>({
  state: initialState,
 
  openSidebar: () => {},
  closeSidebar:()=>{}
});

interface Props {
  children: React.ReactNode;
}

// Generate provider
export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // function to dispatch the action
  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }
console.log(state)
  return (
    <ProductsContext.Provider value={{state, openSidebar,closeSidebar }}>
      {children}
    </ProductsContext.Provider>
  )
}

// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}