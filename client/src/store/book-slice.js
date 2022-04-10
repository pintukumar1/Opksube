import { createSlice } from "@reduxjs/toolkit"

const initialAppState = {
    books: [],
    totalQuantity : 0
}

const bookSlice = createSlice({
    name: "book",
    initialState: initialAppState,
    reducers: {
        getItems(state, action) {
            state.totalQuantity = action.payload.totalQuantity
            state.books = action.payload.books
        }
    }
})

export const bookActions = bookSlice.actions

export default bookSlice.reducer