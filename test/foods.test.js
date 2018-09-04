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

  describe("GET /api/v1/foods", () => {
    it('returns all foods in the database', (done) => {
      chai.request(app)
      .get('/api/v1/foods')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.length).to.eql(5);
        expect(res.body[0].name).to.eq("Apple");
        expect(res.body[0].calories).to.eql(100);
        done();
      })
    })
  })

  describe("GET /api/v1/foods/:id", () => {
    it('returns food corresponding to :id', (done) => {
      chai.request(app)
      .get('/api/v1/foods/1')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.name).to.eq("Apple");
        done();
      })
    })

    it('returns 404 if there is no record', (done) => {
      chai.request(app)
      .get('/api/v1/foods/100')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      })
    })
  })

describe("POST /api/v1/foods", () => {
  it('creates a new food object in the database', (done) => {
    chai.request(app)
    .post('/api/v1/foods')
    .send({ "food": { "name": "pizza", "calories": 250} })
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(201);
      expect(res.body.name).to.eq("pizza");
      expect(res.body.calories).to.eq(250);
      done();
    })
  })

  it('does not create record if name missing', (done) => {
    chai.request(app)
    .post('/api/v1/foods')
    .send({ "food": { "calories": 100} })
    .end((err, res) => {
      expect(res).to.have.status(400);
      done();
    })
  })
})

})