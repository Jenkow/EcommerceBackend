let socket = io()

let user_name;

Swal.fire({
    title: "Write your name",
    input: "text",
    inputValidator: (value) => !value && 'please write your name',
    allowOutsideClick: false
}).then((res)=> {
    user_name = res.value
    document.getElementById('username').innerHTML = user_name
    socket.emit('auth', user_name)
})

let chatbox = document.getElementById('chatbox')
chatbox.addEventListener('keyup', send)

function send(e) {
    if (e.key === 'Enter') {
        socket.emit('new_message', {
            user_name,
            message : chatbox.value
        })
    }
}

socket.on('all_messagess', data => {
    document.getElementById('messagess').innerHTML = data.map(message => `<br><b>${message.user_name}</b>: ${message.message}`).join('') 
})