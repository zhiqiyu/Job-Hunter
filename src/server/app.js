const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const path = require('path')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const morgan = require('morgan')
const bcrypt = require('bcrypt')

// models
const { Application, User } = require('./models')

// routers
const indexRouter = require('./routers/indexRouter')
const jobRouter = require('./routers/applicationRouter')

const app = express()

// DB connection
const serverName = "localhost"
const dbName = "jobHunterDB"
mongoose.connect(`mongodb://${serverName}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => console.log(`Successfully connected to database ${dbName}`))

// passport strategy
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        session: true,
    },
    async (username, password, done) => {
        try {
            let user = await User.findOne({ email: username }, "email password").exec()
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return done(null, false, {message: "Incorrect credentials."})
            }
            return done(null, user)
        } catch (error) {
            done(error)
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        if (err) { return done(err) }
        done(null, user)
    })
})

// middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: "da gong ren",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(morgan('combined'))

app.use(passport.initialize())
app.use(passport.session())

// routes
app.use('/applications', jobRouter)
app.use('/', indexRouter)


app.listen(5000)
