// const express = require('express');
const { Router } = require('express'); 
const { SelectApplication } = require ('../controllers/Temp/SelectApplication');
// const { OpenSecureSession } = require ('../controllers/Temp/OpenSecureSession');
const router = Router();

router.get('/selectApp', SelectApplication);
// router.get('/openSecureSession', OpenSecureSession );


module.exports = router;