'use strict';
const { Devices,SendCommand} = require('../utils/Dependencies');

const SendingCommand= async ( card )=>{
    try{
      const start = Date.now();
      const GetChallenge = await SendCommand( card, "0084000008" );
      const timer = Date.now() - start;
      return(
        {
          "command": "GetChallenge", 
          "request": GetChallenge.Request,
          "response": GetChallenge.Response,
          "status": GetChallenge.Status,
          "time": timer 
        }
      )
    }
    catch(err){
      throw err
    }
};
const GetChallenge = (req, res = response)=>{
    const devices = new Devices();
    devices.on('device-activated', (event) => {
        const samReader = event.devices[0];
        samReader.on('card-inserted', (event) => {
            const card = event.card;
            SendingCommand( card )
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
// GetChallenge();
module.exports= {GetChallenge};
