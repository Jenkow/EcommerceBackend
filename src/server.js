import server from './app.js'
import { Server } from 'socket.io'
import CartManager from './managers/CartManager.js'
let c_manager = new CartManager('./src/data/carts.json')

let PORT = 8080
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
            (data) => {
                console.log(data)
                c_manager.updateCart(1, data)
            }
        )
    }
)

