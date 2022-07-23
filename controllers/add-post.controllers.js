const Post = require('../models/Post')

module.exports.addPostPage = async function(req, res){
    const user = req.session.user
    res.render('add-post', {
        isPost: true,
        title: 'Добавить пост',
        user
    })
}

module.exports.addPost = async function({body}, res){
    try{
        const post = await new Post({
            title: body.title,
            text: body.text,
            user: body.userId
        }).save()
        res.redirect('/user-posts')
    } catch(e){
        console.log(e);
    }
}

module.exports.updatePost = async function({body}, res){
    console.log('patch');
    console.log(body);
}