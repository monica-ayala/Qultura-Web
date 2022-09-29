const express = require('express');
const router = express.Router();
const filesystem = require('fs');
const path = require('path');
const isAuth= require ('../util/is-auth.js')


const event_controller = require('../controllers/evento_controller');

router.get('/nuevo_evento',isAuth,event_controller.get_nuevo)
router.get('/getAll',event_controller.getAll)
router.post('/nuevo_evento',isAuth,event_controller.post_nuevo)
router.post('/borrar/evento/:id_evento',isAuth,event_controller.erase)

module.exports = router;