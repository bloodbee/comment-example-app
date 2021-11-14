const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/user')

/* GET users listing without hashed password (we don't need it) */
router.get('/', async function(req, res, next) {
  res.send({ users: await User.find().select('-hashedPassword') });
});

/* GET signin user */
router.post('/login', async function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.json({error: 'Bad request formatting, name or symbol is missing.'});
  } else {
    User.findOne().byEmail(email).exec(async (err, user) => {
      if (err) res.json({ err: err });
      else {
        if (user) {
          // compare passwords
          bcrypt.compare(password, user.hashedPassword, function(err, result) {
            // result == true
            if (result) {
              res.json({ user: user });
            } else {
              res.json({ err: "Bad password, if it's you, you should retry." });
            }
          });
        } else {
          res.json({ err: 'No user found with this email.' });
        }
      }
    })
  }
});

/* GET user specified with id */
router.get('/:id', function(req, res, next) {
  if (!req.params.id) res.json({ err: 'Please provide an id param.' });
  else {
    User.findById(req.params.id, (err, user) => {
      if (err) res.json({ err: err })
      else {
        if (user) {
          res.json({ user: user })
        } else {
          res.json({ err: 'No user found with this id.' });
        }
      }
    })
  }
});

/* POST create a user */
router.post('/', function(req, res, next) {
  const pseudonym = req.body.pseudonym;
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.json({error: 'Bad request formatting, name or symbol is missing.'});
  } else {
    // First, find if there is no other user with the same email - which is unique
    User.findOne().byEmail(email).exec(async (err, alreadyExistUser) => {
      if (!alreadyExistUser) {
        User.create({
          pseudonym,
          email,
          hashedPassword: await bcrypt.hash(password, saltRounds),
          role: 'user'
        }, (err, user) => {
          if (err) res.json({ err: err })
          else {
            if (user) {
              res.json({ user: user, msg: 'User created successfully.' });
            } else {
              res.json({ err: 'Unable to create this user.' });
            }
          }
        })
      } else {
        res.json({ err: 'This user already exists.' });
      }
    });
    
  }
});

/* PUT update user specified with id */
router.put('/:id', function(req, res, next) {
  res.send('respond with a resource');
});

/* DELETE delete user specified with id */
router.delete('/:id', async function(req, res, next) {
  if (!req.params.id) res.json({ err: 'Please provide an id param.' })
  else {
    await User.findByIdAndDelete(req.params.id)

    res.send(`User ${req.params.id} deleted succesfully.`)
  }
});

module.exports = router;
