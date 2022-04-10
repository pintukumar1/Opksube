import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/FormElements/Button'
import Input from '../components/FormElements/Input'
import { registerSellerData, loginSellerData } from "../store/seller-actions"
import { useDispatch } from "react-redux"

const SellerAuth = () => {
    const dispatch = useDispatch()
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
        navigate("/")
    };

    return (
        <div>
            <form className="seller-auth" onSubmit={sellerAuthHandler}>
                <h2 style={{ textAlign: "center" }}>Login</h2>
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
