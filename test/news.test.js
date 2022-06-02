process.env.NODE_ENV = 'test';


const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http'); //plugin that tests requests and responses
const server = require('../server');

chai.use(chaiHttp);


describe('News test Collection', () => {

    it('It should GET all the tasks', (done) => {

        chai.request(server)
        .get('/api/news')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        });

    });
    it('It should NOT GET all the tasks', (done) => {

        chai.request(server)
        .get('/api/test')
        .end((err, res) => {
            res.should.have.status(404)
            done();
        });

    });
    





})