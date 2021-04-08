'use strict';

const io = require('socket.io-client')
const repl = require('repl')
const chalk = require('chalk')

const host = 'http://localhost:3003'
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

socket.on('message', (data) => {
  const { cmd, username } = data
  console.log(chalk.green(username + ': ' + cmd.split('/n')[0]));
})

// socket.on('time', (payload) =>{
//   console.log('This is where time will go')
// });


repl.start({
    prompt: '',
    eval: (cmd) => {
        socket.send({ cmd, username })
    }
})