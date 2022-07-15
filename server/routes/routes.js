// const express = require('express');
const { Router } = require('express'); 
const router = Router();
module.exports = router;

const { SelectApplication } = require ('../controllers/Temp/SelectApplication');

router.get('/', (req, res) => { res.json({ Welcome:'user!' }) })
router.get('/selectApp', SelectApplication);
