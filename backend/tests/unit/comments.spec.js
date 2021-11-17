const request = require('supertest');
const app = require('../../app')

const mongoose = require('mongoose');

describe('Comments Endpoints', () => {
  let comments = [];
  const userId = mongoose.Types.ObjectId();

  afterAll(() => {
    // delete all remaining tests users from database
    comments.forEach(async element => {
      await request(app).delete(`/comments/${element._id}`);
    });
    return;
  });

  describe('Retrieve comments', () => {
    it('GET all comments', async () => {
      const res = await request(app).get('/comments');

      // check request response values
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('comments');
    });
  });

  describe('Create comment', () => {
    it('POST comment with missing required values', async () => {
      const res = await request(app).post('/comments')
      .send({
        userId: userId,
      });

      // check request response values
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('err');
      expect(res.body.err).toBe('Bad request formatting, name or symbol is missing.');
    });

    it('POST comment with only text', async () => {
      const res = await request(app).post('/comments')
      .send({
        comment: 'Lorem ipsuuuuuuum',
        userId: userId,
      });

      // check request response values
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('comment');
      comments.push(res.body.comment); // push to our array - for later deletions
    })

    it('POST comment with orderId', async () => {
      const res = await request(app).post('/comments')
      .send({
        comment: 'Lorem ipsuuuuuuum 2222222',
        userId: userId,
        orderId: "ZYUBGA9"
      });

      // check request response values
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('comment');
      expect(res.body.comment).toHaveProperty('orderId', 'ZYUBGA9');
      comments.push(res.body.comment); // push to our array - for later retrieve & deletions
    });

    it('POST comment with georeferenceId', async () => {
      const res = await request(app).post('/comments')
      .send({
        comment: 'Lorem ipsuuuuuuum 2222222',
        userId: userId,
        orderId: null,
        georeferenceId: comments[0]._id
      });

      // check request response values
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('comment');
      expect(res.body.comment).toHaveProperty('georeferenceId', comments[0]._id);
      comments.push(res.body.comment); // push to our array - for later retrieve & deletions
    });
  });
  
  describe('Retrieve specific comment', () => {
    it('GET specific comment by id', async () => {
      const res = await request(app).get(`/comments/${comments[0]._id}`);

      // check request response values
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('comment');
      expect(res.body.comment).toHaveProperty('_id', comments[0]._id);
    });

    it('GET non existant comment', async () => {
      const res = await request(app).get(`/comments/${mongoose.Types.ObjectId()}`);

      // check request response values
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('err');
      expect(res.body.err).toBe('No comment found with this id.');
    });
  });

  describe('Remove comment', () => {
    it('DELETE specific comment by id', async () => {
      const res = await request(app).delete(`/comments/${comments[0]._id}`);

      // check request response values
      expect(res.statusCode).toEqual(200);
      expect(res.text).toBe(`Channel ${comments[0]._id} deleted succesfully.`);

      // remove the comments from our array
      comments = comments
      .filter(el => (el._id !== comments[0]._id)
        || (el.georeferenceId !== comments[0]._id));
    });
  });
})