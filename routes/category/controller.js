//* Modules
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const fs = require('fs');
//* Models
const CategoryModel = require('../../models/category')
const { Types } = require('mongoose')
//* Key
async function getUserCategoryList(req, res) {
    try {
        user = req.jwtUserData
        return res.json(user.categories)

    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal server error")

    }
}

async function addCategory(req, res) {
    try {
        const doc = new CategoryModel(req.body)
        await doc.save();
        return res.send('Category added')
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal server error")
    }

}
async function changeCategory(req, res) {
    try {
        const category = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.json(category)
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal server error")
    }

}
async function deleteCategory(req, res) {
    try {
        await CategoryModel.findByIdAndDelete(req.params.id)
        return res.send('Category deleted')
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal server error")
    }

}
//* Export 
module.exports = {
    getUserCategoryList,
    addCategory,
    changeCategory,
    deleteCategory,

}


