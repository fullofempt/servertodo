const router = require('express').Router()
const { jwtMiddleware } = require('../../middleware/auth_middleware')
const authController = require('./controller')
router.post('/login', authController.login)
router.post('/registration', authController.registration)
router.post('/refresh', authController.refresh)
router.get('/exception', authController.returnException)
router.get('/', [jwtMiddleware], authController.getUserData)
module.exports = router