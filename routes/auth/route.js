const router = require('express').Router()
const authController = require('./controller')
router.get('/', (req, res) => res.send("Its auth route"))
router.post('/login', authController.login)
router.post('/registration', authController.registration)
router.post('/refresh', authController.refresh)
module.exports = router