const { jwtMiddleware } = require('../middleware/auth_middleware')

const router = require('express').Router()
router.get('/', (req, res) => res.send('hello'))
router.use('/users', [jwtMiddleware], require('./users/route'))
router.use('/auth', require('./auth/route'))
module.exports = router