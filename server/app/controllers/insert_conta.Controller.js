const { contadores } = require('../models/index')
const {error_Http} = require('../helpers/erroresHttp')
const counters = require('../helpers/counters')


const muestra_Counters = counters.contadores

const insertContadores = async (req, res) => {
    

    return await contadores.findOrCreate({
        
        where: { 
            userId: counters.userId,
            sam: counters.samSerial,
            tarjeta: counters.samSerial,
            c00:counters.contadores[0],
            c01:muestra_Counters[1],
            c02:muestra_Counters[2],
            c03:muestra_Counters[3],
            c04:muestra_Counters[4],
            c05:muestra_Counters[5],
            c06:muestra_Counters[6],
            c07:muestra_Counters[7],
            c08:muestra_Counters[8],
            c09:muestra_Counters[9],
            c10:muestra_Counters[10],
            c11:muestra_Counters[11],
            c12:muestra_Counters[12],
            c13:muestra_Counters[13],
            c14:muestra_Counters[14],
            c15:muestra_Counters[15],
            c16:muestra_Counters[16],
            c17:muestra_Counters[17],
            c18:muestra_Counters[18],
            c19:muestra_Counters[19],
            c20:muestra_Counters[20],
            c21:muestra_Counters[21],
            c22:muestra_Counters[22],
            c23:muestra_Counters[23],
            c24:muestra_Counters[24],
            c25:muestra_Counters[25],
            c26:muestra_Counters[26],
            estatus: counters.status,
            secuencia: counters.secuencia,
         },
        defaults: {
          
            c00: muestra_Counters[0],
            c01: muestra_Counters[1],
            c02: muestra_Counters[2],
            c03: muestra_Counters[3],
            c04: muestra_Counters[4],
            c05: muestra_Counters[5],
            c06: muestra_Counters[6],
            c07: muestra_Counters[7],
            c08: muestra_Counters[8],
            c09: muestra_Counters[9],
            c10: muestra_Counters[10],
            c11: muestra_Counters[11],
            c12: muestra_Counters[12],
            c13: muestra_Counters[13],
            c14: muestra_Counters[14],
            c15: muestra_Counters[15],
            c16: muestra_Counters[16],
            c17: muestra_Counters[17],
            c18: muestra_Counters[18],
            c19: muestra_Counters[19],
            c20: muestra_Counters[20],
            c21: muestra_Counters[21],
            c22: muestra_Counters[22],
            c23: muestra_Counters[23],
            c24: muestra_Counters[24],
            c25: muestra_Counters[25],
            c26: muestra_Counters[26],
          
        },
       
    }).then(contadores => {
        res.status(200).send({msg:"Success", contadores});
    })
    .catch(err => {
        res.status(400).send({msg:`Error inserting record `, error_Http:error_Http.bad_request});
    })
}

module.exports = {
    insertContadores
}