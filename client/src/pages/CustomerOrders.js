import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Card from '../components/UIElements/Card'
import { getCustomerOrders } from "../store/app-actions"
import "../components/BookItem/BookItem.css"

const CustomerOrders = () => {
    const dispatch = useDispatch()
    const customerToken = useSelector(state => state.app.customerToken)
    const orders = useSelector(state => state.app.orders)

    console.log(orders)

    useEffect(() => {}, [])

    useEffect(() => {
        dispatch(getCustomerOrders(customerToken))
    }, [customerToken])

    if (orders && orders.length === 0) {
        return (
            <Card>
                <h3>You haven't ordered anything till now, Please order something..</h3>
            </Card>
        )
    }

    return (
        <div>
            <h1 className="center">Your Orders</h1>
            {orders.map(order => (
                <Card className="bookcard">
                <div>
                    <img src={order.bookId.image} alt="bookimg" />
                    <h4>{order.bookId.title}</h4>
                </div>
            </Card>
            ))}
        </div>
    )
}

export default CustomerOrders
