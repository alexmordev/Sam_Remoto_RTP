const { contadores } = require('../models/index')
// const { sam } = require('../models/index')
const { Router } = require('express');
const counters = require('../helpers/counters')

const prueba = counters.contadores 

const insertContadores = async(req, res) =>{
    const
    {
       sam,
       tarjeta,
       c00,
       c01,
       c02,
       c03,
       c04,
       c05,
       c06,
       c07,
       c08,
       c09,
       c10,
       c11,
       c12,
       c13,
       c14,
       c15,
       c16,
       c17,
       c18,
       c19,
       c20,
       c21,
       c22,
       c23,
       c24,
       c25,
       c26,
       estatus,
       comando,
       folio,
       fecha_hora
    } = req.body
    // console.log(req.body)

    return await contadores.create({
        sam: req.body.sam,
        tarjeta: req.body.tarjeta,
         c00:prueba[0],
         c01:prueba[1],
         c02:prueba[2],
         c03:prueba[3],
         c04:prueba[4],
         c05:prueba[5],
         c06:prueba[6],
         c07:prueba[7],
         c08:prueba[8],
         c09:prueba[9],
         c10:prueba[10],
         c11:prueba[11],
         c12:prueba[12],
         c13:prueba[13],
         c14:prueba[14],
         c15:prueba[15],
         c16:prueba[16],
         c17:prueba[17],
         c18:prueba[18],
         c19:prueba[19],
         c20:prueba[20],
         c21:prueba[21],
         c22:prueba[22],
         c23:prueba[23],
         c24:prueba[24],
         c25:prueba[25],
         c26:prueba[26],
        estatus: req.body.estatus,
        comando: req.body.movimiento,
        folio: req.body.folio,
        fecha_hora: req.body.fecha_hora,
    }).then(contadores => {
        if (contadores) {
            res.send({contadores});
        } else {
            res.status(400).send('Error inserting record');
        }
    })   
}

module.exports = {
    insertContadores
}