const Book = require("../models/book")

const createBook = async (req, res, next) => {
    const { title, description, price, image } = req.body
    // image = "https://i.guim.co.uk/img/media/b452c7440495801da603ef6adcccd36f6a544f6c/0_1181_2514_1509/master/2514.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=d1019b5d8d708eaff62a727ba7dfb3b7"
    const newBook = new Book({
        title,
        description,
        image,
        price
    })
    try {
        await newBook.save()
    } catch (err) {
        const error = new InternalServerError("Unable to create book, Please try again..")
        return next(error)
    }
    res.status(StatusCodes.CREATED).json({ book: newBook })
}

exports.createBook = createBook