import React from 'react'
import BookItem from '../BookItem/BookItem'
import "./BookList.css"

const BookList = (props) => {
    return (
        <ul className="book-list">
            {props.books.map((book) => (
                <BookItem
                    key={book._id}
                    id={book._id}
                    image={book.image}
                    title={book.title}
                    description={book.description}
                    price={book.price}
                />
            ))}
        </ul>
    )
}

export default BookList
