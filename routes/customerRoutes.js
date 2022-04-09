const express = require("express")
const router = express.Router()

const customerController = require("../controllers/customer")

router.post("/register", customerController.register)
router.post("/login", customerController.login)

module.exports = router