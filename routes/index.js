const { jwtMiddleware } = require('../middleware/auth_middleware')

const router = require('express').Router()
router.get('/', (req, res) => res.send('hello'))
router.use('/users', [jwtMiddleware], require('./users/route'))
router.use('/auth', require('./auth/route'))
router.use('/task', [jwtMiddleware], require('./task/route'))
router.use('/category', [jwtMiddleware], require('./category/route'))
module.exports = router