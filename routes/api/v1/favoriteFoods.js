const express = require('express');
const router = express.Router()

const favoriteFoodsController = require('../../../controllers/favoriteFoodsController')

router.get('/', favoriteFoodsController.index)

module.exports = router