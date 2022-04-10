import { createSlice } from "@reduxjs/toolkit";

const initialCustomerState = {
    token: null,
    customer: null
}

const customerSlice = createSlice({
    name: "customer",
    initialState: initialCustomerState,
    reducers: {
        register(state, action) {
            state.customer = action.payload.customer
            state.token = action.payload.token
        },
        login(state, action) {
            state.customer = action.payload.customer
            state.token = action.payload.token
        }
    }
})

export const customerActions = customerSlice.actions

export default customerSlice.reducer