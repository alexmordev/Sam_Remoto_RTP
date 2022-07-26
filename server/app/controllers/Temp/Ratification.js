'use strict';
const { Devices,SendCommand, response} = require('../utils/Dependencies');

const SendingCommand= async ( card )=>{
    try{
      const start = Date.now();
      const ratification = await SendCommand( card, `0084000004` );
      const timer = Date.now() - start;
      return ({ratification,Time: timer})
    }
    catch(err){
      throw err
  }
}
const Ratification=( req, res = response )=>{
  const devices = new Devices();
  devices.on('device-activated', (event) => {
    const samReader = event.devices[0];
    samReader.on('card-inserted', (event) => {
        const card = event.card;
        SendingCommand( card )
        .then(success => {
            res.json( success )
            console.group('Success!');
            console.log(success)
            console.groupEnd();
        })
        .catch(error =>{
            console.group('Eror')
            console.log(error);
            console.groupEnd();
        })     
    });
  });
}
// Ratification(  );
module.exports = {Ratification};