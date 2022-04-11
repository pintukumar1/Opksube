const { StatusCodes } = require('http-status-codes')
const Seller = require("../models/seller")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { BadRequestError, InternalServerError, UnAuthenticatedError } = require("../errors")
const Book = require('../models/book')

const register = async (req, res, next) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        const error = new BadRequestError("Please provide all values.")
        return next(error)
    }

    let sellerAlreadyExists
    try {
        sellerAlreadyExists = await Seller.findOne({ email: email })
    } catch (err) {
        const error = new InternalServerError("Signing Up failed,Please try again later.")
        return next(error)
    }

    if (sellerAlreadyExists) {
        const error = new BadRequestError("E-mail already in use.Please Login instead")
        return next(error)
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12)
    } catch (err) {
        const error = new InternalServerError("Could not create seller.please try again.")
        return next(error)
    }

    const createdSeller = new Seller({
        name: name,
        email: email,
        password: hashedPassword
    })

    try {
        await createdSeller.save()
    } catch (err) {
        const error = new InternalServerError("Signing Up failed, please try again.")
        return next(error)
    }

    let token
    try {
        token = jwt.sign({
            sellerId: createdSeller.id, sellerEmail: createdSeller.email
        },
            process.env.JWT_KEY, { expiresIn: process.env.JWT_LIFETIME })
    } catch (err) {
        const error = new InternalServerError("Signing up failed, please try again.")
        return next(error)
    }

    res.status(StatusCodes.CREATED).json({
        seller: {
            id: createdSeller.id,
            name: createdSeller.name,
            email: createdSeller.email
        },
        token: token
    })
}

const login = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        const error = new BadRequestError("Please provide all values..")
        return next(error)
    }

    let existingSeller
    try {
        existingSeller = await Seller.findOne({ email: email })
    }
    catch (err) {
        const error = new InternalServerError("Logging in failed, Please try again")
        return next(error)
    }

    if (!existingSeller) {
        const error = new UnAuthenticatedError("Invalid credentials, seller does not exist...")
        return next(error)
    }

    let isMatch;
    try {
        isMatch = await bcrypt.compare(password, existingSeller.password)
    } catch (err) {
        const error = new InternalServerError("Could not log you in, Please check your credentials and try again..")
        return next(error)
    }

    if (!isMatch) {
        const error = new UnAuthenticatedError("Invalid credentials, could not log you in... ")
        return next(error)
    }

    let token;
    try {
        token = jwt.sign(
            { sellerId: existingSeller.id, sellerEmail: existingSeller.email },
            process.env.JWT_KEY,
            { expiresIn: process.env.JWT_LIFETIME })
    } catch (err) {
        const error = new InternalServerError("Logging in failed ,Please try again..")
        return next(error)
    }

    res.status(StatusCodes.OK).json({
        seller: {
            id: existingSeller.id,
            email: existingSeller.email,
            name: existingSeller.name
        },
        token: token
    })
}

// https://i.guim.co.uk/img/media/b452c7440495801da603ef6adcccd36f6a544f6c/0_1181_2514_1509/master/2514.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=d1019b5d8d708eaff62a727ba7dfb3b7"

const createBook = async (req, res, next) => {
    const { title, description, price, image } = req.body

    if (!title || !description || !price || !image) {
        const error = new BadRequestError("Please provide all values...")
        return next(error)
    }
    const newBook = new Book({
        title,
        description,
        price,
        image ,
        creator: req.seller.sellerId
    })
    try {
        await newBook.save()
    } catch (err) {
        const error = new InternalServerError("Unable to create book, Please try again..")
        return next(error)
    }
    res.status(StatusCodes.CREATED).json({ book: newBook })
}

exports.register = register
exports.login = login
exports.createBook = createBook
