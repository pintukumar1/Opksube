import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/FormElements/Button'
import Input from '../components/FormElements/Input'
import { registerSellerData, loginSellerData, clearErrorHandler } from "../store/app-actions"
import { useDispatch, useSelector } from "react-redux"
import ErrorAlert from '../components/ErrorAlert/ErrorAlert'

const SellerAuth = () => {
    const dispatch = useDispatch()
    const seller = useSelector(state => state.app.seller)
    const showError = useSelector(state => state.app.showError)
    const errorText = useSelector(state => state.app.errorText)
    const [isMember, setMember] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const navigate = useNavigate();

    const sellerAuthHandler = async (event) => {
        event.preventDefault();

        const dataForLogin = {
            email, password
        }
        const dataForRegister = {
            name, email, password
        }
        if (isMember) {
            dispatch(loginSellerData(dataForLogin))
        } else {
            dispatch(registerSellerData(dataForRegister))
        }
        dispatch(clearErrorHandler())
    };

    useEffect(() => {
        if(seller) {
            setTimeout(() => {
                navigate("/")
            }, 3000)
        }
    }, [seller, navigate])

    return (
        <div>
            {showError && <ErrorAlert errorText={errorText} />}
            <form className="seller-auth" onSubmit={sellerAuthHandler}>
                <h2 style={{ textAlign: "center" }}>Seller Authentication</h2>
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

export default SellerAuth
