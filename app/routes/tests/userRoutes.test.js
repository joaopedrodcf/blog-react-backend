const { app } = require('../../../server');
const request = require('supertest');

describe('User routes', () => {
  it('should return 200', async done => {
    await request(app)
      .post('/api/register')
      .send({
        email: 'email3@gmail.com',
        password: 'password'
      })
      .set('Accept', 'application/json')
      .expect(200);

    done();
  });

  it('should return 400', async done => {
    await request(app)
      .post('/api/register')
      .send({})
      .set('Accept', 'application/json')
      .expect(400);

    done();
  });
});
