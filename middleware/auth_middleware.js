const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')

async function jwtMiddleware(req, res, next) {
    try {
        console.log('Time:', Date.now());
        const access = req.headers.authorization.split(" ")[1]
        if (!access) throw "Unauthorized"
        let verified = jwt.verify(access, process.env.PRIVATE_KEY)
        if (!verified) throw "Unauthorized"
        const findedUser = await UserModel.findById(verified.id).populate('tasks', 'categories')
        if (!findedUser) return res.status(404).send('User not found')
        req.jwtUserData = {
            userId: verified.id, 
            tasks: findedUser.tasks, 
            categories: findedUser.categories
        };
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).send('Server Erorr')
    }
}


module.exports = {
    jwtMiddleware,
}