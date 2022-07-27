'use strict';

const {response, Devices,SendCommand} = require('../utils/Dependencies');

const SendingCommand= async ( card )=>{
    try{
      const start = Date.now();
      const selectApp = await SendCommand( card, "00A4040002315449432E494341D48401019101" );
      const getSerialNumber = selectApp.Response.indexOf( 'C7' );
      const serialNumber = selectApp.Response.slice(getSerialNumber + 2,  getSerialNumber+ 20)
      const timer = Date.now() - start;
      return ({serialNumber, selectApp,Time: timer})
    }
    catch(err){
      throw err
    }
  }


    const getDeviceCard = ( req, res = response) => {
        const devices = new Devices();
        devices.on('device-activated', (event) => {
            const samReader = event.devices[0];
            console.log(samReader)
            samReader.on('card-inserted', (event) => {
            const card = event.card;
            SendingCommand( card )
            .then(success => {
                res.json(success);
            })
            .catch(error =>{
                console.group('Eror')
                console.log(error);
                console.groupEnd();
            })
            });           
        });
    };

    module.exports = {
        getDeviceCard
    }


    // const Devices = smartcard.Devices;
    // const devices = new Devices(); //devices es un objeto de tipo Devices

    // devices.on('device-activated', event => {
    // const currentDevices = event.devices;
    // let device = event.device;
    // console.log(`Device '${device}' activated, devices: ${currentDevices}`);
    // for (let prop in currentDevices) {
    //     console.log("Devices: " + currentDevices[prop]);
    //     const cardReader = process.env.CARDREADER || currentDevices[prop]
    //     console.log('Aqui ando: ',cardReader.name);
    //     // document.getElementById('antena').innerHTML= currentDevices[prop];
    // }

    // device.on('card-inserted', event => {
    //     let card = event.card;
    //     console.log(`Card '${card.getAtr()}' inserted into '${event.device}'`);
        

    // });
    // device.on('card-removed', event => {
    //     console.log(`Card removed from '${event.name}' `);
    // });

    // });


    devices.on('device-deactivated', event => {
        console.log(`Device '${event.device}' deactivated, devices: [${event.devices}]`);
        // document.getElementById('antena').innerHTML= 'Antena Desconectada';
    });