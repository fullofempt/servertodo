require('dotenv').config()
const mongo = require('mongoose')
const express = require('express')
const App = express();
const routes = require('./routes/index')
App.use(express.json())
App.use(express.urlencoded({ extended: true }))
App.use('/api', routes);


const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT } = process.env

App.listen(3031, async () => {
    await mongo.connect(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/`,
        { useNewUrlParser: true, useUnifiedTopology: true })
});
