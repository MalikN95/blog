const Post = require('../models/Post')

module.exports.homePage = async function(req, res){
    const posts = await Post.find().populate('user').lean()
    res.render('index', {
        isHome: true,
        title: 'Главная страница',
        posts
    })
}

module.exports.postPage = async function(req, res){
    const post = await Post.findById(req.params.id).populate('user').lean()
    res.render('post', {
        ispost: true,
        title: post.title,
        post
    })
}