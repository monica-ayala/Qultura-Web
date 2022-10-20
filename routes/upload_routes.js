const express = require('express');
const router = express.Router();
const filesystem = require('fs');
const path = require('path');
const isAuth= require ('../util/is-auth.js')
const uploads_controller = require('../controllers/archivos_controller');

router.post('/museo/:evento/:id_file', uploads_controller.uploadFile);
// router.post('/:evento', uploads_controller.uploadFile);
router.post('/:evento/multiple/:id_file/:id_audio',isAuth,uploads_controller.uploadSalas)
router.post('/audio/:evento/:id_file',isAuth,uploads_controller.uploadAudio)
module.exports = router