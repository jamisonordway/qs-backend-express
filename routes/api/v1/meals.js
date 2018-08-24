const express = require('express');
const router = express.Router();
const MealsController = require('../../../controllers/mealsController')
const MealFoodsController = require('../../../controllers/mealFoodsController')

router.get('/', MealsController.index)
router.get('/:meal_id/foods', MealsController.show)
router.post('/:meal_id/foods/:food_id', MealFoodsController.create)
router.delete('/:meal_id/foods/:food_id', MealFoodsController.destroy)


module.exports = router;