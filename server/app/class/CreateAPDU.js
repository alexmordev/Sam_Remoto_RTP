'use strict';

class CreateAPDU{
    apduRequest = [];
    portableObject={};
    constructor( apduRequest = [0,0,0,0], portableObject = 'null'){
        this.apduRequest = apduRequest.join('');
        this.portableObject = portableObject;
    }
    APDU( ){
        return new Promise( (resolve, reject)=>{
            console.log(this.apduRequest);
            this.portableObject.issueCommand( this.apduRequest ,(err, res)=>{
                const responseObject = 
                    {
                        request: this.apduRequest,
                        response: this.ToHexString(res)
                    };
                (err == null)
                    ? resolve ( responseObject )
                    : reject ( responseObject )
            });
        });
    }
    // DE BYTES A HEXA
    ToHexString(byteArray) {
        return Array.from(byteArray, function(byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('')
    }
} 
module.exports = CreateAPDU