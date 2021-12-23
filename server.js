// import npm packages
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
require('./auth.js')
const routes = require('./routes/api.js')

const app = express()
const PORT = process.env.PORT || 5001

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/GATodo-app', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/GASpaceDimentions-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})



// Data parsing
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// HTTP request logger
app.use(morgan('tiny'))
app.use('/api', routes)


// Deployment Step3
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}

app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401)
}

app.get('/', (req, res) => {
    res.send('<a href="/auth/google"><button>Authenticate with google</button></a>')
})
// app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

app.get('/google/callback',
    passport.authenticate('google', {
        // successRedirect: 'http://localhost:3000/home',
        // successRedirect: '/',
        failureRedirect: '/auth/failed'
    }), function (req, res) {
        res.redirect('https://gaspacedimentions-app.herokuapp.com/home');
    })




app.get('/auth/failed', (req, res) => { res.send('something went wrong!') })

app.get('/api/logout', (req, res) => {
    req.logout()
    console.log('logged out backend')
    req.session.destroy()
    res.redirect('/')
    // res.send('Goodbye!<a href="http://localhost:3000/"><button>Home</button></a>')
})
app.get('/protected', isLoggedIn, (req, res) => { res.send(req.user) })


app.listen(PORT, console.log(`server is running at port:${PORT}`))