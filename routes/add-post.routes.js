const express = require('express')
const controller = require('../controllers/add-post.controllers')
const router = express.Router()
const auth = require('../middleware/auth')


router.get('/', auth, controller.addPostPage)
router.post('/', auth, controller.addPost)

module.exports = router