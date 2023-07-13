import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state:any, action:any) => {

  if(action.type === LOAD_PRODUCTS){
let maxPrice=action.payload.map((products:any)=>products.price);
maxPrice=Math.max(...maxPrice);
    return{...state,
      all_products:[...action.payload],
      filtered_products:[...action.payload],
      filters:{...state.filters,max_price:maxPrice},
    }
    
  }

if(action.type === SET_GRIDVIEW)
{
  return {...state,grid_view:true}
}

if(action.type === SET_LISTVIEW)
{
  return {...state,grid_view:false}
}

if (action.type === UPDATE_SORT) {
  
  return { ...state, sort: action.payload }
}

if(action.type ===SORT_PRODUCTS){
  const{sort,filtered_products}=state;
  
  let tempProducts=[...filtered_products];
  if(sort === 'price-lowest'){
   tempProducts=tempProducts.sort((curItem,NextItem)=>curItem.price - NextItem.price)
  }
  if(sort ==='price-highest'){
    console.log("in highest")
    tempProducts=tempProducts.sort((curItem,NextItem)=>NextItem.price - curItem.price)
   
  }
  if(sort === 'name-a'){
    tempProducts=tempProducts.sort((curItem,NextItem)=>{return curItem.name.localeCompare(NextItem.name)})
    
  }
  if(sort === 'name-z'){
    tempProducts=tempProducts.sort((curItem,NextItem)=>{return NextItem.name.localeCompare(curItem.name)})
    
  }
  return {...state,filtered_products:tempProducts}
}

if(action.type === UPDATE_FILTERS)
{
  const {name,value}=action.payload
  return {...state,filters:{...state.filters,[name]:value}}
}
  //return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
