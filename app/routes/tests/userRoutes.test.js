const { app, mongoose } = require('../../../server');
const request = require('supertest');

describe('User routes', () => {
  beforeAll(() => {
    mongoose.connection.dropDatabase();
  });

  it('should register return 200', async done => {
    await request(app)
      .post('/api/register')
      .send({
        email: 'email@gmail.com',
        password: 'password'
      })
      .set('Accept', 'application/json')
      .expect(200);

    done();
  });

  it('should register return 400', async done => {
    await request(app)
      .post('/api/register')
      .send({})
      .set('Accept', 'application/json')
      .expect(400);

    done();
  });

  it('should login return 200', async done => {
    await request(app)
      .post('/api/login')
      .send({
        email: 'email@gmail.com',
        password: 'password'
      })
      .set('Accept', 'application/json')
      .expect(200);

    done();
  });

  it('should login return 404', async done => {
    await request(app)
      .post('/api/login')
      .send({
        email: '',
        password: ''
      })
      .set('Accept', 'application/json')
      .expect(404);

    done();
  });
});
