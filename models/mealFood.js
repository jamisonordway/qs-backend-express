const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const create = (meal_id, food_id) => {
  return database('meal_foods')
  .insert({meal_id: meal_id, food_id: food_id})
  .returning('*')
};

const remove = (meal_id, food_id) => {
  return database('meal_foods')
  .where({meal_id: meal_id, food_id: food_id})
  .del()
}

module.exports = {create, remove}