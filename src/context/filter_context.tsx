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
import * as React from "react";
interface Props {
  children: React.ReactNode;
}

interface ContextProps {
  filtered_products: string[];
  all_products: string[];
  grid_view: boolean;
  sort: string;
  filter: {
    text: string;
    company: string;
    category: string;
    colors: string;
    min_price: number;
    max_price: number;
    price: number;
    shipping: boolean;
  };
  setGridView: () => void;
  setListView: () => void;
  updateSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  updateFilters: (event: React.SyntheticEvent) => void;
  clearFilters: () => void;
}

const initialState: ContextProps = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: "price-lowest",
  filter: {
    text: "",
    company: "all",
    category: "all",
    colors: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
  setGridView: () => {},
  setListView: () => {},
  updateSort: (e) => {},
  updateFilters: (event) => {},
  clearFilters: () => {},
};

const FilterContext = createContext<ContextProps>({
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: "price-lowest",
  filter: {
    text: "",
    company: "all",
    category: "all",
    colors: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
  setGridView: () => {},
  setListView: () => {},
  updateSort: (e) => {},
  updateFilters: (event) => {},
  clearFilters: () => {},
});

export const FilterProvider: React.FC<Props> = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.filter, state.sort]);

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

  const updateFilters = (event: React.SyntheticEvent) => {
    let name: string | any = "";
    let value: string | any = "";

    if (event.target instanceof HTMLInputElement) {
      let element = event.target as HTMLInputElement;
      name = element.name;
      value = element.value;
      if (name === "shipping") {
        value = element.checked;
      }
    } else if (event.target instanceof HTMLButtonElement) {
      let element = event.target as HTMLButtonElement;
      name = element.name;
      if (name === "category") {
        value = element.textContent;
      } else if (name === "colors") {
        value = element.getAttribute("data-color");
      }
    } else if (event.target instanceof HTMLSelectElement) {
      let element = event.target as HTMLSelectElement;
      name = element.name;
      value = element.value;
    }

    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
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
