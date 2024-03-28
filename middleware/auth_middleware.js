
function jwtMiddleware(req, res, next) {
    try {
        console.log('Time:', Date.now());
        //! ACCESS всегда передается в Headers
        const access = req.headers.authorization
        if (!access) throw "Unauthorized"
        let verified = jwt.verified(access, process.env.PRIVATE_KEY)
        if (!verified) throw "Unauthorized"
        const findedUser = UserModel.findById(verified.id)
        if (!findedUser) return res.status(404).send('User not found')
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).send('Server Erorr')
    }
}


module.exports = {
    jwtMiddleware,
}