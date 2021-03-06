import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/FormElements/Button'
import Input from '../components/FormElements/Input'
import { registerCustomerData, loginCustomerData, clearErrorHandler } from "../store/app-actions"
import { useDispatch, useSelector } from "react-redux"
import Alert from '../components/Alert/Alert'

const CustomerAuth = () => {
    const dispatch = useDispatch()
    const showAlert = useSelector(state => state.app.showAlert)
    const alertText = useSelector(state => state.app.alertText)
    const customer = useSelector(state => state.app.customer)
    const [isMember, setMember] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [contactNumber, setContactNumber] = useState("")

    const navigate = useNavigate();

    const customerAuthHandler = async (event) => {
        event.preventDefault();

        const dataForLogin = {
            email, password
        }
        const dataForRegister = {
            name, email, password, contactNumber
        }
        if (isMember) {
            dispatch(loginCustomerData(dataForLogin))
        } else {
            dispatch(registerCustomerData(dataForRegister))
        }
        dispatch(clearErrorHandler())
    };

    useEffect(() => {
        if (customer) {
            setTimeout(() => {
                navigate("/")
            }, 3000)
        }
    }, [customer, navigate])

    return (
        <div>
            {showAlert && <Alert alertText={alertText} />}
            <form className="seller-auth" onSubmit={customerAuthHandler}>
                <h2 style={{ textAlign: "center" }}>Customer Authentication</h2>
                {!isMember && <Input
                    id="name"
                    element="input"
                    type="text"
                    label="Name"
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                />}
                <Input
                    id="email"
                    element="input"
                    type="email"
                    label="Email"
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                />
                <Input
                    id="password"
                    element="input"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                {!isMember && <Input
                    id="contactNumber"
                    element="input"
                    label="Contact Number"
                    type="text"
                    value={contactNumber}
                    onChange={(event) => setContactNumber(event.target.value)}
                />
                }
                <Button type="submit">
                    {isMember ? "Login" : "Register"}
                </Button>
            </form>
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <Button inverse onClick={() => setMember(!isMember)}>{isMember ? "Switch to signup" : "switch to login"}</Button>
            </div>
        </div>
    )
}

export default CustomerAuth
