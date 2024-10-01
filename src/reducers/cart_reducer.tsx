import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state: any, action: any) => {
  //code to add cart data

  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const tempItem = state.cart.find((item: any) => item.id === id + color); //to find the item in the cart
    if (tempItem) {
      const tmpCart = state.cart.map((cartItem: any) => {
        if (cartItem.id === id + color) {
          //if item already exist then update the amount (number)
          let newAmt = cartItem.amount + amount;

          if (newAmt > cartItem.max) {
            //check the item in stock
            newAmt = cartItem.max;
          }
          return { ...cartItem, amount: newAmt }; // return the updated cart value
        } else {
          return cartItem; // if item doen't match then add an item to cart
        }
      });
      return { ...state, cart: tmpCart };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] }; ///changed here
    }
  }

  //To remove item
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter(
      (item: any) => item.id !== action.payload
    );
    return { ...state, cart: tempCart };
  }

  //code to toggle amount of item

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item: any) => {
      if (item.id === id) {
        if (value === "inc") {
          let newAmt = item.amount + 1;
          if (newAmt > item.max) {
            newAmt = item.max;
          }
          return { ...item, amount: newAmt };
        }
        if (value === "dec") {
          let newAmt = item.amount - 1;
          if (newAmt < 1) {
            newAmt = 1;
          }
          return { ...item, amount: newAmt };
        }
      } else {
        return item;
      }
    });
    return { ...state, cart: tempCart };
  }

  //To clear the cart

  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  //code to calculate the sub total and total amount

  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_cost } = state.cart.reduce(
      (total: any, cartItem: any) => {
        const { amount, price } = cartItem;

        total.total_items += amount;
        total.total_cost += price * amount;

        return total;
      },
      {
        total_items: 0,
        total_cost: 0,
      }
    );
    return { ...state, total_items, total_cost };
  }
  // return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
