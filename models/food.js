const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Food {
  static all() {
    return database('foods').select('id', 'name', 'calories')
  }

  static create(attributes) {
    return database('foods')
    .insert(attributes)
    .returning(['id', 'name', 'calories'])
    .then(rows => rows[0])
  }

  static find(id) {
    return database('foods').where('id', id).select('id', 'name', 'calories')
    .then(rows => rows[0])
  }

  static update(id, attributes) {
    return database('foods').where('id', id)
    .update(attributes)
    .returning(['id', 'name', 'calories'])
    .then(rows => rows[0])
  }

  static destroy(id) {
    return database('foods').where('id', id).del()
  }

  static meals(food) {
    return database('meals')
    .select('meals.name')
    .join('meal_foods', {'meals.id': 'meal_foods.meal_id'})
    .where('meal_foods.food_id', food.id)
    .then(meals => {
      food.meals = meals
      return meals
    })
  }

  static favorites() {
    return database.raw(
      `SELECT timesEaten, json_agg(json_build_object('name', name, 'calories', calories)) AS foods
      FROM (
        SELECT foods.name, foods.calories, COUNT(foods.id) AS timesEaten
        FROM foods
        LEFT JOIN meal_foods ON foods.id = meal_foods.food_id
        GROUP BY foods.id
        ORDER BY timesEaten DESC
      ) joinsQuery
      GROUP BY timesEaten 
      ORDER BY timesEaten DESC`)
  }
}

module.exports = Food