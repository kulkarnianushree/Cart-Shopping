import { createSlice } from '@reduxjs/toolkit';
import { UiAction } from './ui-slice';

const CartSlice = createSlice({
  name: 'Cart',
  initialState: {
    items: [], // Corrected the property name to `items` for consistency
    totalQuantity: 0 ,// Corrected the camelCase naming,
    changed : false
  },
  reducers: {
    replaceCart(state,action) {
      state.totalQuantity = action.payload.totalQuantity
      state.items=action.payload.items
    },
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.itemId === newItem.id);
      state.totalQuantity++;
      state.changed = true
      if (!existingItem) {
        state.items.push({
          itemId: newItem.id,
          price: newItem.price,
          quantity: 1,
          name: newItem.title,
          totalPrice: newItem.price
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeCartItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.itemId === id);
      state.totalQuantity--;
      state.changed= true
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.itemId !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  }
});

export const sendData = (cart) => {
  return async (dispatch) => {
    dispatch(
      UiAction.NotificationStatus({
        status: 'Waiting',
        title: 'Sending....',
        message: 'Sending data is in process',
      })
    );
    const requestSent = async () => {
      const response = await fetch('https://cart-shopping-21a46-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }
    }
    try {
      await requestSent();
      dispatch(
        UiAction.NotificationStatus({
          status: 'Success',
          title: 'Success',
          message: 'Successfully sent the data',
        })
      );
    } catch (error) {
      dispatch(
        UiAction.NotificationStatus({
          status: 'Failed',
          title: 'Error',
          message: error.message,
        })
      );
    }
  }
};

export const fetchdata = async()=>{
  return async(dispatch) =>{
    const fetchRequest = async () =>{
      const response = await fetch('')
      if(!response.ok){
        throw new Error('something went wrong')
      }
      const data = await response.json()
      return data
    }
    try{
      const cart = await fetchRequest()
      dispatch(CartActions.replaceCart(cart))
      dispatch(
        UiAction.NotificationStatus({
          status: 'Success',
          title: 'Success',
          message: 'Successfully sent the data',
        })
      );
    }catch (error) {
      dispatch(
        UiAction.NotificationStatus({
          status: 'Failed',
          title: 'Error',
          message: error.message,
        })
      );
    }
  }

}

export const CartActions = CartSlice.actions;
export default CartSlice;
