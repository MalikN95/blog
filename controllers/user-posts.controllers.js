const Post = require('../models/Post')

module.exports.userPosts = async function(req, res){
    const posts = await Post.find({user: req.session.user._id}).populate('user').lean()
    res.render('index', {
        userPost: true,
        title: 'Мои посты',
        posts
    })
}