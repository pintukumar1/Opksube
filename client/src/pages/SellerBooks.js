import React, { useEffect } from 'react'
import { getSoldBooksOfSeller } from '../store/app-actions'
import { useDispatch, useSelector } from "react-redux"
import Card from '../components/UIElements/Card'

const SellerBooks = () => {
    const dispatch = useDispatch()
    const sellerToken = useSelector(state => state.app.sellerToken)
    const sellerBooks = useSelector(state => state.app.sellerBooks)
    const booksSold = useSelector(state => state.app.booksSold)

    useEffect(() => {
        dispatch(getSoldBooksOfSeller(sellerToken))
    }, [])

    if ((sellerBooks.length === 0) && (booksSold.length === 0)) {
        return (
            <Card>
                <h3>No Books Found...</h3>
            </Card>
        )
    }

    return (
        <div className="center">
            <div >
                <h1>Your Total Books</h1>
                {sellerBooks.map(book => (
                    <Card className="center" key={book._id}>
                        <h3>BookId: {book._id}</h3>
                    </Card>
                ))}
            </div>
            <div>
                <h1 className="center">Sold Books</h1>
                {booksSold.map(book => (
                    <Card key={book._id}>
                        <h3>Book ID: {book._id}</h3>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default SellerBooks
