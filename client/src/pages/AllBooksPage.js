import React, { useState, useEffect } from 'react'
import BookList from '../components/BookList/BookList'
import Card from '../components/UIElements/Card'
import Input from "../components/FormElements/Input"
import { useSelector } from "react-redux"
import Fuse from "fuse.js"

const AllBooks = (props) => {
    const [searchquery, setQuery] = useState("")

    const books = useSelector(state => state.app.books)

    const fuse = new Fuse(books, {
        keys: ["title"]
    })

    const result = fuse.search(searchquery)

    const productResults = searchquery ? result.map(productResult => productResult.item) : books

    if (props.books.length === 0) {
        return (
            <Card>
                <h3>No Books Found in the store.Please wait for the seller to create some...</h3>
            </Card>
        )
    }

    return (
        <div>
            <Input
                type="text"
                placeholder="Search by title"
                element="input"
                style={{ width: "15rem", margin: "auto", height: "30px" }}
                value={searchquery}
                onChange={(event) => setQuery(event.target.value)} />
            <BookList books={productResults} />
        </div>
    )
}

export default AllBooks
