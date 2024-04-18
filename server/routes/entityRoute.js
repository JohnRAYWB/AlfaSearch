const Router = require("express")
const entityController = require("../controllers/entityController")

const router = new Router()

router.get('/', entityController.getEntities)

module.exports = router