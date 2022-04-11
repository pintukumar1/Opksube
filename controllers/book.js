const { StatusCodes } = require("http-status-codes")
const { InternalServerError } = require("../errors")
const Book = require("../models/book")

const getBooks = async (req, res, next) => {
    let books
    try {
        books = await Book.find()
    } catch (err) {
        const error = new InternalServerError("Could not fetch books,Please try again...")
        return next(error)
    }
    res.status(StatusCodes.OK).json({ books, totalBooks: books.length, msg: "fetched books successfully" })
}

const getBookDetails = async (req, res, next) => {
    const bookId = req.params.bookId
    let book
    try {
        book = await Book.findById(bookId)
    } catch (err) {
        const error = new InternalServerError("Could not fetch the book details, Please try again...")
        return next(error)
    }
    res.status(StatusCodes.OK).json({ book })
}

exports.getBooks = getBooks
exports.getBookDetails = getBookDetails