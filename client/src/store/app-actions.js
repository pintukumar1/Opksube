import { appActions } from "./app-slice"

export const clearErrorHandler = () => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(appActions.clearError())
        }, 3000)
    }
}

export const getBooksData = () => {
    return async (dispatch) => {
        const getBooks = async () => {
            const response = await fetch(
                "/api/books/getbooks"
            )
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.msg)
            }
            return data
        }
        try {
            const fetchedBooks = await getBooks()
            dispatch(appActions.getBooks({
                alertText: "",
                showAlert: false,
                books: fetchedBooks.books,
                totalQuantity: fetchedBooks.totalBooks
            })
            )
        } catch (err) {
            dispatch(appActions.errorHandler({
                alertText: err.message,
                showAlert: true
            }))
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
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.msg)
            }
            return data
        }
        try {
            const sellerData = await signupSeller()
            const { seller, token } = sellerData
            dispatch(appActions.registerSeller({
                alertText: "",
                showAlert: false,
                seller: seller,
                sellerToken: token
            }))
            addSellerToLocalStorage({ seller, token })
        } catch (err) {
            dispatch(appActions.errorHandler({
                alertText: err.message,
                showAlert: true
            }))
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
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.msg)
            }
            return data
        }
        try {
            const sellerData = await loginSeller()
            const { seller, token } = sellerData
            dispatch(appActions.loginSeller({
                alertText: "",
                seller: seller,
                sellerToken: token,
                showAlert: false
            }))
            addSellerToLocalStorage({ seller, token })
        } catch (err) {
            dispatch(appActions.errorHandler({
                alertText: err.message,
                showAlert: true
            }))
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
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.msg)
            }
            return data
        }
        try {
            const customerData = await signupCustomer()
            const { customer, token } = customerData
            dispatch(appActions.registerCustomer({
                alertText: "",
                showAlert: false,
                customer: customer,
                customerToken: token
            }))
            addCustomerToLocalStorage({ customer, token })
        } catch (err) {
            dispatch(appActions.errorHandler({
                alertText: err.message,
                showAlert: true
            }))
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
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.msg)
            }
            return data
        }
        try {
            const customerData = await loginCustomer()
            const { customer, token } = customerData
            dispatch(appActions.loginCustomer({
                alertText: "",
                showAlert: false,
                customer: customer,
                customerToken: token
            }))
            addCustomerToLocalStorage({ customer, token })
        } catch (err) {
            dispatch(appActions.errorHandler({
                alertText: err.message,
                showAlert: true
            }))
        }
    }
}

export const orderBookHandler = (userData, cusToken, bookId) => {
    return async (dispatch) => {
        const orderBook = async () => {
            const response = await fetch(`/api/customer/orderbook/${bookId}`, {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + cusToken
                }
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.msg)
            }
            return data
        }
        try {
            const orderData = await orderBook()
            const { order } = orderData
            dispatch(appActions.orderBook({
                order: order,
                showAlert: false
            }))
        } catch (err) {
            dispatch(appActions.errorHandler({
                alertText: err.message,
                showAlert: true
            }))
        }
    }
}


export const createBookHandler = (formData, sellerToken) => {
    return async (dispatch) => {
        const createBook = async () => {
            const response = await fetch("/api/seller/createbook", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sellerToken
                }
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.msg)
            }
            return data
        }
        try {
            const bookData = await createBook()
            const { book } = bookData
            dispatch(appActions.orderBook({
                alertText: "",
                showAlert: false,
                books: book
            }))
        } catch (err) {
            dispatch(appActions.errorHandler({
                alertText: err.message,
                showAlert: true
            }))
        }
    }
}

export const getCustomerOrders = (customerToken) => {
    return async (dispatch) => {
        const getOrders = async () => {
            const response = await fetch("/api/customer/getorders", {
                headers: {
                    "Authorization": "Bearer " + customerToken
                }
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.msg)
            }
            return data
        }
        try {
            const ordersData = await getOrders()
            const { orders } = ordersData
            dispatch(appActions.getOrders({
                alertText: "",
                orders: orders,
                showAlert: false
            }))
        } catch (err) {}
    }
}

export const getSoldBooksOfSeller = (sellerToken) => {
    return async (dispatch) => {
        const getsoldBooks = async () => {
            const response = await fetch("/api/seller/getsoldbooks", {
                headers: {
                    "Authorization": "Bearer " + sellerToken
                }
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.msg)
            }
            return data
        }
        try {
            const booksData = await getsoldBooks()
            const { books, booksSold } = booksData
            dispatch(appActions.getSoldBooks({
                sellerBooks: books,
                booksSold: booksSold
            }))
        } catch (err) {}
    }
}

