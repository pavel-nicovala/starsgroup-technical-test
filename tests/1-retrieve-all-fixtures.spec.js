//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./../index');
let should = chai.should();


chai.use(chaiHttp);
describe('/get fixtures', () => {
    it('should get all the fixtures', (done) => {
        chai.request(server).get('/fixtures')
            .end((err, res) => {
                res.should.have.status(200);
                done();

            })

    });
    it('should get an object response', (done) => {
        chai.request(server).get('/fixtures')
            .end((err, res) => {
                res.should.be.a('object');
                done();
            })
    });
    it('should count 3 fixtures', (done) => {
        chai.request(server).get('/fixtures')
            .end((err, res) => {
                res.body.forEach((fixture) => {
                    fixture.should.have.property('fixtureId');
                });
                res.body.should.have.lengthOf(3);
                done();
            })
    });
})