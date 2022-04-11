import React, { useState, useEffect } from 'react'
import BookList from '../components/BookList/BookList'
import Card from '../components/UIElements/Card'
import Input from "../components/FormElements/Input"
import { useDispatch, useSelector } from "react-redux"
import Fuse from "fuse.js"
import Button from '../components/FormElements/Button'
import { getBooksData } from "../store/app-actions"
import Alert from '../components/Alert/Alert'

const AllBooks = (props) => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState("")
    const books = useSelector(state => state.app.books)
    const showAlert = useSelector(state => state.app.showAlert)
    const alertText = useSelector(state => state.app.alertText)
    const seller = useSelector(state => state.app.seller)

    useEffect(() => {
        dispatch(getBooksData())
    }, [])

    const fuse = new Fuse(books, {
        keys: ["title"]
    })
    const result = fuse.search(search)

    const productResults = search ? result.map(productResult => productResult.item) : books

    if (books.length === 0) {
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
            {books.length > 0 && (
                <Input
                    type="text"
                    placeholder="Search by title"
                    element="input"
                    style={{ width: "15rem", margin: "auto", height: "30px" }}
                    value={search}
                    onChange={(event) => setSearch(event.target.value)} />
            )}
            {showAlert && <Alert alertText={alertText} />}
            <BookList books={productResults} />
        </div>
    )
}

export default AllBooks
