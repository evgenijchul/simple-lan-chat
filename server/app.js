const app = require("express")()
const server = require("http").createServer(app)
const io = require("socket.io")(server)

const m = (name, text, id) => ({ name, text, id })



io.on("connection", socket => {


    socket.on("userJoined", (data, cb) => {
        if (!data.name || !data.room) {
            return cb('данные некорректны');
        }

        cb({ userId: socket.id })

        socket.emit('newMessage', m('admin', `Добро пожаловать ${data.name}`))

    })

    socket.on('createMessage', data => {
        setTimeout(() => {

            socket.emit('newMessage', {
                text: data.text + ' server !'
            })

        }, 500)
    })

   
})

module.exports = {
    app, server
}