'use strict';

// const { response } = require('express');
const smartcard = require('smartcard');
const Devices = smartcard.Devices;
const devices = new Devices();

// DE BYTES A HEXA
function toHexString(byteArray) {
    return Array.from(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
}
const ChangePin=(card, pinCipher)=>{
    return new Promise( (resolve, reject)=>{
        const CLA = "00";
        const INS = "D8";
        const P1 = "00";//verificacion = 80  update = 40
        const P2 = "FF";
        const lc = "10"
        const request = `${CLA}${INS}${P1}${P2}${lc}${pinCipher}`;

        card.issueCommand(request , (error, response)=>{
            const responseHex = toHexString( response ).toLocaleUpperCase();
            const status = responseHex.slice(-4)
            console.group("Change Pin");
            console.log(`Request: ${request}`);
            console.log(`Response: ${status}`);
            console.groupEnd();

        (status == "9000")
            ? resolve( status )
            : reject( `ChangePin response: ${status}` )
        });

    })
}
const sendAPDU = async ( card, cipher )=>{
    try{
      const start = Date.now();
      const changePinResponse = await ChangePin( card, cipher)
      const timer = Date.now() - start;
      return (
          {
            changePinResponse,
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
            
            sendAPDU( card, "71F924ECEC078ED3196F100F5D7456359000" )
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
