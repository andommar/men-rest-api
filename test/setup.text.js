process.env.NODE_ENV = 'test'

const Team = require('../models/team')
const User = require('../models/user')

//clean up database for testing
before((done) =>{
    Team.deleteMany({}, function(err) {});
    User.deleteMany({}, function(err) {});
    done();
});

//clean up database after testing
after((done) =>{
    Team.deleteMany({}, function(err) {});
    User.deleteMany({}, function(err) {});
    done();
});