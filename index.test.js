const request = require('supertest');

const app = require('./index');

describe('GET', () => {

  it('testing /textChat/groupMessages/01', () => {
    return request(app)
      .get('/textChat/groupMessages/01')

      .expect('Content-Type', /json/)

      .expect(200)

      .then((response) => {
        expect(response.body.data[0]).toMatchObject(
            expect.objectContaining({
              idMessages: expect.any(Number),

              Contents: expect.any(String),

              Sender: expect.any(Number),

              Group_idGroup: expect.any(Number),
            }),
        );
      });
  });

  it('testing /textChat/membership/01', () => {
    return request(app)
      .get('/textChat/membership/01')

      .expect('Content-Type', /json/)

      .expect(200)

      .then((response) => {
        expect(response.body.data[0]).toMatchObject(
            expect.objectContaining({
              User_idUser: expect.any(Number),

              Group_idGroup: expect.any(Number),
            }),
        );
      });
  });

  it('testing /textChat/privateMessages/01', () => {
    return request(app)
      .get('/textChat/privateMessages/01')

      .expect('Content-Type', /json/)

      .expect(200)

      .then((response) => {
        expect(response.body.data[0]).toMatchObject(
            expect.objectContaining({
              idMessages: expect.any(Number),

              Contents: expect.any(String),

              Sender: expect.any(Number),

              Group_idGroup: expect.any(Number),
            }),
        );
      });
  });

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

  it('testing /textChat/groups/2', () => {
    return request(app)
      .get('/textChat/groups/2')

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

  it('testing /textChat/private', () => {
    return request(app)
      .get('/textChat/private')

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

  it('testing /textChat/private/2', () => {
    return request(app)
      .get('/textChat/private/2')

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

  it('testing /textChat/privateMessages', () => {
    return request(app)
      .get('/textChat/privateMessages')

      .expect('Content-Type', /json/)

      .expect(200)

      .then((response) => {
        expect(response.body.data[0]).toMatchObject(
            expect.objectContaining({
              idMessages: expect.any(Number),

              Contents: expect.any(String),

              Sender: expect.any(Number),

              Group_idGroup: expect.any(Number),
            }),
        );
      });
  });

  it('testing /textChat/users', () => {
    return request(app)
      .get('/textChat/users')

      .expect('Content-Type', /json/)

      .expect(200)

      .then((response) => {
        expect(response.body.data[0]).toMatchObject(
            expect.objectContaining({
              idUser: expect.any(Number),

                Name: expect.any(String),

                Password: expect.any(String),
            }),
        );
      });
  });

  it('testing /textChat/users/01', () => {
    return request(app)
      .get('/textChat/users/01')

      .expect('Content-Type', /json/)

      .expect(200)

      .then((response) => {
        expect(response.body.data[0]).toMatchObject(
            expect.objectContaining({
              idUser: expect.any(Number),

                Name: expect.any(String),

                Password: expect.any(String),
            }),
        );
      });
  });

});