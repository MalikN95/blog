const User = require('../models/User')

module.exports.auth = async function(req, res){
    res.render('auth', {
        title: 'Авторизация'
    })
}

module.exports.logout = async function(req, res){
    req.session.destroy(()=> {
        res.redirect('/')
    })
}


module.exports.addUser = async function(req, res){
    const {name, login, password} = req.body
    try{
        res.redirect('/auth')
        const user = await new User({
            name,
            login,
            password
        }).save()
        
    } catch(e){
        console.log(e);
    }
    
}

module.exports.login = async function(req, res){
    const {login, password} = req.body
    try{
        const candidate = await User.findOne({login: login}).lean()
        console.log(candidate);
        if(candidate){
            const areSame = password === candidate.password
            if (areSame) {
                req.session.user = candidate
                req.session.isAuthenticated = true
                req.session.save(err => {
                    if(err){
                        throw err
                    }
                    res.redirect('/')
                })
            } else{
                res.redirect('/auth')
            }
        } else {
            res.redirect('/auth')
        }
    } catch(e){
        console.log(e);
    }
}