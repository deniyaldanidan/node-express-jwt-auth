const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')

require('dotenv').config()
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

// database connection
const connectDB = require('./config/DBConnect')
connectDB()

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

// cookies
app.get("/set-cookies", (req, res)=>{
  // res.setHeader('Set-Cookie', 'newUser=true')
  res.cookie('newUser', false)
  res.cookie('isEmployee', true)
  res.send("Cookies are set")
})

// auth-routes
app.use(require('./routes/authRoutes'))

//  start the server when connection to DB is successfull
mongoose.connection.once('open', ()=>{
  console.log('Database connection is successful');
  app.listen(3000, (error)=>{
    if (error) return console.log(error)
    console.log('App is running on port 3000');
  })
})