'use strict';
const {response, Devices,SendCommand} = require('../utils/Dependencies');
// const { response } = require('../utils/StatusCodes');

const SendingCommand= async ( card, challenge )=>{
    try{
      const start = Date.now();
      const OpenSecureSession = await SendCommand( card, `008A010104${challenge}00` );
      // const oppenSecureSession = secureSession.slice(0,-4);
      const timer = Date.now() - start;
      return ({OpenSecureSession,Time: timer})
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
// OppenSecureSession( "986F4207" );
module.exports = { OppenSecureSession } 