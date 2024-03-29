const { Schema, model } = require('mongoose')
const TaskSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    datetime: {
        type: Schema.Types.Date,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    isDone: {
        type: Schema.Types.Boolean,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
    },
    // typeSubscribe: {
    //     type: String,
    //     enum: ["LIGHT", "DARK"]
    // },
    // userTelegram: {
    //     type: String,
    //     default: null
    // },
})

module.exports = model('Task', TaskSchema)