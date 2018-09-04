const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
require('dotenv').config();
const fetch = require('node-fetch')
const baseURL = 'http://api.yummly.com/v1/api/recipes'

// http://api.yummly.com/v1/api/recipes?_app_id=app-id&_app_key=app-key&your _search_parameters

class Recipe {
  static all(food) {
    // return fetch(`${baseURL}?q=${food.name}`, {
    // using the version of fetch on line 12 would be more conventional, but gives FetchError: invalid json response body 
    // at http://api.yummly.com/v1/api/recipes/?q=Oatmeal reason: Unexpected end of JSON input
    // Promise rejection
    return fetch(`${baseURL}?_app_id=${process.env.YUMMLY_APP_ID}&_app_key=${process.env.YUMMLY_APP_KEY}&${food.name}`, {
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