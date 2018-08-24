exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE')
    .then(function() {
      return Promise.all([
        knex.raw('INSERT INTO foods (name, calories) VALUES (?, ?)', ["Elote", 500]),
        knex.raw('INSERT INTO foods (name, calories) VALUES (?, ?)', ["Spiropapa", 300]),
        knex.raw('INSERT INTO foods (name, calories) VALUES (?, ?)', ["Raspa", 200]),
        knex.raw('INSERT INTO foods (name, calories) VALUES (?, ?)', ["Chilaquiles", 800]),
        knex.raw('INSERT INTO foods (name, calories) VALUES (?, ?)', ["Tacos el Pastor", 550])
      ])
    })
  }