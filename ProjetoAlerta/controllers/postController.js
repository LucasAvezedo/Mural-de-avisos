const Post = require('../models/Post')
const jwt = require('jsonwebtoken')


const allPosts = async (req,res)=>{
    try{
        const token = req.cookies['auth']
        const decodedToken = jwt.decode(token)
        let docs = await Post.find({});
        res.render('all', {posts:docs, userInfo: decodedToken.mod, userName: decodedToken.name})
    }catch(error){
        res.send(error)
    }
}

const addPost = async (req,res)=>{
 

    const currentDate = new Date();
    req.body.time = currentDate.toLocaleString();

    const token = req.cookies['auth']

    const decodedToken = jwt.decode(token) 
    
    if (!decodedToken || !decodedToken.name) {
        return res.status(401).send("Token inválido ou não contém informações de usuário");
    }

    req.body.user = decodedToken.name

    let post = new Post(req.body)
    try{
        let doc = await post.save()
        res.redirect('/mural/')
    }catch(error){
        res.send(error)
    }
}

const deletePost = async (req,res) =>{
    let id = req.params.id
    if(!id){
        id = req.body.id
    }

    try{
        await Post.findByIdAndDelete(id)
        res.redirect('/mural/')
    }catch(error){
        res.status(404).send(error)
    }
}

module.exports = {addPost, allPosts, deletePost}