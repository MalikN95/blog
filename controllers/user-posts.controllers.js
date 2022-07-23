const {Post} = require('../db')

module.exports.userPosts = async function(req, res){
    const posts = await Post.findAll({where: {userLogin: req.session.user.login}})
    res.render('index', {
        userPost: true,
        title: 'Мои посты',
        posts
    })
}

module.exports.updatePost = async function(req, res) {
    if(req.file) {
        try{
            await Post.update({
                title: req.body.title,
                titleImg: req.file.path,
                text: req.body.text
            }, {where: {id: req.body.id}})
        } catch(e){
            console.log(e);
        }
    } else {
        try{
            await Post.update({
                title: req.body.title,
                text: req.body.text
            }, {where: {id: req.body.id}})
        } catch(e){
            console.log(e);
        }
    }
    res.redirect('/user-posts')
}


module.exports.deletePosts = async function(req, res) {
    const post = await Post.destroy({where: {id: req.body.postId}})
    res.json(post.id)
}