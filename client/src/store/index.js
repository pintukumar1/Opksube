import {configureStore} from "@reduxjs/toolkit"
import bookReducer from "./book-slice"
import sellerReducer from "./seller-slice"

const store = configureStore({
    reducer: {
        book: bookReducer,
        seller: sellerReducer
    }
})

export default store