// const express = require('express');
const { Router } = require('express'); 
const router = Router();
module.exports = router;

const { SelectApplication } = require ('../controllers/Temp/SelectApplication');
const { GetChallenge } = require ('../controllers/Temp/GetChallenge');
const { ChangePin } = require ('../controllers/Temp/SetPin');


router.get('/', (req, res) => { res.json({ Welcome:'user!' }) })
router.get('/selectApp', SelectApplication);
router.get('/getChallenge', GetChallenge);
router.post('/changePin', ChangePin);
