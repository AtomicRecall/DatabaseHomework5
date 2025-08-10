const mongoose = require('mongoose');

const schema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false,
            unique: true
        },
        ingredients: {
            type: [String],
            required: true
        },
        instructions: {
            type: String,
            required: true
        },
        prepTimeInMinutes:{
            type: Number,
            min: 0
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });

const model = mongoose.model('recipe',schema);
module.exports = model;