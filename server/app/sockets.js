// const ReaderPCSC = require('./reader');
const { throws } = require('assert');
const smartcard = require('smartcard');
const Devices = smartcard.Devices;

function ExceptionUsuario(mensaje) {
    this.mensaje = mensaje;
    this.nombre = "ExceptionUsuario";
}

class Sockets {
    constructor(io){
        this.io = io;
        // this.reader = new Devices();
        this.socketEvents();
        // this.reader = new ReaderPCSC();
    }

    

    socketEvents(){
        // let dev = this.reader;
        this.io.on("connection", (socket) => {
            const readers = new Devices();
            console.log('cliente conectado');
            readers.on('device-activated', event => {
                let device = event.device;
                socket.emit('status-device', device);

                device.on('card-inserted', event => {
                    let card = event.card;
                    socket.emit('status-device', card.getAtr());

                    console.log(event)
                });

                device.on('card-removed', event => {
                    socket.emit('status-device', 'card removed');
                    console.log(event)
                });
            });

            readers.on('device-deactivated', event => {
                const data = {
                    "msg": "no hay conexion"
                }
                socket.emit('status-device', data);
            });
            
            readers.on('error', event => {
                console.log(event)
            });
        });
    }

}

module.exports = Sockets;