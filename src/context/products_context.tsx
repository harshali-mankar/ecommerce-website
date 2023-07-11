import axios from 'axios'
import React, { useContext, useEffect, useReducer, createContext } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import { useState } from 'react'
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

interface Product {
  isSidebarOpen: boolean;
  products_loading:boolean;
  products_error:boolean;
  products:[];
  featured_products:[];
}

const initialState: Product = {
  isSidebarOpen: false,
  products_loading:false,
  products_error:false,
  products:[],
  featured_products:[],
}
//create interface to bind the data
interface ProductsContextType {
  isSidebarOpen: boolean;
  products_loading:boolean;
  products_error:boolean;
  featured_products:any;
  products:any;
  openSidebar: () => void;
  closeSidebar: () => void;
  fetchProducts:()=>void;
}

const ProductsContext = createContext<ProductsContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //console.log('In context  '+ state)

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }
  
//function to fetch all products
const [data, setData] = useState([]);

  const fetchProducts = async () => {
    dispatch({type:GET_PRODUCTS_BEGIN})
    try{const res = await axios.get(url)
    // console.log(res.data)
    // return setData(res.data)
    const products=res.data;
    dispatch({type:GET_PRODUCTS_SUCCESS,payload:products})

    }catch(error){
      dispatch({type:GET_PRODUCTS_ERROR})
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  

  return (
    <ProductsContext.Provider value={{
      ...state,
     openSidebar,
      closeSidebar,
      fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProductsContext must be used within a ProductsProvider');
  }
  return context;
}



  
  