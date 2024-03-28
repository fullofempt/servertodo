const { Schema, model } = require('mongoose')
const UserSchema = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: [],
    }],
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task',
        default: [],
    }],
    // typeSubscribe: {
    //     type: String,
    //     enum: ["LIGHT", "DARK"]
    // },
    // userTelegram: {
    //     type: String,
    //     default: null
    // },
})

module.exports = model('User', UserSchema)
