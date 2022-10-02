const express = require('express');
const router = express.Router();
const isAuth= require ('../util/is-auth.js')

const links_controller = require('../controllers/links_controller');

// EJEMPLOS

router.get('/', links_controller.view);
router.get('/getAll', links_controller.get_links);
router.get('/agregarLink', links_controller.get_agregarLink)
router.post('/agregarLink', links_controller.post_agregarLink)

module.exports = router;