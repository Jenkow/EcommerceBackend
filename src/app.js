import express from 'express'
import 'dotenv/config.js'
import { connect } from 'mongoose'
import router from './routes/index.js'
import errorHandler from './middlewares/errorHandler.js'
import not_found_handler from './middlewares/notFoundHandler.js'
import { engine } from 'express-handlebars'
import { __dirname } from './utils.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import initializePassport from './config/passport_local.js'

const server = express()

server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname+'/views') 

server.use(session({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_LINK,
        ttl: 60000
    })
})
)

server.use('/public', express.static('public'))
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
initializePassport()
server.use(passport.initialize())
server.use(passport.session())


server.use('/', router)
server.use(errorHandler)
server.use(not_found_handler)

connect(process.env.MONGO_LINK)
    .then(()=>console.log('database connected'))
    .catch(err=>console.log(err))

export default server