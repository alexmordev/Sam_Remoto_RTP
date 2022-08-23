const express = require('express')
const { sequelize } = require('./models/index');
const cors = require('cors')
const logger = require('./utils/logger')

const http = require('http');

const Socket  = require("socket.io");
const Sockets = require('./sockets');

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.server = http.createServer(this.app);

    this.io = Socket(this.server, {
      cors: {
        origin: ["http://localhost:5000"],
        allowedHeaders: ["Access-Control-Allow-Origin"],
      }
    });

    //Middlewares-funcion quese ejecuta al levantar el servidor
    this.middleware();
    this.app.use(express.json());

    //Rutas de api
    this.routes();
  }

  middleware() {

    this.app.use(express.json());
    this.app.use( cors({
      cors: {
        origin: "*",
        credentials: true
      }
    }) );
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes() {

    this.app.use(require('./routes/routes'))
    this.app.use(require('./routes/insertSamConta.routes'))

    // this.app.use( '/sam-commands', require( '../routes/pin' ) )

  }

  configurarSockets(){
    new Sockets(this.io);
  }

  listen() {
    this.configurarSockets();

    this.server.listen(process.env.PORT, () => {
      console.log('Conectado al servidor de RTP', process.env.PORT)
      sequelize.authenticate().then(() => {
        // logger.info('Conectado a la base de RTP');
        // console.log('Conectado a la base de datos RTP');
      })
      
    })


  }
}

module.exports = Server;
