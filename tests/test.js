
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
var createdID;

chai.use(chaiHttp);
chai.should();

describe("Pokemons", () => {
    describe("GET /", () => {
        // Test to get all pokemon records
        it("should get all pokemon records", (done) => {
             chai.request(app)
                 .get('/api/pokemons')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
        // Test to get single pokemon record
        it("should get a single pokemon record", (done) => {
             const id = '5faabb49ace73970946a38cd';
             chai.request(app)
                 .get(`/api/pokemons/${id}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });


    });

    describe("POST /", () => {
        // Test to add a pokemon record
        it("should add a pokemon record", (done) => {
             chai.request(app)
                 .post('/api/pokemons')
                 .set('content-type', 'application/x-www-form-urlencoded')
                  .send({name: 'Chamander'})
                  .send({type: 'Fire'})
                  .send({status: 'Normal'})
                  .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    createdID = res.body.data._id;
                    done();
                  });
         });
    });

    describe("DELETE /", () => {
        // Test to remove a pokemon record
        it("should remove a pokemon record", (done) => {
             chai.request(app)
                .del(`/api/pokemons/${createdID}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                 });
         });
    });
});
