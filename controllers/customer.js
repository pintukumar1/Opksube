const { StatusCodes } = require('http-status-codes')
const Customer = require("../models/customer")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { BadRequestError, InternalServerError, UnAuthenticatedError } = require("../errors")
const Order = require('../models/order')
const Book = require("../models/book")
const Seller = require("../models/seller")

const register = async (req, res, next) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        const error = new BadRequestError("Please provide all values.")
        return next(error)
    }

    let customerAlreadyExists
    try {
        customerAlreadyExists = await Customer.findOne({ email: email })
    } catch (err) {
        const error = new InternalServerError("Signing Up failed,Please try again later.")
        return next(error)
    }

    if (customerAlreadyExists) {
        const error = new BadRequestError("E-mail already in use.Please Login instead")
        return next(error)
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12)
    } catch (err) {
        const error = new InternalServerError("Could not create customer.please try again.")
        return next(error)
    }

    const createdCustomer = new Customer({
        name: name,
        email: email,
        password: hashedPassword
    })

    try {
        await createdCustomer.save()
    } catch (err) {
        const error = new InternalServerError("Signing Up failed, please try again.")
        return next(error)
    }

    let token
    try {
        token = jwt.sign({
            customerId: createdCustomer.id, customerEmail: createdCustomer.email
        },
            process.env.JWT_KEY, { expiresIn: process.env.JWT_LIFETIME })
    } catch (err) {
        const error = new InternalServerError("Signing up failed, please try again.")
        return next(error)
    }

    res.status(StatusCodes.CREATED).json({
        customer: {
            id: createdCustomer.id,
            name: createdCustomer.name,
            email: createdCustomer.email
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

    let existingCustomer
    try {
        existingCustomer = await Customer.findOne({ email: email })
    }
    catch (err) {
        const error = new InternalServerError("Logging in failed, Please try again")
        return next(error)
    }

    if (!existingCustomer) {
        const error = new UnAuthenticatedError("Invalid credentials, customer does not exist...")
        return next(error)
    }

    let isMatch;
    try {
        isMatch = await bcrypt.compare(password, existingCustomer.password)
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
            { customerId: existingCustomer.id, customerEmail: existingCustomer.email },
            process.env.JWT_KEY,
            { expiresIn: process.env.JWT_LIFETIME })
    } catch (err) {
        const error = new InternalServerError("Logging in failed ,Please try again..")
        return next(error)
    }

    res.status(StatusCodes.OK).json({
        customer: {
            id: existingCustomer.id,
            email: existingCustomer.email,
            name: existingCustomer.name
        },
        token: token
    })
}

const orderBook = async (req, res, next) => {
    const { name, email, contactNumber, address, pinCode, bookId } = req.body
    const orderedBy = req.customer.customerId
    if (!name || !email || !contactNumber || !address || !pinCode) {
        const error = new BadRequestError("please provide all values")
        return next(error)
    }

    const newOrder = new Order({
        name,
        email,
        contactNumber,
        address,
        pinCode,
        orderedBy,
        bookId
    })
    try {
        await newOrder.save()
    } catch (err) {
        const error = new InternalServerError("Could not create order,Please try again...")
        return next(error)
    }
    try {
        const book = await Book.findById(bookId)
        const customer = await Customer.findById(req.customer.customerId)
        customer.booksPurchased.push(bookId)
        await customer.save()
        await book.remove()
    } catch (err) {
        const error = new InternalServerError("could not create order...")
        return next(error)
    }
    res.status(StatusCodes.CREATED).json({ msg: "Book ordered successfully & deleted from books db", order: newOrder })
}

const getOrders = async (req, res, next) => {
    let orders
    try {
        orders = await Order.find({ orderedBy: req.customer.customerId })
    } catch (err) {
        const error = new InternalServerError("Could not fetch your orders, Please try again...")
        return next(error)
    }
    res.status(StatusCodes.OK).json({ msg: "orders fetched", orders: orders })
}


exports.register = register
exports.login = login
exports.orderBook = orderBook
exports.getOrders = getOrders