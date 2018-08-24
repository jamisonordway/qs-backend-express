const express = require('express');
const router = express.Router();

const FoodsController = require('../../../controllers/foodsController')
const RecipeController = require('../../../controllers/recipeController')

router.get('/', FoodsController.index)
router.post('/', FoodsController.create)
router.get('/:id', FoodsController.show)
router.get('/:id/recipes', RecipeController.index)
router.patch('/:id', FoodsController.update)
router.put('/:id', FoodsController.update)
router.delete('/:id', FoodsController.destroy)

module.exports = router;