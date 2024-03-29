const router = require('express').Router()
const taskController = require('./controller')
router.post('/add', taskController.addTask)
router.get('/', taskController.getUserTaskList)
router.post('/change/:id', taskController.changeTask)
router.get('/delete/:id', taskController.deleteTask)
module.exports = router