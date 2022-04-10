import { appActions } from "./app-slice"

export const getBooksData = () => {
    return async (dispatch) => {
        const getBooks = async () => {
            const response = await fetch(
                "/api/books/getbooks"
            )
            if (!response.ok) {
                throw new Error("Could not fetch data..")
            }
            const data = await response.json()
            return data;
        }
        try {
            const fetchedBooks = await getBooks()
            dispatch(appActions.getBooks({
                books: fetchedBooks.books,
                totalQuantity: fetchedBooks.totalBooks
            })
            )
        } catch (err) {
            console.log(err)
        }
    }
}

const addSellerToLocalStorage = ({ seller, token }) => {
    localStorage.setItem("seller", seller)
    localStorage.setItem("sellerToken", token)
}

export const registerSellerData = (currentSeller) => {
    return async (dispatch) => {
        const signupSeller = async () => {
            const response = await fetch("/api/seller/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(currentSeller)
            })
            console.log(response)
            if (!response.ok) {
                throw new Error("Could not register, Please try again..")
            }
            const data = response.json()
            console.log(data)
            return data
        }
        try {
            const sellerData = await signupSeller()
            const { seller, token } = sellerData
            dispatch(appActions.registerSeller({
                seller: seller,
                sellerToken: token
            }))
            addSellerToLocalStorage({ seller, token })
        } catch (err) {
            console.log(err)
        }
    }
}

export const loginSellerData = (currentSeller) => {
    return async (dispatch) => {
        const loginSeller = async () => {
            const response = await fetch("/api/seller/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(currentSeller)
            })
            if (!response.ok) {
                throw new Error("Could not login, Please try again..")
            }
            const data = response.json()
            return data
        }
        try {
            const sellerData = await loginSeller()
            const { seller, token } = sellerData
            dispatch(appActions.loginSeller({
                seller: seller,
                sellerToken: token
            }))
            addSellerToLocalStorage({ seller, token })
        } catch (err) {
            console.log(err)
        }
    }
}

const addCustomerToLocalStorage = ({ customer, token }) => {
    localStorage.setItem("customer", customer)
    localStorage.setItem("customerToken", token)
}

export const registerCustomerData = (currentCustomer) => {
    return async (dispatch) => {
        const signupCustomer = async () => {
            const response = await fetch("/api/customer/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(currentCustomer)
            })
            if (!response.ok) {
                throw new Error("Could not register, Please try again..")
            }
            const data = response.json()
            return data
        }
        try {
            const customerData = await signupCustomer()
            const { customer, token } = customerData
            dispatch(appActions.registerCustomer({
                customer: customer,
                customerToken: token
            }))
            addCustomerToLocalStorage({ customer, token })
        } catch (err) {
            console.log(err)
        }
    }
}

export const loginCustomerData = (currentCustomer) => {
    return async (dispatch) => {
        const loginCustomer = async () => {
            const response = await fetch("/api/customer/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(currentCustomer)
            })
            if (!response.ok) {
                throw new Error("Could not login, Please try again..")
            }
            const data = response.json()
            return data
        }
        try {
            const customerData = await loginCustomer()
            const { customer, token } = customerData
            dispatch(appActions.loginCustomer({
                customer: customer,
                customerToken: token
            }))
            addCustomerToLocalStorage({ customer, token })
        } catch (err) {
            console.log(err)
        }
    }
}

const removeItemFromLocalStorage = () => {
    localStorage.removeItem("seller")
    localStorage.removeItem("sellerToken")
    localStorage.removeItem("customer")
    localStorage.removeItem("customerToken")
}

export const logoutHandler = async () => {
    return (dispatch) => {
        removeItemFromLocalStorage()
        dispatch(appActions.logout())
    }
}