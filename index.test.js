const request = require('supertest');

const app = require('./index');

describe('GET', () => {
  it('testing /textChat/groups', () => {
    return request(app)
      .get('/textChat/groups')

      .expect('Content-Type', /json/)

      .expect(200)

      .then((response) => {
        expect(response.body.data[0]).toMatchObject(
            expect.objectContaining({
                idGroup: expect.any(Number),

                Name: expect.any(String),

                Private: expect.any(Number),
            }),
        );
      });
  });
});