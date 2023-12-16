const express = require('express')
const router = express.Router();

const userController = require('../controllers/userController')
const cookieParser = require('cookie-parser')

router.use(cookieParser())

router.get('/', (req,res)=>{ res.render('index', {error:false, body:{}})})

router.get('/register', (req,res)=>{ res.render('register', {modCode: process.env.ID_MOD_1 ,error: false, body:{}})})
router.post('/register', express.urlencoded({extended : true}),  userController.register)

router.get('/login', (req,res)=>{ res.render('login', {error: false, body:{}})})
router.post('/login', express.urlencoded({extended : true}), userController.login)

router.get('/logout', (req,res) =>{

    res.clearCookie('auth');

    res.redirect('/')
})

module.exports = router