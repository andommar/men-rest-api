process.env.NODE_ENV = 'test';


const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../server');
chai.use(chaiHttp);

describe('User workflow tests', () => {

        // ========= User register and login validations =========

        it('Should register a new user', (done) =>{
            let user = {
                name: "New user",
                email: "newuserregister@gmail.com",
                password: "hellothere!"
            }
            chai.request(server)
                .post('/api/user/register')
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body.error).to.be.equal(null);
                    done();

                })
        });

        it('Should not register a new user. Email already in use', (done) =>{
            let user = {
                name: "New user",
                email: "newuserregister@gmail.com",
                password: "hellothere!"
            }
            chai.request(server)
                .post('/api/user/register')
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.be.equal(400);
                    expect(res.body).to.be.a('object');
                    expect(res.body.error).to.be.equal('Email already exists');
                    done();

                })
        });

        it('Should login a user that already exists', (done) =>{
            let user = {
                email: "newuserregister@gmail.com",
                password: "hellothere!"
            }
            chai.request(server)
                .post('/api/user/login')
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body.error).to.be.equal(null);
                    done();

                })
        });

        it('Should not login with an invalid password', (done) =>{
            let user = {
                email: "newuserregister@gmail.com",
                password: "vutigaibas$!"
            }
            chai.request(server)
                .post('/api/user/login')
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.be.equal(400);
                    expect(res.body).to.be.a('object');
                    expect(res.body.error).to.be.equal('Password is wrong');
                    done();

                })
        });

        it('Should not login with an invalid email', (done) =>{
            let user = {
                email: "adda@gmail.com",
                password: "hellothere!"
            }
            chai.request(server)
                .post('/api/user/login')
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.be.equal(400);
                    expect(res.body).to.be.a('object');
                    expect(res.body.error).to.be.equal('Email is wrong');
                    done();

                })
        });


});