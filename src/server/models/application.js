const mongoose = require('mongoose')
const { Schema } = mongoose

const jobSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
    },
    jobDescription: {
        type: String,
    },
})

const interviewSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    notes: {
        type: String
    },
})

const applicationSchema = new Schema({
    job: {
        type: jobSchema,
        required: true,
    },
    dateApplied: {
        type: Date,
        required: true,
        default: Date.now,
    },
    source: {
        type: String,
        required: true,
    },
    interviews: [interviewSchema],
    dateDecision: {
        type: Date,
        default: null,
    },
    notes: {
        type: String,
    }
})


module.exports = mongoose.model('Application', applicationSchema)