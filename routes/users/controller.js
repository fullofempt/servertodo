//* Modules
const moment = require('moment')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const fs = require('fs');
//* Models
const UserModel = require('../../models/user')
const { Types } = require('mongoose')
//* Key


//? Информация о профиле
async function GetUserProfile(req, res) {
    try {
        const userVerified = req.verified
        const login = userVerified.login
        const userData = await UserModel.findOne({ login })
            .select('-password')
            .populate('masks')
        if (!userData) throw 'No finded user'
        return res.status(200).send(userData)
    } catch (error) {
        console.log(error)
        return res.sendStatus(401).send('error')
    }
}



//? Авторизация
async function Authorization(req, res) {
        
}

//? Регистрация
async function Registration(req, res) {
}

//* Export 
module.exports = {
}
