import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Card from '../components/UIElements/Card'
import "./BookDetails.css"
import Button from '../components/FormElements/Button'

const BookDetails = () => {
    const [book, setBook] = useState({})
    const bookId = useParams().bookId;

    const getBookDetail = async () => {
        try {
            const response = await fetch(`/api/books/book/${bookId}`)
            const data = await response.json()
            setBook(data.book)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getBookDetail()
    }, [])

    return (
        <div className='book-item'>
            <Card className='book-item__content'>
                <div className='book-item__image'>
                    <img src={book.image} alt={book.title} />
                </div>
                <div className='book-item__info'>
                    <h2>{book.title}</h2>
                    <h3>{book.price}</h3>
                    <p>{book.description}</p>
                </div>
                <div className='book-item__actions'>
                    <Button inverse onClick={() => console.log("Added to cart..")}>Add to Cart</Button>
                </div>
            </Card>
        </div>
    )
}

export default BookDetails
