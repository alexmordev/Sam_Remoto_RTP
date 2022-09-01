
const smartcard = require('smartcard');
const Devices = smartcard.Devices;
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

class Sockets {
    constructor(io){
        this.io = io;
        this.socketEvents();
    }

    socketEvents(){
        // let dev = this.reader;
        this.io.on("connection", (socket) => {
            const readers = new Devices();
            readers.on('device-activated', event => {
                let device = event.device;

                const data = {
                    "code": '1',
                    "msg": `Lectora conectada: ${event.device.name}`
                }

                socket.emit('status-device', data);

                device.on('card-inserted', event => {
                    let card = event.card;
                    const serialNumberSAM = card.getAtr().substr(-14, 8).toUpperCase() 
                    const data = {
                        "code": '3',
                        "msg": `Tarjeta conectada: ${serialNumberSAM}`
                    }
                    socket.emit('status-device', data);

                    
                });

                device.on('card-removed', event => {
                    // console.log(event);
                    if (event.card == null) {
                        var data = {
                            "code": '2',
                            "msg": `Al iniciar no hay tarjeta conectada`
                        }
                    }else{
                        let card = event.card;
                        const serialNumberSAM = card.getAtr().substr(-14, 8).toUpperCase() 
                        var data = {
                            "code": '2',
                            "msg": `Tarjeta desconectada: ${serialNumberSAM}`
                        }
                    }
                    
                    socket.emit('status-device', data);
                    
                });
            });

            readers.on('device-deactivated', event => {
                const data = {
                    "code": '0',
                    "msg": `¡PELIGRO! - Lectora desconectada: ${event.device.name}`
                }
                
                socket.emit('status-device', data);
                // client.messages
                // .create({
                //     from: `whatsapp:${process.env.NUMBER_FROM}`,
                //     body: 'Se desconectó la lectora',
                //     to: `whatsapp:${process.env.NOMBER_TO}`
                // })
                // .then(message => console.log(message));
                
            });
            
            readers.on('error', event => {
                // console.log(event);
            });
        });
    }

}

module.exports = Sockets;