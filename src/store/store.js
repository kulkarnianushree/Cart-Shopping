import {configureStore} from '@reduxjs/toolkit'
import UiSlice from './ui-slice'
import CartSlice from './cart-slice'
const store = configureStore({
    reducer:{
        Ui:UiSlice.reducer,
        Cart:CartSlice.reducer
    }
})

export default store