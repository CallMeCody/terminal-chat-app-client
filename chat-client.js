'use strict';

const io = require('socket.io-client')
const repl = require('repl')
const chalk = require('chalk')

const host = 'http://localhost:3000'
const socket = io.connect(host)

require('dotenv').config();

const username = process.env.USERNAME;
