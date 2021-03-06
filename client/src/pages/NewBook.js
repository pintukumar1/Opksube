import React, { useState } from 'react';
import Input from '../components/FormElements/Input';
import Button from '../components/FormElements/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrorHandler, createBookHandler } from "../store/app-actions"
import Alert from '../components/Alert/Alert'
import './NewBook.css';
import { useNavigate } from 'react-router-dom';

const NewBook = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alertText = useSelector(state => state.app.alertText)
    const sellerToken = useSelector(state => state.app.sellerToken)
    const showAlert = useSelector(state => state.app.showAlert)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")

    const placeSubmitHandler = event => {
        event.preventDefault();
        const formData = { title, description, price, image }
        dispatch(createBookHandler(formData, sellerToken))
        dispatch(clearErrorHandler())
    };

    return (
        <div>
            {showAlert && <Alert alertText={alertText} />}
            <h2>Create a new book</h2>
            <form className="bookform" onSubmit={placeSubmitHandler}>
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <Input
                    id="price"
                    element="input"
                    label="Price"
                    type="number"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                />
                <Input
                    id="image"
                    element="input"
                    label="Image"
                    type="text"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                />
                <Button type="submit">
                    ADD BOOK
                </Button>
            </form>
        </div>
    );
};

export default NewBook;
