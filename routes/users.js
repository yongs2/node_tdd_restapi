var express = require('express');
var router = express.Router();
var controller = require('../controller/users')

/* GET users listing. */
router.get('/', controller.index);

router.get('/:id', controller.show);

router.delete('/:id', controller.destroy);

router.post('/', controller.create);

module.exports = router;
