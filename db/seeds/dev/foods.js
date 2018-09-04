exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE')
    .then(function() {
      return Promise.all([
        knex.raw('INSERT INTO foods (name, calories) VALUES (?, ?)', ["Apple", 100]),
        knex.raw('INSERT INTO foods (name, calories) VALUES (?, ?)', ["Oatmeal", 300]),
        knex.raw('INSERT INTO foods (name, calories) VALUES (?, ?)', ["Yogurt", 200]),
        knex.raw('INSERT INTO foods (name, calories) VALUES (?, ?)', ["Chicken", 800]),
        knex.raw('INSERT INTO foods (name, calories) VALUES (?, ?)', ["Toast", 100])
      ])
    })
  }