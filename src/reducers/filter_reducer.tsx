import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state: any, action: any) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((products: any) => products.price);
    maxPrice = Math.max(...maxPrice);
   
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filter: { ...state.filter,max_price: maxPrice,price:maxPrice },
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }

  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;

    let tempProducts = [...filtered_products];
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort(
        (curItem, NextItem) => curItem.price - NextItem.price
      );
    }
    if (sort === "price-highest") {
      //console.log("in highest");
      tempProducts = tempProducts.sort(
        (curItem, NextItem) => NextItem.price - curItem.price
      );
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((curItem, NextItem) => {
        return curItem.name.localeCompare(NextItem.name);
      });
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((curItem, NextItem) => {
        return NextItem.name.localeCompare(curItem.name);
      });
    }
    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filter: { ...state.filter, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;

    const { text, category, company, colors, price, shipping } = state.filter
    //console.log(price)
    let tempProducts = [...all_products];
    //filtering
// filter by text
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }

    //filter by category
    if (category !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      )
    }

    //filter by color
    if (colors !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((c:any) => c === colors)
      })
    }
    // filter by price
    tempProducts = tempProducts.filter((product) => product.price <= price)
    
    // filter by shipping
    if (shipping) {
      tempProducts = tempProducts.filter((product) => product.shipping === true)
    }
    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === CLEAR_FILTERS) {

    return {
      ...state,
      filter: {
        ...state.filter,
        text: "",
        company: "all",
        category: "all",
        colors: "all",
        price:state.filter.max_price,
        shipping: false,
      },  
    };
  }
  //return state
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
