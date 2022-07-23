const { User, Post } = require("../db")



module.exports.addPostPage = async function(req, res){
    const user = req.session.user
    res.render('add-post', {
        isPost: true,
        title: 'Добавить пост',
        user
    })
}

module.exports.addPost = async function(req, res){
    if(req.file) {
        try{
            await Post.create({
                title: req.body.title,
                titleImg: req.file. path,
                text: req.body.text,
                userLogin: req.body.userLogin
            })
            res.redirect('/user-posts')
        } catch(e){
            console.log(e);
        }
    } else {
        try{
            await Post.create({
                title: req.body.title,
                text: req.body.text,
                userLogin: req.body.userLogin
            })
            res.redirect('/user-posts')
        } catch(e){
            console.log(e);
        }
    }

}