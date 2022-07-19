'use strict';
const {response,Devices,SendCommand} = require('../utils/Dependencies');

const SendingCommand = async ( sam )=>{
    try{
      const start = Date.now();
      const rehabilitate = await SendCommand( sam, `0044000000`);
      const timer = Date.now() - start;
      return ({rehabilitate,Time: timer})
    }
    catch(err){
      throw err
    }
}
const Rehabilitate = (req, res = response)=>{
    const devices = new Devices();
    devices.on('device-activated', (event) => {
        const samReader = event.devices[0];
        samReader.on('card-inserted', (event) => {
            const sam = event.card;
            SendingCommand( sam)
            .then(success => {
                res.json( success )
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
// Rehabilitate();s
module.exports = {Rehabilitate}