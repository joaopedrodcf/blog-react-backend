const { app } = require('../../../server');
const request = require('supertest');

describe('Email routes', () => {
  it('should return 200', async done => {
    await request(app)
      .post('/api/send-email')
      .send({
        email: 'joaoferr93@gmail.com',
        message: 'teste',
        name: 'teste'
      })
      .set('Accept', 'application/json')
      .expect(200);

    done();
  });

  it('should return 500', async done => {
    await request(app)
      .post('/api/send-email')
      .send({})
      .set('Accept', 'application/json')
      .expect(500);

    done();
  });
});
