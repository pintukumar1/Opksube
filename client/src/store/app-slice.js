import { createSlice } from "@reduxjs/toolkit"

const initialAppState = {
    books: [],
    totalQuantity: 0 ,
    sellerToken: null,
    seller: null,
    customerToken: null,
    customer: null
}

const appSlice = createSlice({
    name: "app",
    initialState: initialAppState,
    reducers: {
        getBooks(state, action) {
            state.totalQuantity = action.payload.totalQuantity
            state.books = action.payload.books
        },
        registerSeller(state, action) {
            state.seller = action.payload.seller
            state.sellerToken = action.payload.token
        },
        loginSeller(state, action) {
            state.seller = action.payload.seller
            state.sellerToken = action.payload.token
        },
        registerCustomer(state, action) {
            state.customer = action.payload.customer
            state.customerToken = action.payload.token
        },
        loginCustomer(state, action) {
            state.customer = action.payload.customer
            state.customerToken = action.payload.token
        },
        logout(state, action) {
            state.customer = null
            state.seller = null
            state.sellerToken = null
            state.customerToken = null
        }
    }
})

export const appActions = appSlice.actions

export default appSlice.reducer