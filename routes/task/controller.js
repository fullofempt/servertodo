//* Modules
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const fs = require('fs');
//* Models
const TaskModel = require('../../models/task')
const UserModel = require('../../models/user')
const { Types } = require('mongoose')
//* Key
//? id задач лучше откуда-то подхватывать но я не додумаюсь как это сделать сейчас
async function getUserTaskList(req, res) {
    try {
        const user = req.jwtUserData
        const taskIds = user.tasks
        const tasks = await TaskModel.find({ _id: { $in: taskIds } })
        return res.json(tasks)

    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal server error")

    }
}

async function addTask(req, res) {
    try {
        const userId = req.jwtUserData.userId
        const taskData = { ...req.body, userId: userId }
        const doc = new TaskModel(taskData)
        await doc.save()
        const user = await UserModel.findById(userId)
        user.tasks.push(doc)
        await user.save()
        return res.send('Task added')
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal server error")
    }

}
async function changeTask(req, res) {
    try {
        const task = await TaskModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        const user = await UserModel.findOne({ tasks: req.params.id })
        const taskIndex = user.tasks.findIndex(a => a.equals(req.params.id))
        if (taskIndex !== -1) {
            user.tasks[taskIndex] = task;
            await user.save()
        }
        return res.json(task)
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal server error")
    }

}
async function deleteTask(req, res) {
    try {
        await TaskModel.findByIdAndDelete(req.params.id)
        const user = await UserModel.findOne({ tasks: req.params.id })
        user.tasks = user.tasks.filter(a => !a.equals(req.params.id))
        await user.save()
        return res.send('Task deleted')
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal server error")
    }

}
//* Export 
module.exports = {
    getUserTaskList,
    addTask,
    changeTask,
    deleteTask,

}


