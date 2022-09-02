'use strict';
const { default: Card } = require('smartcard/lib/Card');
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

const SelectCurrentDF = async(req, res = response)=>{
  const devices = new Devices();
  devices.once('device-activated', (event) => {
    const samReader = event.devices[0];
    samReader.once('card-inserted', (event) => {
      const card = event.card;
      SendingCommand( card )
      .then(success => {
          res.json( success );
          console.group('Success!');
          console.log(success)
          console.groupEnd();
      })
      .catch(error =>{
          console.group('Error')
          console.log(error);
          console.groupEnd();
      })
    });
  });
  devices.once('device-deactivated', event => {
    console.log(`Device '${event.device}' deactivated, devices: [${event.devices}]`);
  });

  /*
  const devices = new Devices();
  const getDeviceConected = await devices.onActivated()
  const cardReader = getDeviceConected.devices[0];
  const getCard = cardReader.on('card-inserted', (event) => SendingCommand( event.card ))
  
  res.json(getCard);
  */
/*
  const devices = new Devices();
  const getDeviceConected = await devices.onActivated()
  const cardReader = getDeviceConected.devices[0];
  const getCard = cardReader.on('card-inserted', (event) =>event.card)
  res.json(getCard);
  // res.end(await devices.onDeactivated());
  //await devices.onDeactivated();

  // const getCommandResponse = await SendingCommand( getCard);
 
  // const getCard = await cardReader.card;
  // console.log(getCard);
  // res.json( getCard );
*/

  /*
   const devices = new Devices();
  devices.on('device-activated', (event) => {
    const samReader = event.devices[0];
    samReader.on('card-inserted', (event) => {
      const card = event.card;
      res.json("mensaje");
    });
    samReader.on('card-removed', (event) => {
      console.log("Tarjeta retirada");
      // res.json("hola");
    });           
  });
  devices.on('device-deactivated', event => {
    console.log(`Device '${event.device}' deactivated, devices: [${event.devices}]`);
    res.status(406).send("Not Acceptable");
  });
  */

};
// SelectCurrentDF();

/**
 
 */
module.exports = {SelectCurrentDF};

//85 17 00 02 00 00 00 10 10 00 00 01 03 01 01 00 79 79 79 21 27 30 00 20 00 9000
/*

























 */