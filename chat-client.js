'use strict';

const io = require('socket.io-client')
const repl = require('repl')
const chalk = require('chalk')

const host = 'http://a150f5603edb.ngrok.io'
const socket = io.connect(host)

require('dotenv').config();

const username = process.env.USERNAME;

socket.on('disconnect', () => {
  // socket.emit('logout', username)
  socket.emit('disconnect')
});

socket.on('connect', () => {
  const userObj = {
    id: socket.id,
    username: username
  }
  console.log(chalk.red('=== start chatting ==='))
  socket.emit('username', userObj)
})

socket.on('joining', (payload) => {
console.log(`${payload} has joined the chat say hello!`);
})

socket.on('message', (data) => {
  const { cmd, username } = data
  console.log(chalk.green(username + ': ' + cmd.split('/n')[0]));
})
socket.on('leaving', (payload) => {
  console.log(`${payload.username} has left the chat!`)
})


repl.start({
    prompt: '',
    eval: (cmd) => {
        socket.send({ cmd, username })
    }
})