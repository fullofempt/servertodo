const router = require('express').Router()
const userController = require('./controller')

// мэйн
router.get('/', (req, res) => res.send("Its user route"))

// получение профиля пользователя
router.get('/profile', userController.GetUserProfile);

// авторизация пользователя
router.post('/login', userController.Authorization);

// регистрация нового пользователя
router.post('/register', userController.Registration);

module.exports = router