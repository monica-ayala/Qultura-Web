const express = require('express');
const router = express.Router();
// const isAuth= require ('../util/is-auth.js')

const guia_controller = require('../controllers/guia_controller');

// EJEMPLOS

router.get('/',guia_controller.view);


module.exports = router;