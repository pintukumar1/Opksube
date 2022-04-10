import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { appActions } from '../../store/app-slice';
import Button from '../FormElements/Button';
import './Navlinks.css'

function Navlinks() {
    const dispatch = useDispatch()
    const seller = useSelector(state => state.app.seller)
    const customer = useSelector(state => state.app.customer)

    return (
        <ul className='nav-links'>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? 'active' : undefined
                    }>
                    ALL BOOKS
                </NavLink>
            </li>
            {seller && <li>
                <NavLink
                    to="/add-book"
                    className={({ isActive }) =>
                        isActive ? "active" : undefined
                    }>
                    ADD BOOK
                </NavLink>
            </li>
            }
            {!customer && !seller && <li>
                <NavLink
                    to="/seller-auth"
                    className={({ isActive }) =>
                        isActive ? "active" : undefined
                    }>
                    SELLER AUTH
                </NavLink>
            </li>
            }
            {!seller && !customer && <li>
                <NavLink
                    to="/customer-auth"
                    className={({ isActive }) =>
                        isActive ? "active" : undefined
                    }>
                    CUSTOMER AUTH
                </NavLink>
            </li>
            }
            {(seller || customer) && <li>
                <Button onClick={() => dispatch(appActions.logout())}>
                    LOGOUT
                </Button>
            </li>}
        </ul>
    )
}

export default Navlinks