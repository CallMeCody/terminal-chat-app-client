'use strict';

const io = require('socket.io-client')
const repl = require('repl')
const chalk = require('chalk')

const host = 'http://localhost:3000'
const socket = io.connect(host)

require('dotenv').config();

const username = process.env.USERNAME;

socket.on('disconnect', () => {
  socket.emit('disconnect')
});

socket.on('connect', () => {
  console.log(chalk.red('=== start chatting ==='))
})

socket.on('message', (data) => {
  const { cmd, username } = data
  console.log(chalk.green(username + ': ' + cmd.split('/n')[0]));
})

repl.start({
    prompt: '',
    eval: (cmd) => {
        socket.send({ cmd, username })
    }
})