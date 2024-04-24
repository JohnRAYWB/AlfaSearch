require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require('./swagger.js')
const router = require("./routes/index")

const app = express()

const url = `mongodb://mongo_db:27017/alfaSearch`

const PORT = process.env.PORT || 4221

app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/', router)

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