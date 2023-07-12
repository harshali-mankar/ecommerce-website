import React, { useEffect, useContext, useReducer, createContext } from 'react';
import reducer from '../reducers/filter_reducer';
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';
import { useProductsContext } from './products_context';
import { Products } from '../pages';
interface Props {
  children: React.ReactNode;
}

interface State {
  filtered_products: any;
  all_products: any;
}

const initialState: State = {
  filtered_products:[],
  all_products:[]
};

interface ProductsContextType {
  filtered_products:any;
  all_products:any;
}
const FilterContext = createContext<ProductsContextType | null >(null);
export const FilterProvider: React.FC<Props>= ({ children }) => {
  const{ products }=useProductsContext();
//console.log('in filter context'+products)

  const [state,dispatch]=useReducer(reducer,initialState)
  console.log("In filter context" + state)

  
  //fetch the products
useEffect(()=>{
  dispatch({type:LOAD_PRODUCTS,payload:products})
},[products])

  return (
    <FilterContext.Provider value={{...state}}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  // return useContext(FilterContext)
};