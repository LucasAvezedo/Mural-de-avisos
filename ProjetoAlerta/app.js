require('dotenv').config();

const express = require('express')
const app = express();
const path = require('path')
const mongoose = require('mongoose')


const postRoute = require('./routes/postRoute')
const userRoute = require('./routes/userRoute')
const auth = require('./controllers/authController')



mongoose.connect('mongodb://localhost/mural')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'templates'))

app.use('/', userRoute)
app.use('/mural', auth, postRoute)


app.listen(process.env.PORT, ()=> console.log(`Running on port ${process.env.PORT}`))