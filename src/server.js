import express from 'express'
import productsRouter from './routes/products_router.js'
import cartsRouter from './routes/carts_router.js'

let server = express()
let PORT = 8080
let ready = () => console.log("server ready on port: " + PORT)
server.listen(PORT, ready)
server.use(express.urlencoded({ extended: true }))
server.use(express.json())

let index_route = '/'
let index_function = (req, res) => {
    return res.send('BIENVENIDO AL INDEX')
}
server.get(index_route, index_function)

server.use('/api/products', productsRouter)
server.use('/api/carts', cartsRouter)