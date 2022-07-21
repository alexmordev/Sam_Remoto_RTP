'use strict';
const {response,Devices,CreateAPDU,apdu } = require('./util/Dependencies');

const SendCommand = async ( request ,po)=>{
    try{
        const start = Date.now();
        const newCommand = new CreateAPDU(request, po);
        const SelectDiversifier = await newCommand.APDU();
        const time = Date.now() - start;
        return ({SelectDiversifier,time})
    }
    catch(err){
      throw err
  }
}
const Diversifier = (req, res =  response)=>{
    const appSerialNumber = req.body.appSerialNumber;
    const devices = new Devices();
    const {CLA, INS, P1, P2 } = apdu.APDUFormat;

    devices.on('device-activated', (event) => {
        const reader = event.devices[0];
        reader.on('card-inserted', (event) => {
            const po = event.card;
            SendCommand( [CLA[0], INS[1], P1[0], P2[0], appSerialNumber],  po)
                .then(success => {
                    console.log(success)
                    res.json( {
                        Response: success
                    } )
                })
                .catch(error =>{
                    console.log('Eror')
                    console.log(error);
                })
        });     
    });
};
module.exports= {
    Diversifier
};