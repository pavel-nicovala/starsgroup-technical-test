//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./../index');
let should = chai.should();
let fixture = require('./testdata');


chai.use(chaiHttp);
describe('/store new fixture', () => {
    let newfixture = chai.request(server);
    before('should POST a new fixture', (done) => {

        newfixture.post('/fixture')
            .send(fixture)
            .end(() => {
                done()
            })
    })

    it('should GET the new fixture', (done) => {
        newfixture.get('/fixture/4').end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');
            done();
        });
    });
    it('should display HOME team first', (done) => {
        newfixture.get('/fixture/4')
            .end((err, res) => {
                res.body.footballFullState.teams.forEach((team) => {
                    team.should.have.property('teamId');
                });
                res.body.footballFullState.teams[0].teamId.should.equal('HOME')
                done();
            })
    });
    after('should DELETE fixture', (done) => {
        newfixture.delete('/fixture/4')
            .send(newfixture)
            .end(() => {
                done()
            })
    })
})