'use strict';
const {response,Devices,SendCommand} = require('../utils/Dependencies');

const SendingCommand = async ( sam )=>{
    try{
      const start = Date.now();
      const rehablitate = await SendCommand( sam, `0044000000`);
      const timer = Date.now() - start;
      return ({rehablitate,Time: timer})
    }
    catch(err){
      throw err
    }
}
const Rehabilitate = ()=>{
    const devices = new Devices();
    devices.on('device-activated', (event) => {
        const samReader = event.devices[0];
        samReader.on('card-inserted', (event) => {
            const sam = event.card;
            SendingCommand( sam)
            .then(success => {
                console.log(success)
                console.groupEnd();
            })
            .catch(error =>{
                console.log('Eror')
                console.log(error);
            })
        });      
    });
};
Rehabilitate();
module.exports = Rehabilitate;