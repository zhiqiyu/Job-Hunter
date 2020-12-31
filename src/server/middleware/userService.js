const { User, Application } = require('../models')
const bcrypt = require('bcrypt')

const userSignup = (req, res, next) => {
    let { email, password, firstName, lastName } = req.body
    User.exists({ email: email }, (err, exists) => {
        if (err) return next(err)
        if (exists) {
            // user already exists 
            res.status(409).send("User already exists! Please login instead.")
        } else {
            // add user
            let newUser = new User({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            })
            // hash the password with BCrypt
            bcrypt.genSalt(10, (err, salt) => {
                if (err) return next(err)
                bcrypt.hash(password, salt, (err, newPassword) => {
                    if (err) return next(err)
                    newUser.password = newPassword
                    newUser.save()
                        .then(user => res.status(201).send("Successfully saved the user."))
                        .catch(err => next(err))
                })
            })
        }
    })
}

const checkLoggedIn = (req, res, next) => {
    if (!req.user) {
        // user is not in session, which means not logged in
        res.status(403).send("Need to login.")
    } else {
        next()
    }
}


module.exports = {
    userSignup: userSignup,
    checkLoggedIn: checkLoggedIn,
}