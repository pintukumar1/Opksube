import React, { useState } from 'react'
import BookList from '../components/BookList/BookList'
import Card from '../components/UIElements/Card'
import Input from "../components/FormElements/Input"
import { useSelector } from "react-redux"
import Fuse from "fuse.js"
import Button from '../components/FormElements/Button'

const AllBooks = (props) => {
    const [searchquery, setQuery] = useState("")

    const books = useSelector(state => state.app.books)
    const seller = useSelector(state => state.app.seller)
    const customer = useSelector(state => state.app.customer)

    const fuse = new Fuse(books, {
        keys: ["title"]
    })

    const result = fuse.search(searchquery)

    const productResults = searchquery ? result.map(productResult => productResult.item) : books

    if (props.books.length === 0) {
        if (seller) {
            return (
                <Card>
                    <h3>No Books Found in the store.want to add?</h3>
                    <Button to="/add-book">Create Book</Button>
                </Card>
            )
        }
        return (
            <Card>
                <h3>No books found in the store..</h3>
            </Card>
        )

    }

    return (
        <div>
            {props.books.length > 0 && (
                <Input
                    type="text"
                    placeholder="Search by title"
                    element="input"
                    style={{ width: "15rem", margin: "auto", height: "30px" }}
                    value={searchquery}
                    onChange={(event) => setQuery(event.target.value)} />
            )}
            <BookList books={productResults} />
        </div>
    )
}

export default AllBooks
