import React from 'react'
import { Link } from 'react-router-dom';
import Card from "../UIElements/Card"
import "./BookItem.css"

const BookItem = (props) => {
    console.log(props.key);
    return (
        <li className="book-item">
            <Card>
                <Link to={`/bookdetail/${props.id}`}>
                    <img src={props.image} alt="book-img" />
                    <h4>{props.title}</h4>
                    <h4>{props.price}</h4>
                    <h4>{props.description}</h4>
                </Link>
            </Card>
        </li>
    )
}

export default BookItem
