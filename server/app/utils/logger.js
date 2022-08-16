const { createLogger,format,transports } = require('winston')

 module.exports = createLogger({
    format: format.combine(
            format.simple(),
            format.json(),
            format.colorize(),
            format.timestamp({ format:"YYYY-MM-DD HH:mm:ss"}),
            format.printf(info=> `[${info.timestamp}] ${info.level} ${info.message}`)
    ),
    transports: [
        new transports.File({
            maxsize:512000000,//bytes
            maxFiles:5,//Cantidad de archivos
            filename: `${__dirname}/../logs/log-api.log`
        }),
        new transports.Console({
            level:'debug'
        })
    ]
 }) 