import { sellerActions } from "./seller-slice"

const addSellerToLocalStorage = ({ seller, token }) => {
    localStorage.setItem("seller", seller)
    localStorage.setItem("sellerToken", token)
}

const removeSellerFromLocalStorage = () => {
    localStorage.removeItem("seller")
    localStorage.removeItem("sellerToken")
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
            dispatch(sellerActions.register({
                seller: seller,
                token: token
            }))
            addSellerToLocalStorage({seller, token})
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
            console.log(sellerData)
            const { seller, token } = sellerData
            dispatch(sellerActions.login({
                seller: seller,
                token: token
            }))
            addSellerToLocalStorage({seller, token})
        } catch (err) {
            console.log(err)
        }
    }
}

