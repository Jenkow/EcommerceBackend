const socket = io()


document.querySelector('#to_cart').addEventListener('click', to_cart)
let units = document.getElementById('quantity_to_add')
let id = document.getElementById('pid')



function to_cart (e) {
    socket.emit('add_to_cart',{
        id: id.innerHTML,
        units : Number(units.value)
    })
}