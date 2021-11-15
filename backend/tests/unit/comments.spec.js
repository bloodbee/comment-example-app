const request = require('supertest');
const app = require('../../app')

const mongoose = require('mongoose');

describe('Comments Endpoints', () => {
  let comments = [];
  const userId = mongoose.Types.ObjectId();
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
    comments.forEach(async element => {
      await request(app).delete(`/comments/${element._id}`);
    });
    return;
  });

  it('GET all comments', async () => {
    const res = await request(app).get('/comments');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('comments');
  })

  it('POST comment with missing required values', async () => {
    const res = await request(app).post('/comments')
    .send({
      userId: userId,
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('err');
    expect(res.body.err).toBe('Bad request formatting, name or symbol is missing.');
  })

  it('POST comment with only text', async () => {
    const res = await request(app).post('/comments')
    .send({
      comment: 'Lorem ipsuuuuuuum',
      userId: userId,
    });

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

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('comment');
    expect(res.body.comment).toHaveProperty('orderId', 'ZYUBGA9');
    comments.push(res.body.comment); // push to our array - for later retrieve & deletions
  })

  it('POST comment with georeferenceId', async () => {
    const res = await request(app).post('/comments')
    .send({
      comment: 'Lorem ipsuuuuuuum 2222222',
      userId: userId,
      orderId: null,
      georeferenceId: comments[0]._id
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('comment');
    expect(res.body.comment).toHaveProperty('georeferenceId', comments[0]._id);
    comments.push(res.body.comment); // push to our array - for later retrieve & deletions
  })
  
  it('GET specific comment by id', async () => {
    const res = await request(app).get(`/comments/${comments[0]._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('comment');
    expect(res.body.comment).toHaveProperty('_id', comments[0]._id);
  })

  it('GET non existant comment', async () => {
    const res = await request(app).get(`/comments/${mongoose.Types.ObjectId()}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('err');
    expect(res.body.err).toBe('No comment found with this id.');
  })

  it('DELETE specific comment by id', async () => {
    const res = await request(app).delete(`/comments/${comments[0]._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe(`Channel ${comments[0]._id} deleted succesfully.`)

    // remove the comments from our array
    comments = comments
    .filter(el => (el._id !== comments[0]._id)
      || (el.georeferenceId !== comments[0]._id))
  })
})