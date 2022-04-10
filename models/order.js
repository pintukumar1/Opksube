const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pinCode: {
        type: Number,
        required: true
    },
    bookId:{ 
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "book"
    },
    orderedBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "customer"
    }
})


module.exports = mongoose.model("order", orderSchema)