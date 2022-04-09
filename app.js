const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const errorHandlerMiddleware = require("./middleware/errorHandler")
const notFoundMiddleware = require("./middleware/not-found")
require("dotenv").config()
const sellerRoutes = require("./routes/sellerRoutes")
const customerRoutes = require("./routes/customerRoutes")

const app = express()
app.use(bodyParser.json())

app.use("/api/seller", sellerRoutes)
app.use("/api/customer/", customerRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, () => {
            app.listen(port, () => {
                console.log(`app is listening on port ${port}`);
            })
        })
    } catch (error) {
        console.log(error)
    }
}

start()