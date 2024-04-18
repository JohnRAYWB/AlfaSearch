require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require('./swagger.js')

const app = express()

const url = `mongodb://${process.env.MONGODB_URL}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}`

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const start = async () => {
    try {
        await mongoose.connect(url)
        app.listen(PORT, () => {
            console.log(`SERVER HAS BEEN STARTED\nPORT: ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()