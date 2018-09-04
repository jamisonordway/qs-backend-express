process.env.NODE_ENV = 'test'

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const expect = chai.expect; 
const pry = require('pryjs')
const app = require('../app')
const Food = require('../models/food')

chai.use(chaiHttp);
//
const environment = 'test'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)

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

  describe("GET /api/v1/foods/:id/recipes", () => {
    it.only('shows recipes associated with given food', (done) => {
      chai.request(app)
      .get('/api/v1/foods/2/recipes')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200);
        expect(res.body.recipes.length).to.eq(10);
        done();
      })
    })
  })
});