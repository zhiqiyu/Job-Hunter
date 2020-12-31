const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true
    }, 
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ['user', 'admin'],
    },
    applications: [{
        type: Schema.Types.ObjectId, 
        ref: 'Application'
    }]
})

module.exports = mongoose.model('User', userSchema)