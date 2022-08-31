

// // Status para el estado de la antena y tarjeta:
// // 0: Antena desconectada
// // 1: Antena conectada
// // 2: Tarjeta desconectada
// // 3: Tarjeta Conectada

// const socketMessage = require('./socketMessage');
// const smartcard = require('smartcard');
// const Devices = smartcard.Devices;
// const accountSid = process.env.ACCOUNT_SID;
// const authToken = process.env.AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);
// const message = new socketMessage ();

// class Sockets {
//     constructor(io){
//         this.io = io;
//         this.socketEvents();
//     }


//     socketEvents(){

//             this.io.on("connection", (socket) => {
//                 const readers = new Devices();
//                 // console.log('cliente conectado');
//                 readers.on('device-activated', event => {
//                     let device = event.device;
//                     // message.getStatus('1', `Lectora conectada: ${event.device.name}`);
//                     socket.emit('status-device', 
//                         message.getStatus('1', `Lectora conectada: ${event.device.name}`)
//                     );
    
//                     device.on('card-inserted', event => {
//                         let card = event.card;
//                         const serialNumberSAM = card.getAtr().substr(-14, 8).toUpperCase() ;
//                         // message.getStatus('3', `Tarjeta conectada: ${serialNumberSAM}` );
//                         socket.emit('status-card', 
//                             message.getStatus('1', `Tarjeta conectada: ${serialNumberSAM}` )
//                         );
//                     });
    
//                     device.on('card-removed', event => {
//                         let codigo, mensaje;
    
                        // if (event.card != null) {
                        //     let card = event.card;
                        //     const serialNumberSAM = card.getAtr().substr(-14, 8).toUpperCase() 
                        //     // message.getStatus(`2`, `Tarjeta desconectada: ${serialNumberSAM}` )
    
                        // socket.emit('status-card', 
                        //     message.getStatus(`0`, `Tarjeta desconectada: ${serialNumberSAM}` )
                        // );
                        // }
//                     });
                
//                     try {
                        
//                         readers.on('device-deactivated', event => {
//                             message.getStatus('0', `Lectora desconectada: ${event.device.name}` );
//                             socket.emit('status-device', 
//                                 message.getStatus('0', `Lectora desconectada: ${event.device.name}` )
//                             );
//                         });

//                     } catch (error) {
//                         throw error
//                         socket.emit('status-device', 
//                                 message.getStatus('0', `Lectora desconectada: ${event.device.name}` )
//                             );
//                     }
                
//                 });
                
//             });
            
            

//             readers.on('error', event => {
//                 console.log(event);
//             });
          
        
//     }

//     // Como cacho el error desde el evento readers

// }

// module.exports = Sockets;


// const ReaderPCSC = require('./reader');

// *************************************************************************************************
// const ReaderPCSC = require('./reader');

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
            console.log('cliente conectado');
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