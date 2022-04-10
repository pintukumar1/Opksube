import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { appActions } from '../../store/app-slice';
import Button from '../FormElements/Button';
import './Navlinks.css'

function Navlinks(props) {
    const dispatch = useDispatch()
    const seller = useSelector(state => state.app.seller)
    const customer = useSelector(state => state.app.customer)
    const navigate = useNavigate()

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
            {seller && <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "active" : undefined
                    }>
                    ADD BOOK
                </NavLink>
            </li>
            }
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
            {(seller || customer) && <li>
                <Button onClick={() => dispatch(appActions.logout())}>
                    LOGOUT
                </Button>
            </li>}
        </ul>
    )
}

export default Navlinks