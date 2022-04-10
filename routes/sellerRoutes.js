const express = require("express");
const router = express.Router()
const sellerController = require("../controllers/seller")
const { verifySeller } = require("../middleware/is-auth")
const fileUpload = require("../middleware/file-upload")

router.post("/register", sellerController.register)
router.post("/login", sellerController.login)
router.post("/createbook", fileUpload.single('image') ,verifySeller ,sellerController.createBook)

module.exports = router