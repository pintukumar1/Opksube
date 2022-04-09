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
            sellerId: createdSeller.id, email: createdSeller.email
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
            { sellerId: existingSeller.id, email: existingSeller.email },
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


exports.register = register
exports.login = login
