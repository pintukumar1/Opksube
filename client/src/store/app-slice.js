import { createSlice } from "@reduxjs/toolkit"

const customer = localStorage.getItem("customer")
const customerToken = localStorage.getItem("customerToken")
const seller = localStorage.getItem("seller")
const sellerToken = localStorage.getItem("sellerToken")

const initialAppState = {
    books: [],
    alertText: "",
    totalQuantity: 0,
    sellerToken: sellerToken,
    seller: seller,
    customerToken: customerToken,
    customer: customer,
    orders: [],
    showAlert: false,
    booksSold: [],
    sellerBooks: []
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
            state.alertText = action.payload.alertText
            state.showAlert = action.payload.showAlert
        },
        clearError(state, action) {
            state.alertText = ""
            state.showAlert = false
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
            state.ordes = null
        },
        orderBook(state, action) { },
        createBook(state, action) {
            state.books = action.payload.books
        },
        getOrders(state, action) {
            state.orders = action.payload.orders
        },
        getSoldBooks(state, action) {
            state.sellerBooks = action.payload.sellerBooks
            state.booksSold = action.payload.booksSold
        }
    }
})

export const appActions = appSlice.actions

export default appSlice.reducer