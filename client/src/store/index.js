import {configureStore} from "@reduxjs/toolkit"
import bookReducer from "./book-slice"

const store = configureStore({
    reducer: {
        book: bookReducer
    }
})

export default store