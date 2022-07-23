const {User, Post} = require('../db')

module.exports.homePage = async function(req, res){
    const posts = await Post.findAll()
    res.render('index', {
        isHome: true,
        title: 'Главная страница',
        posts
    })
}

module.exports.postPage = async function(req, res){
    const post = await Post.findByPk(req.params.id)
    res.render('post', {
        ispost: true,
        title: post.title,
        post
    })
}

module.exports.postUpdatePage = async function(req, res){
    const user = req.session.user
    const post = await Post.findByPk(req.params.id)
    res.render('update-post', {
        ispost: true,
        title: post.title,
        post,
        user
    })
}
