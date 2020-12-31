const express = require('express')
const passport = require('passport')

const { userSignup } = require('../middleware/userService')

const router = express.Router()

router.post('/login', 
    passport.authenticate('local'),
    (req, res) => {
        res.status(200).send("Login success!")
    }
)

router.post('/logout', (req, res) => {
    req.logout()
    res.status(200).send("Logout success!")
})

router.post('/signup', userSignup)

// serve index.html for whatever GET request
router.get('/*', (req, res) => {
    res.sendFile('../public/index')
})

module.exports = router