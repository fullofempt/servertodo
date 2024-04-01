//* Modules
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const fs = require('fs');
//* Models
const UserModel = require('../../models/user')
const { Types } = require('mongoose');
const { CallTracker } = require('assert');
const { json } = require('body-parser');
//* Key

function returnException(req, res) {
    return res.status(401).send("unathorizired")
}

function createTokens(user) {
    var access = jwt.sign({
        id: user._id
    }, process.env.PRIVATE_KEY, {
        expiresIn: '30m'
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
        const findedUser = await UserModel.findOne({ username });
        if (!findedUser)
            throw 'Incorrect login'
        const isValidPass = crypto.HmacSHA256(pass, process.env.PRIVATE_KEY).toString() === findedUser.password;

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
        const hashPass = crypto.HmacSHA256(password, process.env.PRIVATE_KEY);


        const findedUser = await UserModel.findOne({ username })
        console.log(findedUser)
        if (findedUser) {
            return res.status(401).send('User already exist')
        }
        const doc = new UserModel({
            username,
            password: hashPass,
        })
        const user = await doc.save();
        return res.status(201).send('User created')

    } catch (error) {
        console.log(error)
        res.status(401).send('User already exist')
    }
}
async function getUserData(req, res) {
    try {
        console.log(req.jwtUserData.userId)
        const doc = await UserModel.findById(req.jwtUserData.userId).select('-password -__v').lean()
        if (doc) {
            doc.id = doc._id;
            delete doc._id;
            return res.send(doc);
        } else {
            return res.send("User not found");
        }
    }
    catch (error) {
        console.log(error)
        return res.send("Did not get user")
    }
}
//* Export 
module.exports = {
    login,
    registration,
    refresh,
    returnException,
    getUserData,
}
