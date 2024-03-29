const router = require('express').Router()
const taskController = require('./controller')
router.post('/add', taskController.addCategory)
router.get('/', taskController.getUserCategoryList)
router.post('/change/:id', taskController.changeCategory)
router.get('/delete/:id', taskController.deleteCategory)
module.exports = router