const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    booksPurchased: [
        { 
            type: mongoose.Types.ObjectId, 
            ref: 'book' 
        }
    ]
});


module.exports = mongoose.model('customer', customerSchema);
