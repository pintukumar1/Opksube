const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }, 
    creator: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "seller"
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("book", bookSchema)