import React, { useState } from 'react'
import Input from '../components/FormElements/Input'
import Button from '../components/FormElements/Button'
import "./NewBook.css"
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { clearErrorHandler, orderBookHandler } from "../store/app-actions"
import Alert from '../components/Alert/Alert'

const Order = () => {
    const cusToken = useSelector(state => state.app.customerToken)
    const customer = useSelector(state => state.app.customer)
    const showAlert = useSelector(state => state.app.showAlert)
    const alertText = useSelector(state => state.app.alertText)
    const dispatch = useDispatch()
    const [name, setName] = useState(customer.name)
    const [email, setEmail] = useState(customer.email)
    const [contactNumber, setContactNumber] = useState(customer.contactNumber)
    const [address, setAddress] = useState("")
    const [pinCode, setPinCode] = useState("")
    const [bookId, setBookId] = useState("")

    const orderHandler = async (event) => {
        event.preventDefault()
        const userData = { name, email, contactNumber, address, pinCode , bookId }
        dispatch(orderBookHandler(userData, cusToken))
        dispatch(clearErrorHandler())
    }

    return (
        <>
            {showAlert && <Alert alertText={alertText} />}
            <h2 className="center">Checkout</h2>
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
                <Input
                    id="bookId"
                    element="input"
                    type="text"
                    label="Book Id"
                    onChange={(event) => setBookId(event.target.value)}
                />
                <Button type="submit">
                    Purchase
                </Button>
            </form>
        </>
    )
}

export default Order
