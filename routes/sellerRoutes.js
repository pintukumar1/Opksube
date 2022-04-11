const express = require("express");
const router = express.Router()
const sellerController = require("../controllers/seller")
const { verifySeller } = require("../middleware/is-auth")

router.post("/register", sellerController.register)
router.post("/login", sellerController.login)
router.post("/createbook", verifySeller, sellerController.createBook)
router.get("/getsoldbooks", verifySeller, sellerController.getSoldBooksBySeller)

module.exports = router