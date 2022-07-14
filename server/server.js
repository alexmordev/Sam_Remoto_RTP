const express = require('express');
require('dotenv').config()
const {logger} = require('./helpers/logger.js')
const { sequelize } = require('./models/index');
const cors = require('cors')



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
      // this.app.use( '/sam-commands', require( '../routes/pin' ) )
  
    }
  
    listen() {
      this.app.listen(process.env.PORT, () => {
        console.log('Conectado al servidor de RTP', process.env.PORT)
        sequelize.authenticate().then(() => {
          console.log('Connected to the database');
        })
        
      })
  
  
    }
  }
  

    module.exports = Server;
  

// app.get('/api', (req, res) => {


//     const smartcard = require('smartcard');

//     const Devices = smartcard.Devices;
//     const devices = new Devices(); //devices es un objeto de tipo Devices

//     devices.on('device-activated', event => {
//     const currentDevices = event.devices;
//     let device = event.device;
//     console.log(`Device '${device}' activated, devices: ${currentDevices}`);



//     device.on('card-inserted', event => {
//         let card = event.card;
//         console.log(`Card '${card.getAtr()}' inserted into '${event.device}'`);
//         ;

//         res.json({ 
//             devices:device.name,
//             card: card.atr
//         })

//     });

    

//     device.on('card-removed', event => {
//         console.log(`Card removed from '${event.name}' `);
//     });

    

//     });


//     devices.on('device-deactivated', event => {
//     console.log(`Device '${event.device}' deactivated, devices: [${event.devices}]`);
//     });   


    

// });

// app.listen(process.env.PORT, () => { console.log(`Conectado al servidor ${process.env.PORT} de RTP`) })