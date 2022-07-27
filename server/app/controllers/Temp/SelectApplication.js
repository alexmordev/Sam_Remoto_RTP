'use strict';
const {response, Devices,SendCommand} = require('../utils/Dependencies');

const SendingCommand= async ( card, device )=>{
  try{
    const start = Date.now();
    const selectApp = await SendCommand( card, "00A4040002315449432E494341D48401019101" );
    const getSerialNumber = selectApp.Response.indexOf( 'C7' );
    const serialNumber = selectApp.Response.slice(getSerialNumber + 2,  getSerialNumber+ 20)
    const timer = Date.now() - start;
    return ({serialNumber, selectApp, device, Time: timer})
  }
  catch(err){
    throw err
  }
}
const SelectApplication = (req, res = response)=>{
  const devices = new Devices();
  devices.on('device-activated', (event) => {
    const samReader = event.devices[0];
    const deviceName= samReader.name
    samReader.on('card-inserted', (event) => {
      const card = event.card;
      SendingCommand( card, deviceName )
      .then(success => {
          res.json(success);
      })
      .catch(error =>{
          console.group('Eror')
          console.log(error);
          console.groupEnd();
      })
    });           
  });
};
module.exports = {
  SelectApplication
};
//6F 28 84 0E 315449432E494341D48401019101A516BF0C13C70800000000946AD0F053070A2D23C01010029000