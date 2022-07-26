const express = require('express');
const router = express.Router();

//Rutas-Controladores-Requeridos
const AuthController = require('../controllers/AuthController');
const { SelectApplication } = require ('../controllers/Temp/SelectApplication');
const { OppenSecureSession } = require ('../controllers/Temp/OpenSecureSession');
const { Rehabilitate } = require ('../controllers/Temp/Rehabilitate');
const { CloseSecureSession } = require ('../controllers/Temp/CloseSecureSession');
const { Ratification } = require ('../controllers/Temp/Ratification');
const { SelectCurrentDF } = require ('../controllers/Temp/SelectCurrentDF');
const { GetChallenge } = require ('../controllers/Temp/GetChallenge');
const { ChangePin } = require ('../controllers/Temp/SetPin');

//Ruta Home
router.get('/', (req, res) => { res.json({ Welcome:'user!' }) })

//Ruta de login, logout y check_in
router.post('/api/login', AuthController.login);
router.get('/api/logout', AuthController.logout);
router.get('/api/coockie', AuthController.coockie);
router.post('/api/check_in', AuthController.check_in);

router.get('/selectApp', SelectApplication);
router.post('/oppenSecureSession', OppenSecureSession );
router.get('/rehabilitate', Rehabilitate );
router.post('/closeSecureSession', CloseSecureSession );
router.get('/ratification', Ratification );
router.get('/selectCurrentDF', SelectCurrentDF );
router.get('/getChallenge', GetChallenge);
router.post('/changePin', ChangePin);

module.exports = router;