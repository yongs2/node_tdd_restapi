const should = require('should');
const request = require('supertest');
const app = require('../app');

describe('GET /users', () => {
    describe('성공', () => {
        it('배열을 반환한다', (done) => {
            request(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.instanceof(Array);
                    res.body.forEach(user => {
                        user.should.have.property('id')
                        user.should.have.property('name')
                    })
                    done()
                })
        })
    
        it('최대 limit 갯수만큼 응답한다', (done) => {
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                    res.body.should.have.lengthOf(2);
                    done()
                })
        })
    })
   describe('실패', () => {
       it('limit 이 정수가 아니면 400을 응답', (done) => {
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done)
       })
   }) 
});

describe('GET /users/:id', () => {
    describe('성공', () => {
        it('유저 객체를 반환한다', done => {
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1)
                    done()
                })
        })
    })
    describe('실패', () => {
        it('id 가 정수가 아니면 400을 응답', (done) => {
            request(app)
                .get('/users/two')
                .expect(400)
                .end(done)
        })
        it('id로 유저를 찾을 수 없다면 404를 응답', (done) => {
            request(app)
                .get('/users/9')
                .expect(404)
                .end(done)
        })
    })
});