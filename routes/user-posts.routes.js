const express = require('express')
const controller = require('../controllers/user-posts.controllers')
const router = express.Router()
const auth = require('../middleware/auth')
const fileMiddleware = require('../middleware/file')

router.get('/', auth, controller.userPosts)
router.post('/update', auth, fileMiddleware.single('media'), controller.updatePost)
router.delete('/', auth, controller.deletePosts)

module.exports = router