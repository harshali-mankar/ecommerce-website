import { useEffect, useContext, useReducer, createContext } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";
import * as React from 'react';
interface Props {
  children: React.ReactNode;
}


interface ContextProps {
  filtered_products: string[];
  all_products: string[];
  grid_view: boolean;
  sort: string;
  filter:{
    text:string;
    company:string;
    category:string;
    color:string;
    min_price:number;
    max_price:number;
    price:number;
    shipping:boolean;
  }
  setGridView: () => void;
  setListView: () => void;
  updateSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  updateFilters: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  clearFilters:()=>void;
}

const initialState: ContextProps = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: "price-lowest",
  filter:{
    text:'aaa',
    company:'all',
    category:'all',
    color:'all',
    min_price:0,
    max_price:0,
    price:0,
    shipping:false,
  },
  setGridView: () => {},
  setListView: () => {},
  updateSort: (e) => {},
  updateFilters:(event)=>{},
  clearFilters:()=>{},
};

const FilterContext = createContext<ContextProps>({
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: "price-lowest",
  filter:{
    text:'aaa',
    company:'all',
    category:'all',
    color:'all',
    min_price:0,
    max_price:0,
    price:0,
    shipping:false,
  },
  setGridView: () => {},
  setListView: () => {},
  updateSort: (e) => {},
  updateFilters:(event)=>{},
  clearFilters:()=>{},
});

export const FilterProvider: React.FC<Props> = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort]);

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const updateSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    
    dispatch({ type: UPDATE_SORT, payload: value });
  };

const updateFilters=(event: React.KeyboardEvent<HTMLInputElement>)=>{
   // let name=event.target.;
  
   console.log("called update filter")
  // console.log(aaa +" and value" +value)
  //dispatch({type:UPDATE_FILTERS,payload:{aaa,value}})

}

const clearFilters=()=>{}
  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
