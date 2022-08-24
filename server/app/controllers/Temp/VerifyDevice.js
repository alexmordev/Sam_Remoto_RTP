'use strict';
const smartcard = require('smartcard');
const Devices = smartcard.Devices;



const VerifyDevice = ( req, res ) => {    
    try {
        
        const devices = new Devices();
        devices.on('device-desactivated', event => {
            req.json({
                'status': 0,
                'msg': 'Antena Desconectada'
            });
        });
        devices.on('device-activated', event => {
            res.json({
                'status': 1,
                'msg': 'Antena Conectada'
            })
        })
        
    } catch (error) {
        throw error
    }
}
    
module.exports = {
    VerifyDevice
};


// Usando eventos 

/* const smartcard = require('smartcard');
const Devices = smartcard.Devices;
const devices = new Devices();


devices.on('device-activated', (event => {
    console.log(`Device '${event.device}' activated`);
    event.devices.map((device, index) => {
        console.log(`Device #${index + 1}: '${device.name}'`);
    });
})); */

// Usando Promesas
/* 
devices.onActivated().then(event => {
    console.log(`Device '${event.device}' activated`);
    event.devices.map((device, index) => {
        console.log(`Device #${index + 1}: '${device.name}'`);
    });
}); */

