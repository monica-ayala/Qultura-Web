const express = require('express');
const router = express.Router();
const filesystem = require('fs');
const path = require('path');
// const isAuth= require ('../util/is-auth.js')
const sala_controller = require('../controllers/sala_controller');
router.get('/get',sala_controller.api_get_sala);





module.exports = router;