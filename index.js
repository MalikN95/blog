const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')
const exphbs = require('express-handlebars')


const {sequelize} = require('./db')


//middleware var
const varMiddleware = require('./middleware/variables')

//routes var
const homeRoutes = require('./routes/home.routes')
const addPostRoutes = require('./routes/add-post.routes')
const authRoutes = require('./routes/auth.routes')
const userPostsRoutes = require('./routes/user-posts.routes')



// Handlebars settings
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

//Static
app.use(express.static('assets'))
app.use('/images', express.static(path.join(__dirname, 'images')))


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    maxAge: 60 * 60
}))
app.use(varMiddleware)


//Routes
app.use('/', homeRoutes)
app.use('/auth', authRoutes)
app.use('/add-post', addPostRoutes)
app.use('/user-posts', userPostsRoutes)

const PORT = process.env.PORT || 3000
async function start(){
    try{
       
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }
        
        app.listen(PORT, () => {
            console.log(`Server start on ${PORT} port`);
        })
    }  catch(e){
        console.log(e);
    }
}

start()

