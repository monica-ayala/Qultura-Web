const express = require('express');
const router = express.Router();
const isAuth= require ('../util/is-auth.js')

const links_controller = require('../controllers/links_controller');

// REST API
router.get('/getAll', links_controller.get_links);

// Link controller calls
router.get('/',isAuth, links_controller.view);
router.get('/agregarLink',isAuth, links_controller.get_agregarLink)
router.post('/agregarLink',isAuth, links_controller.post_agregarLink)
router.get('/eliminar_link/:id_link',isAuth, links_controller.eliminarLink)

module.exports = router;
