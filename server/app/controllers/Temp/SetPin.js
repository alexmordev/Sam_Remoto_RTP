'use strict';
const { Devices,SendCommand, response} = require('../utils/Dependencies');

const SendingCommand = async ( card, cipher )=>{
    try{
      const start = Date.now();
      const ChangePin = await SendCommand( card, `00D800FF10${cipher}`)
      const timer = Date.now() - start;
      return(
        {
          "command": "ChangePin", 
          "request": ChangePin.Request,
          "response": ChangePin.Response,
          "status": ChangePin.Status,
          "time": timer 
        }
      )
    }
    catch(err){
      throw err
  }
}
const ChangePin= ( req, res = response )=>{
    const cipher = req.body.newPin;
    const devices = new Devices();
    devices.on('device-activated', (event) => {
        const samReader = event.devices[0];
        samReader.on('card-inserted', (event) => {
            const card = event.card;                
            SendingCommand( card, cipher )
            .then(success => {
                res.json(success )
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
// ChangePin( "E571051F5CA9F7212B87D7C289B979D3" );
module.exports = { ChangePin };