const express = require('express')
const router = express.Router()
var methodOverride = require('method-override')

router.use(methodOverride('_method'))
const postController = require('../controllers/postController')


router.get('/', postController.allPosts)

router.post('/', express.urlencoded({extended: true}), postController.addPost)

router.delete('/:id', postController.deletePost)
router.delete('/', express.urlencoded({extended: true}), postController.deletePost)

module.exports = router