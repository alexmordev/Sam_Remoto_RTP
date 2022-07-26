'use strict';
const  toHexString  = require('./ConvertHextoString');
const StatusCodes = require('./StatusCodes');
const SendCommand= (po, request)=>{
    return new Promise( (resolve, reject)=>{
        po.issueCommand( request ,(err, response)=>{
            const responseHex = toHexString(response).toLocaleUpperCase();
            let status = StatusCodes.response[responseHex.slice(-4)];
            if(!status)
                status = "Status Code not found"; 

            console.group("Command Sent");
            console.log(`Request: ${request}`);
            console.log(`Response: ${responseHex}`);
            (status) ? console.log(status) : console.log("Status Code not found");
            console.groupEnd();

            const responseObject ={
                "Request":request,
                "Response":responseHex,
                "Status": status
            };

            (responseObject)
                ? resolve ( responseObject )
                : reject  ( responseObject )
        });
    });
}

module.exports = SendCommand
