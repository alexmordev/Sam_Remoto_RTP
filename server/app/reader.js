const smartcard = require('smartcard');
const Devices = smartcard.Devices;


class ReaderPCSC {
    constructor (){
        this.reader = new Devices();
    }

    static initDevice(){
        // const device = 
        this.reader.on('device-activated', event => {
            const dev = event.device;
            
            return dev;
        });

        this.reader.on('device-deactivated', event => {
            const data = {
                "msg": "no hay conexion"
            }
            // console.log(data)
            return data;
        });
    }
}

module.exports = ReaderPCSC;