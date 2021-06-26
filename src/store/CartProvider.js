import { useReducer } from "react";

import CartContext from "./cart-context";

//default (initial) cart state
const defaultCartState = {
    items: [],
    totalAmount: 0,
};

//function to return an index from an array if an ID exists there
const findItemIndex = (itemsArr, id) => {
  return itemsArr.findIndex(item => item.id === id);
}

//2 args: current state, action ({type: ADD, item: (item to be added as an obj)})
const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        //get the total amount plus the price for the item in the action, times the amount.
        const updatedTotalAmount =
            state.totalAmount + action.item.price * action.item.amount;

        //inside state.items, retrieve the index where item id === action item id 
        const existingCartItemIndex = findItemIndex(state.items,action.item.id); 

        console.log('EXISTING CART ITEM ', existingCartItemIndex);
        //get the existing item position in the array
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        //if the item exists, creates a new obj with all from the existing item in the cart
        //but with modified amount (summing the current amount + amount from the action)
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            };
            //we get the items arrays and modifies where the index for the modified product is
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        //in case that item wasn't found, concat current items list with the action item
        } else {
            updatedItems = state.items.concat(action.item);
        }

        //returns the items and the total amount
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }

    if (action.type === 'REMOVE') {
      const existingCartItemIndex = findItemIndex(state.items, action.id);
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter(item => item.id !== action.id);
      } else {
        const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
  
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
      };
    }

    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    );

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: "ADD", item: item });
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: "REMOVE", id: id });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
