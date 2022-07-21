const express = require('express')
const controller = require('../controllers/user-posts.controllers')
const router = express.Router()
const auth = require('../middleware/auth')


router.get('/', auth, controller.userPosts)

module.exports = router