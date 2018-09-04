const express = require('express');
const router = express.router;

const favoriteFoodsController = require('../../../controllers/favoriteFoodsController')

router.get('/', favoriteFoodsController.index)

module.exports = router