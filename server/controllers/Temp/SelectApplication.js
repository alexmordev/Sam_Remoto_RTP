'use strict';
const { Devices,SendCommand} = require('../utils/Dependencies');

const SendingCommand= async ( card )=>{
  try{
    const start = Date.now();
    const selectApp = await SendCommand( card, "00A4040002315449432E494341D48401019101" );
    const getSerialNumber = selectApp.Response.indexOf( 'C7' );
    const serialNumber = selectApp.Response.slice(getSerialNumber + 2,  getSerialNumber+ 20)
    // console.log(selectApp);
    // let dataDec = "";
    // for( let i = 0; i < selectApp.Response.length; i+=6 ){ 
      // console.log(parseInt(selectApp.Response.slice(i,i+6), 16)); 
      // dataDec += parseInt(selectApp.Response.slice(i,i+6), 16)
    // } 
    // console.log("Data to be parse: ",dataDec);
    const timer = Date.now() - start;
    return ({serialNumber, selectApp,Time: timer})
  }
  catch(err){
    throw err
  }
}
const SelectApplication = ()=>{
  const devices = new Devices();
  devices.on('device-activated', (event) => {
    const samReader = event.devices[0];
    samReader.on('card-inserted', (event) => {
      const card = event.card;
      SendingCommand( card )
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
};
SelectApplication();
module.exports = {SelectApplication};


//6F 28 84 0E 315449432E494341D48401019101A516BF0C13C70800000000946AD0F053070A2D23C01010029000