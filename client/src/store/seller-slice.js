import { createSlice } from "@reduxjs/toolkit";

const initialSellerState = {
    token: null,
    seller: null
}

const sellerSlice = createSlice({
    name: "seller",
    initialState: initialSellerState,
    reducers: {
        register(state, action) {
            state.seller = action.payload.seller
            state.token = action.payload.token
        },
        login(state, action) {
            state.seller = action.payload.seller
            state.token = action.payload.token
        }
    }
})

export const sellerActions = sellerSlice.actions

export default sellerSlice.reducer