const router = require('express').Router()
const userController = require('./controller')
router.get('/', (req, res) => res.send("Its user route"))


module.exports = router