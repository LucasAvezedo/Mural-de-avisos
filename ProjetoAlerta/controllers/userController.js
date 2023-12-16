const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const {loginValidate, registerValidate} = require('./validate')

const userController = {
    register: async function (req,res){

        const {error} = registerValidate(req.body)
        if(error){return res.status(400).send(error.message)}

        const selectedUser = await User.findOne({email: req.body.email})

        if(selectedUser) return res.status(400).send("Email already exists")

        if (req.body.idmod == process.env.ID_MOD_1){
            req.body.mod = true
        }

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
            admin: req.body.admin,
            mod: req.body.mod,
            idmod: req.body.idmod
        })
        try{
            const savedUser = await user.save()
            if(savedUser){
            res.redirect('/')
            }
        } catch(error){
            res.status(400).send(error)
        }
    },
    login: async function(req,res){

        const {error} = loginValidate(req.body)
        if(error){return res.status(400).send(error.message)}

        const selectedUser = await User.findOne({email: req.body.email})
        if(!selectedUser) return res.status(400).send("Email or password incorrect")

        const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password)

        if(!passwordAndUserMatch) return res.status(400).send("Email or password incorrect")

        const token = jwt.sign({_id: selectedUser._id, admin: selectedUser.admin, name:selectedUser.name, mod:selectedUser.mod}, process.env.TOKEN_SECRET)

        res.cookie('auth', token, {httpOnly: true}).redirect('/mural/')

    }
}


module.exports = userController 