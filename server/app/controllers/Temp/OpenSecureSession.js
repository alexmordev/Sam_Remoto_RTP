'use strict';
const {response, Devices,SendCommand} = require('../utils/Dependencies');
const SendingCommand= async ( card, challenge )=>{
    try{
      const start = Date.now();
      const OpenSecureSession = await SendCommand( card, `008A010104${challenge}00` );
      const timer = Date.now() - start;
      return (
        {
          "command": "OpenSecureSession", 
          "request": OpenSecureSession.Request,
          "response": OpenSecureSession.Response,
          "status": OpenSecureSession.Status,
          "time": timer 
        }
      )
    }
    catch(err){
      throw err
  }
}
const OppenSecureSession=( req, res=response )=>{
  const challenge = req.body.challenge;
  const devices = new Devices();
  devices.on('device-activated', (event) => {
    const samReader = event.devices[0];
    samReader.on('card-inserted', (event) => {
        const card = event.card;
        SendingCommand( card, challenge)
        .then(success => {
            res.json(success);
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
module.exports = { OppenSecureSession } 