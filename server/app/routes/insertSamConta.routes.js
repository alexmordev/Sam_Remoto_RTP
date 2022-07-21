const express = require('express');
const router = express.Router();

const contador = require('../controllers/insert_conta.Controller');
const sam = require('../controllers/insert_sam.Controller');
const consultaContador = require('../controllers/consultaBase');
const index = require('../controllers/consultaBase');

//Rutas-Middlewares-Requeridas
const auth = require('../middlewares/auth');    

//Rutas-Politicas-Requeridas
const validarRole = require('../middlewares/protectionRoute')



//ruta pruebaController Insert
router.post( '/api/contadores',contador.insertContadores );
router.post( '/api/sams',sam.insertSam );




//Proteccion Contadores-Mostrar

router.get('/api/consultaContador',validarRole.validarRole,consultaContador.consultaContador);
router.get('/api/consultaSams',validarRole.validarRole, consultaContador.consultSam)





module.exports = router;