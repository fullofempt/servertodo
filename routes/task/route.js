const router = require('express').Router()
const authController = require('./controller')
router.get('/', (req, res) => res.send("Its task route"))
router.post('/task/add', taskController.addTask)
router.post('/task/get', taskController.getAllTask)
router.post('/task/change', taskController.changeTask)
router.post('/task/delete', taskController.deleteTask)
module.exports = router