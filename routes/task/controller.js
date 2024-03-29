//* Modules
const moment = require('moment')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const fs = require('fs');
//* Models
const TaskModel = require('../../models/task')
const { Types } = require('mongoose')
//* Key
async function getUserTaskList(req, res) {
    try {
        user = req.jwtUserData
        return res.json(user.tasks)

    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal server error")

    }
}

async function addTask(req, res) {
    try {
        const doc = new TaskModel(req.body)
        const task = await doc.save();
        return res.send('Task added')
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal server error")
    }

}
async function changeTask(req, res) {
    try {
        const task = await TaskModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.json(task)
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal server error")
    }

}
async function deleteTask(req, res) {
    try {
        await TaskModel.findByIdAndDelete(req.params.id)
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


