import React from 'react'
import { Link } from 'react-router-dom';
import Card from "../UIElements/Card"
import "./BookItem.css"
import Button from "../FormElements/Button"

const BookItem = (props) => {
    return (
        <li className="book-item">
            <Card className="book-card">
                <div>
                    <img src={props.image} alt="book-img" />
                    <h4>{props.title}</h4>
                    <h4>{props.price}</h4>
                    <h4>{props.description}</h4>
                </div>
                <Link to={`/bookdetails/${props.id}`}>
                    <Button>View Details</Button>
                </Link>
            </Card>
        </li>
    )
}

export default BookItem
