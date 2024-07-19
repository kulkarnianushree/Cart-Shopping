import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
  name: 'Cart',
  initialState: {
    item: [],
    Totalquantity: 0
  },
  reducers: {
    addtocart(state, action) {
      const newItem = action.payload;
      const existingitem = state.item.find(item => item.itemid === newItem.id);
      state.Totalquantity++;
      if (!existingitem) {
        state.item.push({
          itemid: newItem.id,
          price: newItem.price,
          quantity: 1,
          name: newItem.title,
          totalPrice: newItem.price
        });
      } else {
        existingitem.quantity++;
        existingitem.totalPrice = existingitem.totalPrice + newItem.price;
      }
    },
    removecartitem(state, action) {
      const id = action.payload;
      const existingitem = state.item.find(item => item.itemid === id);
      state.Totalquantity--;
      if (existingitem.quantity === 1) {
        state.item = state.item.filter(items => items.itemid !== id);
      } else {
        existingitem.quantity--;
        existingitem.totalPrice = existingitem.totalPrice - existingitem.price;
      }
    },
    increment(state){
        state.Totalquantity++
    },
    decrement(state){
        state.Totalquantity--
    }
  }
});

export const CartActions = CartSlice.actions;
export default CartSlice;
