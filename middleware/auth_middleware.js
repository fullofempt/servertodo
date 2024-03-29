const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')

function jwtMiddleware(req, res, next) {
    try {
        console.log('Time:', Date.now());
        const access = req.headers.authorization.split(" ")[1]
        if (!access) throw "Unauthorized"
        let verified = jwt.verify(access, process.env.PRIVATE_KEY)
        if (!verified) throw "Unauthorized"
        const findedUser = UserModel.findById(verified.id).populate('tasks', 'categories')
        if (!findedUser) return res.status(404).send('User not found')
        req.jwtUserData = findedUser
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).send('Server Erorr')
    }
}


module.exports = {
    jwtMiddleware,
}