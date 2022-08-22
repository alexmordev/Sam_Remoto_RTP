

// Status para el estado de la antena y tarjeta:
// 0: Antena desconectada
// 1: Antena conectada
// 2: Tarjeta desconectada
// 3: Tarjeta Conectada

const socketMessage = require('./socketMessage');
const smartcard = require('smartcard');
const Devices = smartcard.Devices;
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const message = new socketMessage ();

class Sockets {
    constructor(io){
        this.io = io;
        this.socketEvents();
    }


    socketEvents(){
        try {

            this.io.on("connection", (socket) => {
                const readers = new Devices();
                // console.log('cliente conectado');
                readers.on('device-activated', event => {
                    let device = event.device;
                    // message.getStatus('1', `Lectora conectada: ${event.device.name}`);
                    socket.emit('status-device', 
                        message.getStatus('1', `Lectora conectada: ${event.device.name}`)
                    );
    
                    device.on('card-inserted', event => {
                        let card = event.card;
                        const serialNumberSAM = card.getAtr().substr(-14, 8).toUpperCase() ;
                        // message.getStatus('3', `Tarjeta conectada: ${serialNumberSAM}` );
                        socket.emit('status-device', 
                            message.getStatus('3', `Tarjeta conectada: ${serialNumberSAM}` )
                        );
                    });
    
                    device.on('card-removed', event => {
                        let codigo, mensaje;
    
                        if (event.card != null) {
                            let card = event.card;
                            const serialNumberSAM = card.getAtr().substr(-14, 8).toUpperCase() 
                            // message.getStatus(`2`, `Tarjeta desconectada: ${serialNumberSAM}` )
    
                        socket.emit('status-device', 
                            message.getStatus(`2`, `Tarjeta desconectada: ${serialNumberSAM}` )
                        );
                        }
                    });
                
                    readers.on('device-deactivated', event => {
                        message.getStatus('0', `Lectora desconectada: ${event.device.name}` );
                        socket.emit('status-device', 
                            message.getStatus('0', `Lectora desconectada: ${event.device.name}` )
                        );
                    });
                
                });

                
    
                
                
                
            });
            
        } catch (error) {

            

            readers.on('error', event => {
                console.log(event);
            });
            
        }
        
    }

}

module.exports = Sockets;