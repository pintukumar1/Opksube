import React, { useState } from 'react'
import Input from '../components/FormElements/Input'
import Button from '../components/FormElements/Button'
import "./NewBook.css"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { orderBookHandler } from "../store/app-actions"
import ErrorAlert from '../components/ErrorAlert/ErrorAlert'

const Order = () => {
    const cusToken = useSelector(state => state.app.customerToken)
    const errorText = useSelector(state => state.app.errorText)
    const dispatch = useDispatch()
    const bookId = useParams().bookId
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [address, setAddress] = useState("")
    const [pinCode, setPinCode] = useState("")

    const orderHandler = async (event) => {
        event.preventDefault()
        const userData = { name, email, contactNumber, address, pinCode, bookId }
        dispatch(orderBookHandler(userData, cusToken))
    }

    return (
        <>
            {errorText && <ErrorAlert errorText={errorText} />}
            <form className="bookform" onSubmit={orderHandler}>
                <Input
                    id="name"
                    element="input"
                    type="text"
                    label="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <Input
                    id="email"
                    type="email"
                    element="input"
                    label="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <Input
                    id="contactNumber"
                    type="text"
                    element="input"
                    label="Contact Number"
                    value={contactNumber}
                    onChange={(event) => setContactNumber(event.target.value)}
                />
                <Input
                    id="address"
                    type="text"
                    label="Address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                />
                <Input
                    id="pin"
                    type="text"
                    element="input"
                    label="Pin Code"
                    value={pinCode}
                    onChange={(event) => setPinCode(event.target.value)}
                />
                <Button type="submit">
                    Purchase
                </Button>
            </form>
        </>
    )
}

export default Order
