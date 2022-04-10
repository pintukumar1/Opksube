import { createSlice } from "@reduxjs/toolkit"

const initialAppState = {
    books: [],
    totalQuantity: 0,
    sellerToken: null,
    seller: null,
    customerToken: null,
    customer: null,
    orders: [],
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
            state.sellerToken = action.payload.sellerToken
        },
        loginSeller(state, action) {
            state.seller = action.payload.seller
            state.sellerToken = action.payload.sellerToken
        },
        registerCustomer(state, action) {
            state.customer = action.payload.customer
            state.customerToken = action.payload.customerToken
        },
        loginCustomer(state, action) {
            state.customer = action.payload.customer
            state.customerToken = action.payload.customerToken
        },
        logout(state, action) {
            state.customer = null
            state.seller = null
            state.sellerToken = null
            state.customerToken = null
        },
        orderBook(state, action) {
            state.orders = action.payload.orders
        },
        createBook(state, action) {
            state.books = action.payload.books
        }
    }
})

export const appActions = appSlice.actions

export default appSlice.reducer