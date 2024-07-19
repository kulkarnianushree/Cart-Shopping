import { createSlice } from "@reduxjs/toolkit";

const UiSlice = createSlice({
    name:'ui',
    initialState:{Cartshow:false,notification:null},
    reducers:{
        toggle(state){
            state.Cartshow = !state.Cartshow
        },
        NotificationStatus(state,action){
            state.notification = {
                status:action.payload.status,
                title:action.payload.title,
                message:action.payload.message
            }
        }
    }
})

export const UiAction = UiSlice.actions

export default UiSlice