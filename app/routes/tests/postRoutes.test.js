const { app, mongoose } = require('../../../server');
const request = require('supertest');

// file upload
// https://github.com/visionmedia/supertest/issues/259
// x-www-form-urlencoded
// https://stackoverflow.com/questions/41940179/how-do-i-send-an-object-along-with-an-attached-file-in-a-multipart-superagent-re

describe('Post routes', () => {
  beforeAll(() => {
    mongoose.connection.dropDatabase();
  });

  it('should post creation return 200', async done => {
    const response = await Promise.resolve(
      request(app)
        .post('/api/register')
        .send({
          email: 'email@gmail.com',
          password: 'password'
        })
        .set('Accept', 'application/json')
    );

    await request(app)
      .post('/api/post')
      .field('title', 'Lost airplane')
      .field('description', 'This is a story about an missing F1')
      .field('text', 'This F1 was found in Alasca ...')
      .attach('image', 'app/assets/cars.jpg')
      .set('Accept', 'application/x-www-form-urlencoded')
      .set('x-access-token', response.body.token)
      .expect(201);

    done();
  });
});
