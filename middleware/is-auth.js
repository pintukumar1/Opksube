const jwt = require("jsonwebtoken")
const { UnAuthenticatedError } = require("../errors")

const verifySeller = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        throw new UnAuthenticatedError("authentication failed.")
    }
    try {
        const token = authHeader.split(" ")[1]
        if (!token) {
            throw new UnAuthenticatedError("authentication failed..")
        }
        const decodedToken = jwt.verify(token, process.env.JWT_KEY)
        req.seller = { sellerId: decodedToken.sellerId, sellerEmail: decodedToken.sellerEmail }
        next()
    } catch (err) {
        throw new UnAuthenticatedError("Authentication failed...")
    }
}

const verifyCustomer = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        throw new UnAuthenticatedError("authentication failed.")
    }
    try {
        const token = authHeader.split(" ")[1]
        if (!token) {
            throw new UnAuthenticatedError("authentication failed..")
        }
        const decodedToken = jwt.verify(token, process.env.JWT_KEY)
        req.customer = { customerId: decodedToken.customerId, customerEmail: decodedToken.customerEmail }
        next()
    } catch (err) {
        throw new UnAuthenticatedError("Authentication failed...")
    }
}
    
exports.verifySeller = verifySeller
exports.verifyCustomer = verifyCustomer