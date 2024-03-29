//* Modules
const moment = require('moment')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const fs = require('fs');
//* Models
const TaskModel = require('../../models/task')
const AccessTokenModel = require('../../models/AccessToken')
const { Types } = require('mongoose')
//* Key
async function getAllTask(req, res) {
    try {
        const tasks = await TaskModel.find()
        res.status(200).json(tasks)

    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error")

    }

}
async function addTask(req, res) {

}
async function changeTask(req, res) {

}
async function deleteTask(req, res) {

}



//* Export 
module.exports = {
    login,
    registration,
    refresh,
}
