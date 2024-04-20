const Router = require("express")
const entityController = require("../controllers/entityController")

const router = new Router()

router.post('/', entityController.getEntitiesFromDB)
router.post('/search', entityController.getEntities)
router.put('/update/:id', entityController.updateEntity)

module.exports = router