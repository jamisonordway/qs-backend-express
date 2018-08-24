exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meals RESTART IDENTITY CASCADE')
    .then(function() {
      return Promise.all([
        knex.raw('INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)', [1, 4]),
        knex.raw('INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)', [1, 3]),
        knex.raw('INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)', [2, 1]),
        knex.raw('INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)', [2, 2]),
        knex.raw('INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)', [3, 1]),
        knex.raw('INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)', [3, 4]),
        knex.raw('INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)', [4, 1]),
        knex.raw('INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)', [4, 4]),
      ])
    })
  }