
const express = require('express');
require('dotenv').config()
const cors = require('cors')

class Server {
    constructor() {
        this.app = express();
        this.middleware();
        this.routes();
        this.port = process.env.PORT;
    }
  
    middleware() {
        this.app.use( express.static( 'public') )
        this.app.use(express.json());
        this.app.use( cors() );
    }
  
    routes() {
        this.app.use('/',require('../routes/routes'))
    }
  
    listen() {
        this.app.listen(this.port, () => {
            console.log('Conectado al servidor de RTP', this.port)   
        })
    }
}
module.exports = Server;