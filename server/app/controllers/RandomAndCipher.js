'use strict';
/**
 * Recibe challenge y nuevo pin
 * Retorna GetResponse
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
const GiveRandom =(sam, challenge)=>{
    return new Promise( (resolve, reject)=>{
        const CLA = "00";
        const INS = "86";
        const P1 = "00";
        const P2 = "00";
        const lc = "08";
        // const le = "08";
        const request = `${CLA}${INS}${P1}${P2}${lc}${challenge}`;

        sam.issueCommand(request , (error, response)=>{
            const responseHex = toHexString( response ).toLocaleUpperCase();
            console.group("GIVE RANDOM");
            console.log(`Request: ${request}`);
            console.log("Response: ",responseHex);
            console.groupEnd();

        (responseHex == "9000")
            ? resolve( responseHex )
            : reject( responseHex )
        });
    });
}
const CardCipherPinUpdate=(sam, currentPin, newPin)=>{
    return new Promise( (resolve, reject)=>{
        const CLA = "80";
        const INS = "12";
        const P1 = "40";//verificacion = 80  update = 40
        const P2 = "FF";
        const lc = "0A";
        const KIF = "21" //RT ISSUER
        const KVC = "79"//KEYPLE
        const request = `${CLA}${INS}${P1}${P2}${lc}${KIF}${KVC}${currentPin}${newPin}`;

        sam.issueCommand(request , (error, response)=>{
            const responseHex = toHexString( response ).toLocaleUpperCase();
            console.group("CARD CIPHER PIN UPDATE");
            console.log(`Request: ${request}`);
            console.log("Response: ",responseHex);
            console.groupEnd();

        (responseHex == "6110")
            ? resolve( responseHex.slice(-2) )
            : reject( `CardCipherPinUpdate response: ${responseHex}` )
        });
    });
}
const GetResponse=(sam, le)=>{
    return new Promise( (resolve, reject)=>{
        const CLA = "00";
        const INS = "C0";
        const P1 = "00";//verificacion = 80  update = 40
        const P2 = "00";
        const request = `${CLA}${INS}${P1}${P2}${le}`;

        sam.issueCommand(request , (error, response)=>{
            const responseHex = toHexString( response ).toLocaleUpperCase();
            const status = responseHex.slice(-4)
            console.group("GET RESPONSE");
            console.log(`Request: ${request}`);
            console.log("Response: ",responseHex.slice(0,-4));
            console.log(`Status: ${status}`);
            console.groupEnd();

        (status == "9000")
            ? resolve( responseHex )
            : reject( `GetResponse response: ${status}` )
        });
    });
}
const sendAPDU = async ( sam, challenge, newpin )=>{
    try{
      const start = Date.now();
      const random = await GiveRandom( sam, challenge );
      const cipherPin = await CardCipherPinUpdate(sam, '00000000', newpin)
      const response = await GetResponse(sam, cipherPin)
      const timer = Date.now() - start;
      return (
          {
            random,
            cipherPin,
            response,
            Time: timer
          }
      )
    }
    catch(err){
      throw err
  }
}
const randomAndCipher = (req, res =  response)=>{
    const challenge = req.body.challenge;
    const newpin = req.body.pin;
    const devices = new Devices();
    devices.on('device-activated', (event) => {
        if (event.devices.length >=2){
            const samReader = event.devices[1];
            samReader.on('card-inserted', (event) => {
                const sam = event.card;
                console.log(`\nSAM INSERTADA:  ${sam.getAtr()} `); 
                sendAPDU( sam,  challenge, newpin)
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
    randomAndCipher
}