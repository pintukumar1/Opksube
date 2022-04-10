import { customerActions } from "./customer-slice"

const addCustomerToLocalStorage = ({ customer, token }) => {
    localStorage.setItem("customer", customer)
    localStorage.setItem("token", token)
}

const removeCustomerFromLocalStorage = () => {
    localStorage.removeItem("customer")
    localStorage.removeItem("token")
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
            dispatch(customerActions.register({
                customer: customer,
                token: token
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
            dispatch(customerActions.login({
                customer: customer,
                token: token
            }))
            addCustomerToLocalStorage({ customer, token })
        } catch (err) {
            console.log(err)
        }
    }
}

