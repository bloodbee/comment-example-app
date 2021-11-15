const request = require('supertest');
const app = require('../../app')

const mongoose = require('mongoose');

describe('Users Endpoints', () => {
  let users = [];
  // let connection;
  // let db;

  // beforeAll(async () => {
  //   // Cnnect to bdd
  //   connection = await MongoClient.connect(global.__MONGO_URI__, {
  //     useNewUrlParser: true,
  //   });
  //   db = await connection.db(global.__MONGO_DB_NAME__);
  // });

  afterAll(() => {
    // delete all remaining tests users from database
    users.forEach(async element => {
      await request(app).delete(`/users/${element._id}`);
    });
    return;
  });

  it('GET all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('users');
  })

  it('POST user with no role provided', async () => {
    const res = await request(app).post('/users')
    .send({
      pseudonym: 'Test User 1',
      email: 'testuser@email.com',
      password: 'testuser1',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('role', 'user');
    users.push(res.body.user); // push to our array - for later deletions
  })

  it('POST user with missing required fields', async () => {
    const res = await request(app).post('/users')
    .send({
      pseudonym: 'Test User 1'
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('err');
    expect(res.body.err).toBe('Bad request formatting, name or symbol is missing.');
  })

  it('POST user that exists', async () => {
    const res = await request(app).post('/users')
    .send({
      pseudonym: 'Test User Exist',
      email: 'testuser@email.com',
      password: 'testuser1',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('err');
    expect(res.body.err).toBe('This user already exists.');
  })

  it('POST user with role provided', async () => {
    const res = await request(app).post('/users')
    .send({
      pseudonym: 'Test User 2',
      email: 'testuser2@email.com',
      password: 'testuser2',
      role: 'admin'
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('role', 'admin');
    users.push(res.body.user); // push to our array - for later retrieve & deletions
  })

  it('POST login user with missing required fields', async () => {
    const res = await request(app).post('/users/login')
    .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('err');
    expect(res.body.err).toBe('Bad request formatting, name or symbol is missing.');
  })

  it('POST login user with unknow email', async () => {
    const res = await request(app).post('/users/login')
    .send({
      email: 'fakeemailthatdoesntexistindatabase@email.com',
      password: 'testuser1',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('err');
    expect(res.body.err).toBe('No user found with this email.');
  })

  it('POST login user with bad password', async () => {
    const res = await request(app).post('/users/login')
    .send({
      email: 'testuser@email.com',
      password: 'badpassword',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('err');
    expect(res.body.err).toBe("Bad password, if it's you, you should retry.");
  })

  it('POST login user with good values', async () => {
    const res = await request(app).post('/users/login')
    .send({
      email: 'testuser@email.com',
      password: 'testuser1',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
  })
  
  it('GET specific user by id', async () => {
    const res = await request(app).get(`/users/${users[0]._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('_id', users[0]._id);
  })

  it("GET user that doesn't exists", async () => {
    const res = await request(app).get(`/users/${mongoose.Types.ObjectId()}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('err');
    expect(res.body.err).toBe('No user found with this id.');
  })

  it("PUT user", async () => {
    const res = await request(app).put(`/users/${users[0]._id}`)
    .send({
      email: "testuserupdated@email.com",
      role: "admin"
    });
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe(`User ${users[0]._id} updated succesfully.`);
  })

  it('DELETE specific user by id', async () => {
    const res = await request(app).delete(`/users/${users[0]._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe(`User ${users[0]._id} deleted succesfully.`)

    // remove the users from our array
    users = users.filter(el => el._id !== users[0]._id)
  })
})