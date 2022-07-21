const express = require('express');
const router = express.Router();

//Rutas-Controladores-Requeridos
const AuthController = require('../controllers/AuthController');
const { randomAndCipher} = require( '../controllers/RandomAndCipher' );
const { Diversifier } = require('../controllers/Diversifier'); 


//Rutas-Middlewares-Requeridas
// const auth = require('../middlewares/auth');    

//Ruta Home
router.get('/', (req, res) => { res.json({ Welcome:'user!' }) })

//Ruta de login, logout y check_in
router.post('/api/login', AuthController.login);
router.get('/api/logout', AuthController.logout);
router.get('/api/coockie', AuthController.coockie);
router.post('/api/check_in', AuthController.check_in);

//Rutas tarjetas
router.post( '/diversifier', Diversifier);
router.post( '/randomAndCipher',  randomAndCipher );

// ROUTE WITH CLASES
router.post( '/diversifier', Diversifier );






module.exports = router;