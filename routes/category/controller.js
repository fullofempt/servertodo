//* Modules
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const fs = require('fs');
//* Models
const CategoryModel = require('../../models/category')
const UserModel = require('../../models/user')
const { Types } = require('mongoose');
const category = require('../../models/category');
//* Key
async function getUserCategoryList(req, res) {
    try {
        const user = req.jwtUserData
        const categoryIds = user.categories
        const category = await CategoryModel.find({ _id: { $in: categoryIds } })
        return res.json(category)

    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal server error")

    }
}

async function addCategory(req, res) {
    try {
        const userId = req.jwtUserData.userId
        const categoryData = { ...req.body, userId: userId }
        const doc = new CategoryModel(categoryData)
        await doc.save()
        const user = await UserModel.findById(userId)
        user.categories.push(doc)
        await user.save()
        return res.send('Category added')
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal server error")
    }

}
async function changeCategory(req, res) {
    try {
        const category = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        const user = await UserModel.findOne({ categories: req.params.id })
        const categoryIndex = user.categories.findIndex(a => a.equals(req.params.id))
        if (categoryIndex !== -1) {
            user.categories[categoryIndex] = category;
            await user.save()
        }
        return res.json(category)
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal server error")
    }

}
async function deleteCategory(req, res) {
    try {
        await CategoryModel.findByIdAndDelete(req.params.id)
        const user = await UserModel.findOne({ categories: req.params.id })
        user.categories = user.categories.filter(a => !a.equals(req.params.id))
        await user.save()
        return res.send('Task deleted')
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


