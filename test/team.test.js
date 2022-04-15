process.env.NODE_ENV = 'test';


const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http'); //plugin that tests requests and responses
const server = require('../server');

chai.use(chaiHttp);


describe('/First Test Collection', () => {

    //because we work with API, we're working asynchronosly we use done
    //we have to put done at the end otherwise test might end earlier than expected
    it('test default API welcome route...', (done) => {
        
        chai.request(server)
        .get('/api/welcome')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            // res.body.should.be.a('array');
            console.log(res.body.message);
            const actualVal = res.body.message;
            expect(actualVal).to.be.equal("Welcome to the MEN RESTful API")
            done();
        });

    });

    // it('should verify that we have 0 teams in the DB', (done) => {
    //     chai.request(server)
    //     .get('/api/teams')
    //     .end((err, res) => {
    //         res.should.have.status(200);
    //         res.body.should.a('array');
    //         res.body.length.should.be.eql(0);
    //         done();
    //     });
    // });

    // it('should POST a valid team', (done) => {

    //     let team = {
    //         name: "Cavaliers" ,
    //         full_name: "Cleveland Cavaliers",
    //         location: "Cleveland",
    //         stadium: "Rocket Mortgage FieldHouse",
    //         wins: 36,
    //         loses: 27,
    //         logo: "https://content.sportslogos.net/logos/6/222/full/cleveland_cavaliers_logo_primary_20187997.png"
    //     }

    //     chai.request(server)
    //     .post('/api/teams')
    //     .send(team)
    //     .end((err, res) => {
    //         res.should.have.status(201);
    //         done();
    //     });
    // });

    // it('should verify that we have 1 team in the DB', (done) => {
    //     chai.request(server)
    //     .get('/api/teams')
    //     .end((err, res) => {
    //         res.should.have.status(200);
    //         res.body.should.a('array');
    //         res.body.length.should.be.eql(1);
    //         done();
    //     });
    // });



    // it('should test two values', () =>{
    //     //actual test content in here
    //     let expectedVal = 10;
    //     let actualVal = 10;

    //     expect(actualVal).to.be.equal(expectedVal);
    // })
})