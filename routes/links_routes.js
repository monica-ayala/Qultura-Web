const express = require('express');
const router = express.Router();
const isAuth= require ('../util/is-auth.js')

const links_controller = require('../controllers/links_controller');

// REST API
router.get('/getAll', links_controller.get_links);

// Link controller calls
router.get('/', links_controller.view);
router.get('/agregarLink', links_controller.get_agregarLink)
router.post('/agregarLink', links_controller.post_agregarLink)
router.get('/eliminar_link/:id_link', links_controller.eliminarLink)

module.exports = router;