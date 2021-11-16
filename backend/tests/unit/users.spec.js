const request = require('supertest');
const app = require('../../app')

const mongoose = require('mongoose');

describe('Users Endpoints', () => {
  let users = [];

  afterAll(() => {
    // delete all remaining tests users from database
    users.forEach(async element => {
      await request(app).delete(`/users/${element._id}`);
    });
    return;
  });

  describe('Retrieve users', () => {
    it('GET all users', async () => {
      const res = await request(app).get('/users');

      // check request response values
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('users');
    });
  });

  describe('Create user', () => {
    it('POST user with no role provided', async () => {
      const res = await request(app).post('/users')
      .send({
        pseudonym: 'Test User 1',
        email: 'testuser@email.com',
        password: 'testuser1',
      });

      // check request response values
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('user');
      expect(res.body.user).toHaveProperty('role', 'user');
      users.push(res.body.user); // push to our array - for later deletions
    });

    it('POST user with missing required fields', async () => {
      const res = await request(app).post('/users')
      .send({
        pseudonym: 'Test User 1'
      });

      // check request response values
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('err');
      expect(res.body.err).toBe('Bad request formatting, name or symbol is missing.');
    });

    it('POST user that exists', async () => {
      const res = await request(app).post('/users')
      .send({
        pseudonym: 'Test User Exist',
        email: 'testuser@email.com',
        password: 'testuser1',
      });

      // check request response values
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('err');
      expect(res.body.err).toBe('This user already exists.');
    });

    it('POST user with role provided', async () => {
      const res = await request(app).post('/users')
      .send({
        pseudonym: 'Test User 2',
        email: 'testuser2@email.com',
        password: 'testuser2',
        role: 'admin'
      });

      // check request response values
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('user');
      expect(res.body.user).toHaveProperty('role', 'admin');
      users.push(res.body.user); // push to our array - for later retrieve & deletions
    });
  });

  describe('Login', () => {
    it('POST login user with missing required fields', async () => {
      const res = await request(app).post('/users/login')
      .send();

      // check request response values
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('err');
      expect(res.body.err).toBe('Bad request formatting, name or symbol is missing.');
    });

    it('POST login user with unknow email', async () => {
      const res = await request(app).post('/users/login')
      .send({
        email: 'fakeemailthatdoesntexistindatabase@email.com',
        password: 'testuser1',
      });

      // check request response values
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('err');
      expect(res.body.err).toBe('No user found with this email.');
    });

    it('POST login user with bad password', async () => {
      const res = await request(app).post('/users/login')
      .send({
        email: 'testuser@email.com',
        password: 'badpassword',
      });

      // check request response values
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('err');
      expect(res.body.err).toBe("Bad password, if it's you, you should retry.");
    });

    it('POST login user with good values', async () => {
      const res = await request(app).post('/users/login')
      .send({
        email: 'testuser@email.com',
        password: 'testuser1',
      });

      // check request response values
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('user');
    });
  });
  
  describe('Retrieve specific user', () => {
    it('GET specific user by id', async () => {
      const res = await request(app).get(`/users/${users[0]._id}`);

      // check request response values
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('user');
      expect(res.body.user).toHaveProperty('_id', users[0]._id);
    });

    it("GET user that doesn't exists", async () => {
      const res = await request(app).get(`/users/${mongoose.Types.ObjectId()}`);

      // check request response values
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('err');
      expect(res.body.err).toBe('No user found with this id.');
    });
  });

  describe('Update user', () => {
    it("PUT user", async () => {
      const res = await request(app).put(`/users/${users[0]._id}`)
      .send({
        email: "testuserupdated@email.com",
        role: "admin"
      });

      // check request response values
      expect(res.statusCode).toEqual(200);
      expect(res.text).toBe(`User ${users[0]._id} updated succesfully.`);
    });
  });

  describe('Delete user', () => {
    it('DELETE specific user by id', async () => {
      const res = await request(app).delete(`/users/${users[0]._id}`);

      // check request response values
      expect(res.statusCode).toEqual(200);
      expect(res.text).toBe(`User ${users[0]._id} deleted succesfully.`);

      // remove the users from our array
      users = users.filter(el => el._id !== users[0]._id);
    });
  });
})