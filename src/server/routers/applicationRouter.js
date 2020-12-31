const express = require('express')
const { User, Application } = require('../models')
const { checkLoggedIn } = require('../middleware/userService')

const router = express.Router()

// get all applications for this user
router.get('/', 
    checkLoggedIn,
    async (req, res, next) => {
        try {
            let user = await User.findById(req.user).populate('applications').exec()
            res.status(200).json(JSON.stringify(user.applications))
        } catch (error) {
            return next(error)
        }
    }
)

// post a new application
router.post('/', 
    checkLoggedIn,
    async (req, res, next) => {
        try {
            let user = await User.findById(req.user).exec()
            let newApplication = new Application(req.body)
            user.applications.push(newApplication)
            await user.save()
            res.status(201).send("Successfully added a new application.")
        } catch (error) {
            return next(error)
        }
    }
)


module.exports = router