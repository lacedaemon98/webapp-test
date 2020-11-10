
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');

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
             const id = '5faaa5d2fefb5677ec1f7609';
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
                    done();
                  });
         });



    });
});
