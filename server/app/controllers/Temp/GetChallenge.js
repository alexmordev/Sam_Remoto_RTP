'use strict';

const { response } = require('express');
const smartcard = require('smartcard');
const Devices = smartcard.Devices;
const devices = new Devices();

// DE BYTES A HEXA
function toHexString(byteArray) {
    return Array.from(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
}
const GetChallenge= (card)=>{
    return new Promise( (resolve, reject)=>{
        const CLA = "00";
        const INS = "84";
        const P1 = "00";
        const P2 = "00";
        const le = "08";
        const request = `${CLA}${INS}${P1}${P2}${le}`;

        card.issueCommand(request , (error, res)=>{
        const response = toHexString( res ).toLocaleUpperCase();
        const status = response.slice(-4);
        const objectResponse  = 
            {
                request,
                response: response.slice(0,-4),
                status
            };
        (status == "9000")
            ? resolve( objectResponse)
            : reject( status )
        });
    });
}
const SendAPDU= async ( card )=>{
    try{
      const start = Date.now();
      const objectResponse = await GetChallenge( card );
      const timer = Date.now() - start;
      return (
          {
            GetChallenge: objectResponse,
            Time: timer
          }
      )
    }
    catch(err){
      throw err
  }
}
devices.on('device-activated', (event) => {
    if (event.devices.length >=2){
        const samReader = event.devices[0];
        samReader.on('card-inserted', (event) => {
            const card = event.card;
            console.log(`\nCARD Inserted:  ${card.getAtr()} `);
            
            SendAPDU( card )
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
    }
});