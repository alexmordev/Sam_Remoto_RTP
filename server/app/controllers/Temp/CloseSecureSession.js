'use strict';
const { Devices,SendCommand, response} = require('../utils/Dependencies');

const SendingCommand= async ( card, signature )=>{
    try{
      const start = Date.now();
      const CloseSecureSession = await SendCommand( card, `008E000004${signature}00` );
      const timer = Date.now() - start;
      return(
        {
            "command": "CloseSecureSession", 
            "request": CloseSecureSession.Request,
            "response": CloseSecureSession.Response,
            "status": CloseSecureSession.Status,
            "time": timer 
        }
      )
    }
    catch(err){
      throw err
  }
}
const CloseSecureSession=( req, res = response  )=>{
  const signature = req.body.digestClose;
  const devices = new Devices();
  devices.on('device-activated', (event) => {
    const samReader = event.devices[0];
    samReader.on('card-inserted', (event) => {
        const card = event.card;
        SendingCommand( card, signature)
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
// CloseSecureSession( "2E8BEB74" );
module.exports = {CloseSecureSession};