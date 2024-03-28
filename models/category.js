const { Schema, model } = require('mongoose')
const CategorySchema = new Schema({
    name: {
        type: String,
    },
    color: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task',
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

module.exports = model('Category', CategorySchema)