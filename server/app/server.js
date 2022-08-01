const express = require('express')
const fs = require('fs');
const path = require('path');
const { sequelize } = require('./models/index');
const cors = require('cors')
const logger = require('./utils/logger')



class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Middlewares-funcion quese ejecuta al levantar el servidor
    this.middleware();
    this.app.use(express.json());

    //Rutas de api
    this.routes();
  }

  middleware() {

    this.app.use(express.json());
    this.app.use( cors() );
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes() {

    this.app.use(require('./routes/routes'))
    this.app.use(require('./routes/insertSamConta.routes'))

    // this.app.use( '/sam-commands', require( '../routes/pin' ) )

  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log('Conectado al servidor de RTP', process.env.PORT)
      sequelize.authenticate().then(() => {
        // logger.info('Conectado a la base de RTP');
        console.log('Conectado a la base de datos RTP');
      })
      
    })


  }
}

module.exports = Server;
