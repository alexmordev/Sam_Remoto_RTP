'use strict';
const { Devices,SendCommand} = require('../utils/Dependencies');

const SendingCommand = async ( card, cipher )=>{
    try{
      const start = Date.now();
      const changePinResponse = await SendCommand( card, `0020000008${cipher}`)
      const timer = Date.now() - start;
      return ({changePinResponse,Time: timer})
    }
    catch(err){
      throw err
  }
}
const VerifyPin= ( cipher )=>{
    const devices = new Devices();
    devices.on('device-activated', (event) => {
        const samReader = event.devices[0];
        samReader.on('card-inserted', (event) => {
            const card = event.card;                
            SendingCommand( card, cipher )
            .then(success => {
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
VerifyPin( "1E78DCB8FFC3EC3D" );
module.exports = {VerifyPin};