const express = require("express")
const router = express.Router()

const customerController = require("../controllers/customer")
const { verifyCustomer } = require("../middleware/is-auth")

router.post("/register", customerController.register)
router.post("/login", customerController.login)
router.post("/orderbook", verifyCustomer , customerController.orderBook)
router.get("/getorders", verifyCustomer , customerController.getOrders)

module.exports = router