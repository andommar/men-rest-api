process.env.NODE_ENV = 'test';


const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http'); //plugin that tests requests and responses
const server = require('../server');

chai.use(chaiHttp);


describe('Team Test Collection', () => {

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

    it('should register + login a user, create team and verify 1 in DB', (done) => {

        // 1) Register new user
        let user = {
            name: "pepe1678",
            email: "pepe1@gmail.com",
            password: "1234567"
        }
        chai.request(server)
            .post('/api/user/register')
            .send(user)
            .end((err, res) => {

                // Asserts
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.equal(null);

                // 2) Login the user
                chai.request(server)
                    .post('/api/user/login')
                    .send({
                        email: "pepe1@gmail.com",
                        password: "1234567"
                    })
                    .end((err, res) => {
                        // Asserts                        
                        expect(res.status).to.be.equal(200);
                        expect(res.body.error).to.be.equal(null);                        
                        let token = res.body.data.token;

                        // 3) Create new team
                        let team =
                        {
                            name: "Cavaliers" ,
                            full_name: "Cleveland Cavaliers",
                            location: "Cleveland",
                            stadium: "Rocket Mortgage FieldHouse",
                            wins: 36,
                            loses: 27,
                            logo: "https://content.sportslogos.net/logos/6/222/full/cleveland_cavaliers_logo_primary_20187997.png"
                        };

                        chai.request(server)
                            .post('/api/teams')
                            .set({ "auth-token": token })
                            .send(team)
                            .end((err, res) => {

                                // Asserts
                                expect(res.status).to.be.equal(201);
                                expect(res.body).to.be.a('array');
                                expect(res.body.length).to.be.eql(1);

                                let savedteam = res.body[0];
                                expect(savedteam.name).to.be.equal(team.name);
                                expect(savedteam.full_name).to.be.equal(team.full_name);
                                expect(savedteam.location).to.be.equal(team.location);
                                expect(savedteam.stadium).to.be.equal(team.stadium);
                                expect(savedteam.wins).to.be.equal(team.wins);
                                expect(savedteam.loses).to.be.equal(team.loses);
                                expect(savedteam.logo).to.be.equal(team.logo);


                                // 4) Verify one team in test DB
                                chai.request(server)
                                    .get('/api/teams')
                                    .end((err, res) => {

                                        // Asserts
                                        expect(res.status).to.be.equal(200);                                
                                        expect(res.body).to.be.a('array');                                
                                        expect(res.body.length).to.be.eql(1);

                                        done();
                                    });
                            });
                    });
            });
    });

    it('should register + login a user, create team and delete it from DB', (done) => {

        // 1) Register new user
        let user = {
            name: "newuser",
            email: "newuser@gmail.com",
            password: "1234567"
        }
        chai.request(server)
            .post('/api/user/register')
            .send(user)
            .end((err, res) => {

                // Asserts
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.equal(null);

                // 2) Login the user
                chai.request(server)
                    .post('/api/user/login')
                    .send({
                        "email": "newuser@gmail.com",
                        "password": "1234567"
                    })
                    .end((err, res) => {
                        // Asserts
                        expect(res.status).to.be.equal(200);
                        expect(res.body.error).to.be.equal(null);
                        let token = res.body.data.token;

                        // 3) Create new team
                        let team =
                        {
                            name: "Cavaliers" ,
                            full_name: "Cleveland Cavaliers",
                            location: "Cleveland",
                            stadium: "Rocket Mortgage FieldHouse",
                            wins: 36,
                            loses: 27,
                            logo: "https://content.sportslogos.net/logos/6/222/full/cleveland_cavaliers_logo_primary_20187997.png"
                        };

                        chai.request(server)
                            .post('/api/teams')
                            .set({ "auth-token": token })
                            .send(team)
                            .end((err, res) => {

                                // Asserts
                                expect(res.status).to.be.equal(201);
                                expect(res.body).to.be.a('array');
                                expect(res.body.length).to.be.eql(1);

                                let savedteam = res.body[0];
                                expect(savedteam.name).to.be.equal(team.name);
                                expect(savedteam.full_name).to.be.equal(team.full_name);
                                expect(savedteam.location).to.be.equal(team.location);
                                expect(savedteam.stadium).to.be.equal(team.stadium);
                                expect(savedteam.wins).to.be.equal(team.wins);
                                expect(savedteam.loses).to.be.equal(team.loses);
                                expect(savedteam.logo).to.be.equal(team.logo);


                                // 4) Delete team
                                chai.request(server)
                                    .delete('/api/teams/' + savedteam._id)
                                    .set({ "auth-token": token })
                                    .end((err, res) => {

                                        // Asserts
                                        expect(res.status).to.be.equal(200);
                                        const actualVal = res.body.message;
                                        expect(actualVal).to.be.equal('Team was succesfully deleted');
                                        done();
                                    });
                            });
                    });
            });
    });
    
    it('should register + login a user, create team and update by id', (done) => {

        // 1) Register new user
        let user = {
            name: "timmy",
            email: "timmy@gmail.com",
            password: "1234567"
        }
        chai.request(server)
            .post('/api/user/register')
            .send(user)
            .end((err, res) => {

                // Asserts
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.equal(null);

                // 2) Login the user
                chai.request(server)
                    .post('/api/user/login')
                    .send({
                        "email": "newuser@gmail.com",
                        "password": "1234567"
                    })
                    .end((err, res) => {
                        // Asserts
                        expect(res.status).to.be.equal(200);
                        expect(res.body.error).to.be.equal(null);
                        let token = res.body.data.token;

                        // 3) Create new team
                        let team =
                        {
                            name: "Cavaliers" ,
                            full_name: "Cleveland Cavaliers",
                            location: "Cleveland",
                            stadium: "Rocket Mortgage FieldHouse",
                            wins: 36,
                            loses: 27,
                            logo: "https://content.sportslogos.net/logos/6/222/full/cleveland_cavaliers_logo_primary_20187997.png"
                        };

                        chai.request(server)
                            .post('/api/teams')
                            .set({ "auth-token": token })
                            .send(team)
                            .end((err, res) => {

                                // Asserts
                                expect(res.status).to.be.equal(201);
                                expect(res.body).to.be.a('array');
                                expect(res.body.length).to.be.eql(1);

                                let savedteam = res.body[0];
                                expect(savedteam.name).to.be.equal(team.name);
                                expect(savedteam.full_name).to.be.equal(team.full_name);
                                expect(savedteam.location).to.be.equal(team.location);
                                expect(savedteam.stadium).to.be.equal(team.stadium);
                                expect(savedteam.wins).to.be.equal(team.wins);
                                expect(savedteam.loses).to.be.equal(team.loses);
                                expect(savedteam.logo).to.be.equal(team.logo);


                                // 4) Delete team

                                let team2 =
                                {
                                    name: "Updated team" ,
                                    full_name: "Updated team name",
                                    location: "Updated location name",
                                    stadium: "Updated stadium",
                                    wins: 5,
                                    loses: 3,
                                    logo: "https://phantom-marca.unidadeditorial.es/ee46d7a1c09b447117f8e83c6e131f31/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/02/16437899001758.jpg"
                                };


                                chai.request(server)
                                    .put('/api/teams/' + savedteam._id)
                                    .set({ "auth-token": token })
                                    .send(team2)
                                    .end((err, res) => {
                                        // Asserts
                                        expect(res.status).to.be.equal(200);
                                        const actualVal = res.body.message;
                                        expect(actualVal).to.be.equal('Team was succesfully updated');
                                        done();
                                    });
                            });
                    });
            });
    });




})