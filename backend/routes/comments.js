const express = require('express');
const router = express.Router();

const Comment = require('../models/comment')

/* GET comments listing */
router.get('/', async function(req, res, next) {
  const comments = await Comment.find().sort({ createdAt: -1 })
  /** @TODO use aggregation to group comments by georeferenceId */
  res.send({ comments: comments });
});

/* GET comment specified with id */
router.get('/:id', function(req, res, next) {
  if (!req.params.id) res.json({ err: 'Please provide an id param.' })
  else {
    Comment.findById(req.params.id, (err, comment) => {
      if (err) res.json({ err: err })
      else {
        if (comment) {
          res.json({ comment: comment })
        } else {
          res.json({ err: 'No comment found with this id.' })
        }
      }
    })
  }
});

/* POST create a comment */
router.post('/', function(req, res, next) {
  const { comment, userId, orderId, georeferenceId, position } = req.body

  if (!comment || (!userId && !orderId) || (!userId && !georeferenceId)) {
    res.json({error: 'Bad request formatting, name or symbol is missing.'})
  } else {

    Comment.create({
      userId,
      orderId,
      georeferenceId,
      text: comment
    }, (err, comment) => {
      if (err) res.json({ err: err })
      else {
        if (comment) {
          res.json({ comment: comment, msg: 'Comment created successfully.' })
        } else {
          res.json({ err: 'Unable to create this comment.' })
        }
      }
    });
  }
});

/* PUT update comment specified with id */
router.put('/:id', function(req, res, next) {
  res.send('respond with a resource');
});

/* DELETE delete comment specified with id */
router.delete('/:id', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
