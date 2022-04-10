const { StatusCodes } = require('http-status-codes')
const fs = require("fs")

const errorHandlerMiddleware = (err, req, res, next) => {
    const defaultError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong, try again later."
    }
    if (req.file) {
        fs.unlink(req.file.path, err => {
            console.log(err)
        })
    }
    if (err.code && err.code === 11000) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST,
            defaultError.msg = `${Object.keys(err.keyValue)} has to be unique.`
    }
    if (err.name === "ValidationError") {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.msg = Object.values(err.errors).map((item) => item.message).join(",")
    }
    res.status(defaultError.statusCode).json({ msg: defaultError.msg })
}

module.exports = errorHandlerMiddleware
