const express = require('express');
const router = express.Router();
const filesystem = require('fs');
const path = require('path');
const isAuth= require ('../util/is-auth.js')
const uploads_controller = require('../controllers/archivos_controller');

router.post('/:evento/:id_file', uploads_controller.uploadFile);
module.exports = router