const express = require('express')
const controller = require('../controllers/home.controllers')
const router = express.Router()


router.get('/', controller.homePage)
router.get('/post/:id', controller.postPage)

module.exports = router