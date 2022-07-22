'use strict';
/**
 * Recibe application serial number
 * Retorna Diversifier
 */
const { response } = require( 'express' );
const smartcard = require('smartcard');
const Devices = smartcard.Devices;

// DE BYTES A HEXA
function toHexString(byteArray) {
    return Array.from(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
}
const SelectDiversifier= (sam, applicationSerialNumber)=>{
    return new Promise( (resolve, reject)=>{
        const CLA = "80";
        const INS = "14";
        const P1 = "00";
        const P2 = "00";
        const request = `${CLA}${INS}${P1}${P2}${applicationSerialNumber}`;

        sam.issueCommand( request ,(err, response)=>{
            const responseHex = toHexString(response);
            console.group("SELECT DIVERSIFIER");
            console.log(`Request: ${request}`);
            console.log(`Response: ${responseHex}`);
            console.groupEnd();

            (responseHex == '9000')
                ? resolve ( responseHex )
                : reject  ( responseHex )
        });
    });
}
const SetPin = async ( sam, appSerialNumber )=>{
    try{
      const start = Date.now();
      const diversifier = await SelectDiversifier( sam, appSerialNumber );
      const timer = Date.now() - start;
      return (
          {
            SelectDiversifier: diversifier,
            Time: timer
          }
      )
    }
    catch(err){
      throw err
  }
}
const Diversifier = (req, res =  response)=>{
    const appSerialNumber = req.body.appSerialNumber;
    const devices = new Devices();
    devices.on('device-activated', (event) => {
        if (event.devices.length >=2){
            const samReader = event.devices[1];
            samReader.on('card-inserted', (event) => {
                const SAM = process.env.SAM || event.card;
                console.log(`\nSAM INSERTADA:  ${SAM.getAtr()} `); 
                SetPin( SAM, appSerialNumber )
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
        }
    });
};
module.exports = {
    Diversifier
}