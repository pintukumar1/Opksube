import { createSlice } from "@reduxjs/toolkit"

const customer = localStorage.getItem("customer")
const customerToken = localStorage.getItem("customerToken")
const seller = localStorage.getItem("seller")
const sellerToken = localStorage.getItem("sellerToken")

const initialAppState = {
    books: [],
    errorText: "",
    totalQuantity: 0,
    sellerToken: sellerToken,
    seller: seller,
    customerToken: customerToken,
    customer: customer,
    order: {},
    orders: [],
    showError: false
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
        errorHandler(state, action) {
            state.errorText = action.payload.errorText
            state.showError = action.payload.showError
        },
        clearError(state, action) {
            state.errorText = ""
            state.showError = false
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
            state.order = action.payload.order
        },
        createBook(state, action) {
            state.books = action.payload.books
        },
        getOrders(state, action) {
            state.orders = action.payload.orders
        }
    }
})

export const appActions = appSlice.actions

export default appSlice.reducer