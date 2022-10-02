const express = require('express');
const router = express.Router();
const isAuth= require ('../util/is-auth.js')

const links_controller = require('../controllers/links_controller');

// EJEMPLOS


router.get('/getAll', links_controller.get_links);

module.exports = router;