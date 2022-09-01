'use strict';
const {response, Devices,SendCommand} = require('../utils/Dependencies');
const SendingCommand= async ( card, device )=>{
  try{
    const start = Date.now();
    const selectApp = await SendCommand( card, "00A4040002315449432E494341D48401019101" );
    const getSerialNumber = selectApp.Response.indexOf( 'C7' );
    const serialNumber = selectApp.Response.slice(getSerialNumber + 2,  getSerialNumber+ 20)
    const timer = Date.now() - start;
    return(
      {
        "command": "SelectApplication", 
        "request": selectApp.Request,
        "response": selectApp.Response,
        "status": selectApp.Status,
        serialNumber,
        "device": device,
        "time": timer 
      }
    )
  }
  catch(err){
    console.log("first")
  }
}
const SelectApplication = (req, res = response, next)=>{
  try{
    const devices = new Devices();
    devices.once('device-activated', (event) => {   
      const samReader = event.devices[0];
      const deviceName= samReader.name
      samReader.once('card-inserted', (event) => {
        const card = event.card;

        SendingCommand( card, deviceName)
        .then(succ => res.json( succ ))
       
      });
      samReader.once('card-removed', event => {
        console.log("event.card.device._events");
        // samReader.off(event.card.device._events)
      });           
    });
    devices.once('error', event => {
      
      // next(event)

  });
  
  }catch(err){
  }

};
module.exports = {
  SelectApplication
};