import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from '../FormElements/Button';
import './Navlinks.css'

function Navlinks(props) {
    return (
        <ul className='nav-links'>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? 'active' : undefined
                    }>
                    ALL Books
                </NavLink>
            </li>
            <li >
                <NavLink
                    // to={`/${auth.userId}/places`}
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "active" : undefined
                    }>
                    MY BOOKS
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "active" : undefined
                    }>
                    ADD BOOK
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/seller-auth"
                    className={({ isActive }) =>
                        isActive ? "active" : undefined
                    }>
                    SELLER AUTHENTICATION
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/customer-auth"
                    className={({ isActive }) =>
                        isActive ? "active" : undefined
                    }>
                    CUSTOMER AUTHENTICATION
                </NavLink>
            </li>
            <li>
                <Button onClick={() => console.log("hello")}>
                    LOGOUT
                </Button>
            </li>
        </ul>
    )
}

export default Navlinks