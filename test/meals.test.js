process.env.NODE_ENV = 'test'

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const expect = chai.expect; 
const pry = require('pryjs')
const app = require('../app')
const Meal = require('../models/meal')

chai.use(chaiHttp);

const environment = 'test'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)

describe('Meal endpoints', function() {
  this.beforeEach((done) => {
    knex.migrate.latest()
    .then(() => {
      knex.seed.run()
      .then(() => {
        done();
      })
    });
  });

  this.afterEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      done();
    });
  });

  describe("GET /api/v1/meals", () => {
    it('returns all meals in the database', (done) => {
      chai.request(app)
      .get('/api/v1/meals')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.length).to.eql(4)
        // expect(res.body[0].name).to.eql("Breakfast")
        // expect(res.body[1].name).to.eq("Snack")
        // expect(res.body[2].name).to.eq("Lunch")
        // expect(res.body[3].name).to.eq("Dinner")
        done();
      })
    })
  })
})