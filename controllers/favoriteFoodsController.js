const Food = require("../models/food")
const FavoriteFood = require("../models/favoriteFood")

class favoriteFoodsController {
  static index(request, response, next) {
    FavoriteFood.favorite()
    .then(function(favorites) {
      if(!favorites.rows) {
        return response.sendStatus(404)
      } else {
        return response.json(favorites.rows)
      }
    })
  }
}

module.exports = favoriteFoodsController