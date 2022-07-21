const Post = require('../models/Post')

module.exports.homePage = async function(req, res){
    const posts = await Post.find().populate('user').lean()
    res.render('index', {
        isHome: true,
        title: 'Главная страница',
        posts
    })
}