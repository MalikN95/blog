const {Post} = require('../db')

module.exports.userPosts = async function(req, res){
    const posts = await Post.findAll({where: {userLogin: req.session.user.login}})
    res.render('index', {
        userPost: true,
        title: 'Мои посты',
        posts
    })
}

module.exports.deletePosts = async function(req, res){
    const post = await Post.destroy({where: {id: req.body.postId}})
    res.json(post.id)
}