const express = require("express")
const router = express.Router()

const bookController = require("../controllers/book")

router.get("/getbooks", bookController.getBooks)

router.get("/book/:bookId", bookController.getBookDetails)

module.exports = router