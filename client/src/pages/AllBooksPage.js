import React from 'react'
import BookList from '../components/BookList/BookList'

const allBooks = (props) => {
    return (
        <div>
            <BookList books={props.books}/>
        </div>
    )
}

export default allBooks
