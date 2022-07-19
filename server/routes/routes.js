const express = require('express');
const { Router } = require('express'); 
const { SelectApplication } = require ('../controllers/Temp/SelectApplication');
const { OppenSecureSession } = require ('../controllers/Temp/OpenSecureSession');
const { Rehabilitate } = require ('../controllers/Temp/Rehabilitate');
const { CloseSecureSession } = require ('../controllers/Temp/CloseSecureSession');
const { Ratification } = require ('../controllers/Temp/Ratification');
const { SelectCurrentDF } = require ('../controllers/Temp/SelectCurrentDF');
const { GetChallenge } = require ('../controllers/Temp/GetChallenge');
const { ChangePin } = require ('../controllers/Temp/SetPin');

const router = Router();

router.get('/selectApp', SelectApplication);
router.post('/oppenSecureSession', OppenSecureSession );
router.get('/rehabilitate', Rehabilitate );
router.post('/closeSecureSession', CloseSecureSession );
router.get('/ratification', Ratification );
router.get('/selectCurrentDF', SelectCurrentDF );
router.get('/getChallenge', GetChallenge);
router.post('/changePin', ChangePin);

module.exports = router;
// router.get('/selectApp', SelectApplication);

