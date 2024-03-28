//* Modules
const moment = require('moment')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const fs = require('fs');
//* Models
const UserModel = require('../../models/user')
const AccessTokenModel = require('../../models/AccessToken')
const { Types } = require('mongoose')
//* Key

function createTokens(user) {
    var access = jwt.sign({
        id: user._id
    }, process.env.PRIVATE_KEY, {
        expiresIn: '30s'
    })
    var refresh = jwt.sign({
        id: user._id,
    }, process.env.PRIVATE_KEY, {
        expiresIn: '30d'
    })

    return { access, refresh }
}

async function refresh(req, res) {
    try {
        const { refresh } = req.body
        let verified = jwt.verify(refresh, process.env.PRIVATE_KEY)
        if (!verified) throw 'Invalid token'
        const findedUser = await UserModel.findById(verified.id)
        if (!findedUser) throw 'Invalid token data'
        const tokens = createTokens(findedUser)
        return res.send(tokens);
    } catch (error) {
        console.log(error)
        return res.status(401).send(error);
    }
}

async function login(req, res) {
    try {
        const username = req.body.username;
        const pass = req.body.password;
        const findedUser = await UserModel.find({ username });
        if (!findedUser)
            throw 'Incorrect login'
        const isValidPass = CryptoJS.AES.encrypt(pass) === findedUser.password;
        if (!isValidPass)
            throw 'Invalid password';
        const tokens = createTokens(findedUser)
        return res.status(200).send(tokens)

    } catch (error) {
        console.log(error)
        return res.status(401).send(error)
    }
}

async function registration(req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const hashPass = CryptoJS.AES.encrypt(password, 'secretkey');

        const findedUser = await UserModel.find({ username })
        if (findedUser) {
            return res.status(401).send('User already exist')
        }
        const doc = new UserModel({
            username,
            password: hashPass,
        })
        const user = await doc.save();
        res.status(201).send('User created')

    } catch (error) {
        console.log(error)
        res.status(401).send('User already exist')
    }

}
//* Export 
module.exports = {
    login,
    registration,
    refresh,
}
