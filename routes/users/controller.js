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


//? Авторизация вроде сделал, fullofempt
async function Authorization(req, res) {
    try {
        const { login, password } = req.body;
        const user = await UserModel.findOne({ login });
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        // валидность пароля
        const isPasswordValid = crypto.SHA256(password).toString() === user.password;
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Неверный пароль' });
        }
        // создаем JWT токен
        const token = jwt.sign({ login: user.login }, secretKey, { expiresIn: '1h' });

        return res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

//? Регистрация вроде сделаль, fullofempt
async function Registration(req, res) {
    try {
        const { login, password, email } = req.body;

        // Проверка пользователя
        const existingUser = await UserModel.findOne({ login });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this login already exists' });
        }
        // создание нового пользователя
        const newUser = new UserModel({
            login,
            password: crypto.SHA256(password).toString(), // хеширование пароля
            email
        });
        await newUser.save();
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

//* Export test
module.exports = {
    GetUserProfile,
    Authorization,
    Registration
}
