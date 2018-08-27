const Food = require('../models/food')

class FoodsController {
  static index(request, response, next) {
    Food.all()
    .then(foods => response.json(foods))
  }

  static create(request, response, next) {
    let foodParams = request.body.food
    if(foodParams.calories && foodParams.name) {
      Food.create(foodParams)
      .then(food => response.status(201).json(food))
    } else {
      response.sendStatus(400)
    }
  }

  static show(request, response, next) {
    Food.find(request.params.id)
    .then(food => {
    if(food) {
      // debugger
      response.json(food)
    } else {
      response.sendStatus(404)
      }
    })
  }

  static update(request, response, next) {
    let foodParams = request.body.food
    if(foodParams.name && foodParams.calories) {
      Food.update(request.params.id, foodParams)
      .then(food => {
      if(food) {
        response.json(food)
      } else {
        response.sendStatus(404)
      }
    })
  } else {
    response.sendStatus(400)
  }
}

  static destroy(request, response, next ) {
    Food.destroy(request.params.id)
    .then(food => {
      if(food) {
        response.sendStatus(204)
      } else {
        response.sendStatus(404)
      }
    })
  }
}

module.exports = FoodsController