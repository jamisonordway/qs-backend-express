process.env.NODE_ENV = 'test'

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert; // import { assert } from "chai" //
const expect = chai.expect; // import { expect } from "chai" //
const pry = require('pryjs')
const app = require('../app')
const Food = require('../models/food')

chai.use(chaiHttp);
//
const environment = 'test'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)


/* Clean database and run migrations/seeds before each test*/
describe('Food endpoints', function() {
  beforeEach((done) => {
    knex.migrate.latest()
    .then(() => {
      knex.seed.run()
      .then(() => {
        done();
      })
    });
  });

  afterEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      done();
    });
  });
describe("POST /api/v1/foods", () => {
  it('creates a new food object in the database', (done) => {
    chai.request(app)
    .post('/api/v1/foods')
    .send({ "food": { "name": "veggies", "calories": 25} })
    .end((err, res) => {
      console.log(res.body)
      expect(err).to.be.null;
      expect(res).to.have.status(201);
      expect(res.body.name).to.eq("veggies");
      expect(res.body.calories).to.eq(25);
      done();
    })
  })

  it('does not create record if name missing', (done) => {
    chai.request(app)
    .post('/api/v1/foods')
    .send({ "food": { "calories": 1} })
    .end((err, res) => {
      expect(res).to.have.status(400);
      done();
    })
  })
})

})