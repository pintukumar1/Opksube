import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialAppState = {
    books: []
}

const bookSlice = createSlice({
    name: "book",
    initialState: initialAppState,
    reducers: {
        getBooks() {
            axios.get("/api/books/getbooks")
                .then(response => { console.log(response) })
        }
    }
})

export const bookActions = bookSlice.actions

export default bookSlice.reducer