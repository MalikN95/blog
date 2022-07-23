const bcrypt = require('bcryptjs')
const {User} = require('../db')


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
    const hashPassword =await bcrypt.hash(password, 10)
    try{
        await User.create({
            name,
            login,
            password: hashPassword
        })
        res.redirect('/auth')
    } catch(e){
        console.log(e);
    }
    
}

module.exports.login = async function(req, res){
    const {login, password} = req.body
    try{
        const candidate = await User.findOne({where: {login: login}})
        if(candidate){
            const areSame = await bcrypt.compare(password, candidate.dataValues.password)
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