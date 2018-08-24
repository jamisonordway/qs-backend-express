const MealFood = require('../models/mealFood')
const Meal = require('../models/meal')
const Food = require('../models/food')

class MealFoodsController {
  static create(request, response, next) {
    if(Meal.find(request.params.meal_id) && Food.find(request.params.food_id)) {
      MealFood.create(request.params)
      .then(mealFood => {
        if(mealFood) {
          let data = mealFood.rows[0]
          let message = `${data.food_name} has been added to ${data.meal_name}`
          response.status(201).json({message: message})
        } else {
          response.sendStatus(404)
        }
      })
    } else {
      response.sendStatus(404)
    }
  }

  static destroy(request, response, next) {
    MealFood.destroy(request.params)
    .then((mealFood) => {
      if(mealFood) {
        let data = mealFood.rows[0]
        let message = `${data.food_name} has been removed from ${data.meal_name}`
        response.json({message: message})
      } else {
        response.sendStatus(404)
      }
    })
  }
}

module.exports = MealFoodsController