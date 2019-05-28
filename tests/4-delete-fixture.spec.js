//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./../index');
let should = chai.should();
let fixture = require('./testdata');


chai.use(chaiHttp);
describe('/remove fixture', () => {
    let newfixture = chai.request(server);
    before('should POST a new fixture', (done) => {

        newfixture.post('/fixture')
            .send(fixture)
            .end(() => {
                done()
            })
    })

    it('should DELETE a fixture', (done) => {

        newfixture.delete('/fixture/4')
            .send(newfixture)
            .end(() => {
                newfixture.get('/fixture/4').end((err, res) => {
                    res.should.have.status(404);
                    res.should.be.a('object');
                    res.text.should.equal('Fixture not found')
                    done();
                });
            });
    })

})