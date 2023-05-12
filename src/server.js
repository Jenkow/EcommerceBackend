import express from 'express'
import errorHandler from './middlewares/errorHandler.js'
import not_found_handler from './middlewares/notFoundHandler.js'
import router from './routes/index.js'

let server = express()
let PORT = 8080
let ready = () => console.log("server ready on port: " + PORT)

server.listen(PORT, ready)
server.use('/public', express.static('public'))
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use('/', router)
server.use(errorHandler)
server.use(not_found_handler)