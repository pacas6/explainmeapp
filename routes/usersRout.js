var express = require('express');

var router = express.Router();

var umodel = require('../models/user');
 
// req ajuda a pegar informações do link
// res resposta que o pedido me vai dar
// next 

// parecido com getMapping
router.get('/', async function (req, res, next){

    console.log('sending all users...');

    let object = await umodel.getAllUsers();

    res.status(object.status).send(object.result);

});

router.post('/new', async function (req, res, next){

    console.log('Adicionando novo user...');

    let user = req.body;

    let result = await umodel.newUser(user);

    res.status(result.status).send(result.result);

});

router.post("/login", async function (req, res, next) {
    let user = req.body;

    let result = await umodel.loginUser(user);

    res.status(result.status).send(result.result);
});



module.exports = router;