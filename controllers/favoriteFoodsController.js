const Food = require("../models/food")

const index = (req, res, next) => {
  Food.favorites()
  .then((foods) => {
    res.json(foods.rows)
  })
}
module.exports = { index }