const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectID } = mongoose.Schema.Types

let newTask = new Schema({
    title: {
        type: String,
        required: true,
    },
    idea:{
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    done: {
        type: Boolean,
        required: true,
    },
    createdBy: {
        type: ObjectID,
        ref: 'Users',
    }
})

module.exports = mongoose.model('Products', newTask)