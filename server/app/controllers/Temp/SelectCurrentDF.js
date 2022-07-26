'use strict';
const { Devices,SendCommand, response} = require('../utils/Dependencies');

const SendingCommand= async ( card )=>{
  try{
    const start = Date.now();
    const selectApp = await SendCommand( card, "00A4090002000019" );
    const applicationStatus = selectApp.Response.slice(30,32);
    const timer = Date.now() - start;
    return ({"CurrentDF":selectApp,applicationStatus,Time: timer})
  }
  catch(err){
    throw err
  }
}
const SelectCurrentDF = (req, res = response)=>{
  const devices = new Devices();
  devices.on('device-activated', (event) => {
    const samReader = event.devices[0];
    samReader.on('card-inserted', (event) => {
      const card = event.card;
      SendingCommand( card )
      .then(success => {
          res.json( success );
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
};
// SelectCurrentDF();
module.exports = {SelectCurrentDF};

//85 17 00 02 00 00 00 10 10 00 00 01 03 01 01 00 79 79 79 21 27 30 00 20 00 9000
