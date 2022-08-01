require('dotenv').config();
const Server = require('./app/server')
const server = new Server();
const fs = require('fs');
const path = require('path');
server.listen();

