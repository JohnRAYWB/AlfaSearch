const Router = require("express")
const entityRouter = require("./entityRoute")

const router = new Router()

router.use('/entity', entityRouter)

module.exports = router