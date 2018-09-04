const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
const fetch = require('node-fetch')
const baseURL = 'http://api.yummly.com/v1/api/recipes'

class Recipe {
  static all(food) {
    return fetch(`${baseURL}?q=${food.name}`, {
      headers: {'Content-Type': 'application/json',
      'X-Yummly-App-ID': process.env.YUMMLY_APP_ID,
      'X-Yummly-Api-Key': process.env.YUMMLY_APP_KEY }
    })
    .then((response) => {
      return response.json()
    })
    .then((recipes) => {
      return {recipes: recipes.matches.map((recipe) => {
        return {name: recipe.recipeName, url: `http://www.yummly.com/recipe/${recipe.id}`}
      })}
    })
  }
}

module.exports = Recipe