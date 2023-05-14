const request = require('supertest');

const app = require('../../server');

//-----------GET-----------

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

  it('testing /textChat/private/1', () => {
    return request(app)
      .get('/textChat/private/1')

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

                email: expect.any(String),

                joindate: expect.any(String),

                role: expect.any(String)
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

                email: expect.any(String),

                joindate: expect.any(String),

                role: expect.any(String)
            }),
        );
      });
  });

});

//-----------POST-----------

describe("POST", () => {
  const newValidUser = {
    "name": "frank", 
    "email": "frank@makeitall.com", 
    "Password": "8H2l$2DQTPOJ"
  }
  it("should add a new user", async () => {
    const response = await request(app).post("/textChat/users").send(newValidUser);
    const message = response.body.message["status"]
    const id = response.body.message["newId"]
    expect(message).toEqual('user created successfully')
    expect(response.statusCode).toEqual(200);
    await request(app).delete(`/textChat/users/${id}`)
  });
  
  const newInvalidUser = {
    "name": "Jake", 
    "email": "frank@makeitall.com",
    "Password": "test"
  }
  it("should not allow invalid password", async () => {
    const response = await request(app).post("/textChat/users").send(newInvalidUser);
    const message = response.text
    expect(message).toEqual("\"Password\" with value \"test\" fails to match the 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character, atleast 8 character pattern")
    expect(response.statusCode).toEqual(400);
  });

  const newValidMessage = {
    "Contents": "hello", 
    "Group_idGroup": 1,
    "Sender": 2
  }
  it("should add a new message", async () => {
    const response = await request(app).post("/textChat/messages").send(newValidMessage);
    const message = response.body.message["status"]
    const id = response.body.message["newId"]
    expect(message).toEqual('message created successfully')
    expect(response.statusCode).toEqual(200);
    await request(app).delete(`/textChat/messages/${id}`)
  })

  const newMembership = {
    "userId": 1, 
    "groupId": 2
  }
  it("should create a new membership", async () => {
    const response = await request(app).post("/textChat/membership").send(newMembership);
    const message = response.body.message["status"]
    const id = response.body.message["newId"]
    expect(message).toEqual('membership created successfully')
    expect(response.statusCode).toEqual(200);
  })

  const newGroup = {
    "Name": "Group1", 
  }
  it("should create a new group", async () => {
    const response = await request(app).post("/textChat/groups").send(newGroup);
    const message = response.body.message["status"]
    const id = response.body.message["newId"]
    expect(message).toEqual('group created successfully')
    expect(response.statusCode).toEqual(200);
    await request(app).delete(`/textChat/groups/${id}`)
  })

  const newPrivate = {
    "Name": "Group2", 
  }
  it("should create a new private group", async () => {
    const response = await request(app).post("/textChat/private").send(newPrivate);
    const message = response.body.message["status"]
    const id = response.body.message["newId"]
    expect(message).toEqual('pm created successfully')
    expect(response.statusCode).toEqual(200);
    await request(app).delete(`/textChat/groups/${id}`)
  })

});

//-----------DELETE-----------

describe("DELETE", () => {
  it("Should delete user", async () => {
    const newValidUser = {
      "name": "frank", 
      "email": "frank@makeitall.com", 
      "Password": "8H2l$2DQTPOJ"
    }
    let response = await request(app).post("/textChat/users").send(newValidUser);
    let message = response.body.message["status"]
    const id = response.body.message["newId"]
    expect(message).toEqual('user created successfully')
    response = await request(app).delete(`/textChat/users/${id}`)
    message = response.body.message;
    expect(message).toEqual("User deleted successfully");
    expect(response.statusCode).toEqual(200);
    response = await request(app).get(`/textChat/users/${id}`)
    expect(response.body.data.length).toEqual(0);
    expect(response.statusCode).toEqual(200);
  });

  it("Should delete message", async () => {
    const newValidMessage = {
      "Contents": "hello", 
      "Group_idGroup": 1, 
      "Sender": 2
    }
    let response = await request(app).post("/textChat/messages").send(newValidMessage);
    let message = response.body.message["status"]
    const id = response.body.message["newId"]
    expect(message).toEqual('message created successfully')
    response = await request(app).delete(`/textChat/messages/${id}`)
    message = response.body.message;
    expect(message).toEqual("message deleted successfully");
    expect(response.statusCode).toEqual(200);
    response = await request(app).get(`/textChat/messagesID/${id}`)
    expect(response.body.data.length).toEqual(0);
    expect(response.statusCode).toEqual(200);
  });

  it("Should delete membership", async () => {
    const newMembership = {
      "userId": 1, 
      "groupId": 2
    }
    let response = await request(app).delete(`/textChat/membership`).send(newMembership)
    let message = response.body.message;
    expect(message).toEqual("membership deleted successfully");
    expect(response.statusCode).toEqual(200);
    //response = await request(app).get(`/textChat/membership`).send(newMembership)
    //expect(response.body.data.length).toEqual(0);
    //expect(response.statusCode).toEqual(200);
  });

  it("Should delete group", async () => {
    const newGroup = {
      "Name": "Group1", 
    }
    let response = await request(app).post("/textChat/groups").send(newGroup);
    let message = response.body.message["status"]
    const id = response.body.message["newId"]
    expect(message).toEqual('group created successfully')
    response = await request(app).delete(`/textChat/groups/${id}`)
    message = response.body.message;
    expect(message).toEqual("Group deleted successfully");
    expect(response.statusCode).toEqual(200);
    response = await request(app).get(`/textChat/chat/${id}`)
    expect(response.body.data.length).toEqual(0);
    expect(response.statusCode).toEqual(200);
  });

  it("Should delete private", async () => {
    const newPrivate = {
      "Name": "Group2", 
    }
    let response = await request(app).post("/textChat/private").send(newPrivate);
    let message = response.body.message["status"]
    const id = response.body.message["newId"]
    expect(message).toEqual('pm created successfully')
    response = await request(app).delete(`/textChat/groups/${id}`)
    message = response.body.message;
    expect(message).toEqual("Group deleted successfully");
    expect(response.statusCode).toEqual(200);
    response = await request(app).get(`/textChat/chat/${id}`)
    expect(response.body.data.length).toEqual(0);
    expect(response.statusCode).toEqual(200);
  });

});

//-----------PUT-----------

describe("PUT", () => {
  it("should update user name and password", async () => {
    const updatedValidUser = {
      "name": "frankie", 
      "password": "8H2l$2DQTPOJ"
    }
    const newValidUser = {
      "name": "frank", 
      "email": "frank@makeitall.com", 
      "Password": "8H2l$2DQTPOJ"
    }
    let response = await request(app).post("/textChat/users").send(newValidUser);
    let message = response.body.message["status"]
    const id = response.body.message["newId"]
    expect(message).toEqual('user created successfully')
    response = await request(app).put(`/textChat/users/${id}`).send(updatedValidUser);
    message = response.body.message
    expect(message).toEqual('User updated successfully')
    expect(response.statusCode).toEqual(200);
    await request(app).delete(`/textChat/users/${id}`)
  });

  it("Should update group", async () => {
    const updatedGroup = {
      "Name": "updatedGroup1", 
    }
    const newGroup = {
      "Name": "newGroup1", 
    }
    let response = await request(app).post("/textChat/groups").send(newGroup);
    let message = response.body.message["status"]
    const id = response.body.message["newId"]
    expect(message).toEqual('group created successfully')
    response = await request(app).put(`/textChat/groups/${id}`).send(updatedGroup);
    message = response.body.message
    expect(message).toEqual('Group updated successfully')
    expect(response.statusCode).toEqual(200);
    await request(app).delete(`/textChat/groups/${id}`)
  });

  it("Should update message", async () => {
    const updatedMessage = {
      "Contents": "updatedGroup1"
    }
    const newValidMessage = {
      "Contents": "hello", 
      "Group_idGroup": 1, 
      "Sender": 2
    }
    let response = await request(app).post("/textChat/messages").send(newValidMessage);
    let message = response.body.message["status"]
    const id = response.body.message["newId"]
    expect(message).toEqual('message created successfully')
    response = await request(app).put(`/textChat/messages/${id}`).send(updatedMessage);
    message = response.body.message
    expect(message).toEqual('message updated successfully')
    expect(response.statusCode).toEqual(200);
    await request(app).delete(`/textChat/messages/${id}`)
  });
  

});