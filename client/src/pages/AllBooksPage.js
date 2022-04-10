import React from 'react'
import BookList from '../components/BookList/BookList'
import Card from '../components/UIElements/Card'


const allBooks = (props) => {

    if(props.books.length === 0) {
        return <Card>
            <h3>No Books Found in the store.Please wait for the seller to create some...</h3>
        </Card>
    }

    return (
        <div>
            <BookList books={props.books}/>
        </div>
    )
}

export default allBooks
