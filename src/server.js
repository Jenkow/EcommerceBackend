import server from './app.js'
import { Server } from 'socket.io'
import Cart from './models/cart.model.js'

let PORT = process.env.PORT
let ready = () => console.log("server ready on port: " + PORT)

let http_server = server.listen(PORT, ready)
let socket_server = new Server(http_server)

let chats = []

socket_server.on(
    'connection',
    socket => {
        console.log(`client ${socket.client.id} connected`)
        socket.on(
            'test',
            data => {
                console.log(data.text)
            }
        )
        socket.on(
            'auth', () => {
                socket.emit('all_messagess', chats)
            }
        )
        socket.on(
            'new_message',
            (data) => {
                chats.push(data)
                socket_server.emit('all_messagess', chats)
            }
        )
        socket.on(
            'add_to_cart',
            async (data) => {
                let carts = await Cart.find()
                let cart = carts[0]      //hardcodeo para trabajar solo en el primer carrito
                let new_products = []
                let is_in = false
                cart.products.forEach(p => {
                    if (p._id === data.id) {
                        new_products.push({
                            _id: data.id,
                            units: p.units + data.units
                        })
                        is_in = true
                        return
                    }
                    else {
                        new_products.push(p)
                        return
                    }                    
                })
                if(!is_in){
                    new_products.push({_id: data.id, units: data.units})
                }
                await Cart.updateOne({ _id: cart._id }, { $set: { products: new_products } })
            }
        )
    }
)

