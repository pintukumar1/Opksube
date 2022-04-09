const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
require("dotenv").config()

const app = express()
app.use(bodyParser.json())

app.use("/api/product", productRoutes)

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