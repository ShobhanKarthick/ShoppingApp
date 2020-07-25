const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectID } = mongoose.Schema.Types

let newProduct = new Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    category: {
        type: [String],
        required: true,
    }
    MRP: {
        type: Number,
        set: num => Math.round((num + Number.EPSILON) * 100) / 100,
        required: true,
    },
    Discount: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Products', newProduct)