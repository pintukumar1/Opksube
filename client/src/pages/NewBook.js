import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/FormElements/Input';
import Button from '../components/FormElements/Button';
import ImageUpload from "../components/FormElements/ImageUpload"
import { useDispatch, useSelector } from 'react-redux';
import { createBookHandler } from "../store/app-actions"
import './NewBook.css';
import { appActions } from '../store/app-slice';

const NewBook = () => {
    const dispatch = useDispatch()
    const sellerToken = useSelector(state => state.app.sellerToken)
    const navigate = useNavigate();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")

    const placeSubmitHandler = async event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("title", title)
        formData.append("description", description)
        formData.append("price", price)
        formData.append("image", image)
        dispatch(createBookHandler(formData, sellerToken))
        // navigate('/');
    };

    return (
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
            <ImageUpload
                id="image"
                value={image}
                onChange={(event) => setImage(event.target.files[0])}
            />
            <Button type="submit">
                ADD BOOK
            </Button>
        </form>
    );
};

export default NewBook;
