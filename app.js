const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const morgan = require("morgan")
const cors = require("cors")
const errorHandlerMiddleware = require("./middleware/errorHandler")
const notFoundMiddleware = require("./middleware/not-found")
require("dotenv").config()
const sellerRoutes = require("./routes/sellerRoutes")
const customerRoutes = require("./routes/customerRoutes")
const bookRoutes = require("./routes/bookRoutes")

const app = express()

app.use(express.static(path.resolve(__dirname, "./client/build")))

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

if(process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"))
}

app.use("/api/seller", sellerRoutes)
app.use("/api/customer/", customerRoutes)
app.use("/api/books", bookRoutes)

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, () => {
            app.listen(port)
        })
    } catch (error) {}
}

start()