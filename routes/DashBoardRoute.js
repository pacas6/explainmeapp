var express = require('express');

var router = express.Router();

var Dmodel = require('../models/dashboard');

router.get('/dashValues', async function(req, res, next){

    console.log('sending users count...');

    let array = await Dmodel.getUsersCount();

    res.status(array.status).send(array.result);

});