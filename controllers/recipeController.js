const Food = require('../models/food')
const Recipe = require('../models/recipe')

class RecipeController {
  static index(request, response, next) {
    Food.find(request.params.id)
    .then(food => {
      if(food) {
        Recipe.all(food)
        .then(recipes => response.json(recipes))
      } else {
        response.sendStatus(404)
      }
    })
  }
}

module.exports = RecipeController