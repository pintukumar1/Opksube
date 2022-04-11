import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Card from '../components/UIElements/Card'
import { getCustomerOrders } from "../store/app-actions"

const CustomerOrders = () => {
    const dispatch = useDispatch()
    const customerToken = useSelector(state => state.app.customerToken)
    const orders = useSelector(state => state.app.orders)

    useEffect(() => {
        dispatch(getCustomerOrders(customerToken))
    }, [customerToken])

    if (orders.length === 0) {
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
                <Card className="center" key={order._id}>
                    <h3>OrderID: {order._id}</h3>
                    <h4>BookId: {order.bookId}</h4>
                </Card>
            ))}
        </div>
    )
}

export default CustomerOrders
