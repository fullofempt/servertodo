const { Schema, model } = require('mongoose')
const AccessTokenSchema = new Schema({
    login: {
        type: String,
    },
    token: {
        type: String,
    },
})

module.exports = model('AccessToken', AccessTokenSchema)