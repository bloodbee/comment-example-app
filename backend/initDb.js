/**
 * Init DB mongo with mongoose
 */
require('dotenv').config({path: '.env'});

const mongoose = require('mongoose');
const User = require('./models/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;

// Generate two users - one admin and one basic
async function generateUsers() {
  await User.create({
    pseudonym: 'Admin',
    email: 'admin@email.com',
    hashedPassword: await bcrypt.hash('adminpassword', saltRounds),
    role: 'admin'
  });
  console.log('Admin user created successfully')

  await User.create({
    pseudonym: 'User',
    email: 'user@email.com',
    hashedPassword: await bcrypt.hash('userpassword', saltRounds),
    role: 'admin'
  });
  console.log('Basic user created successfully');
}

mongoose
.connect(
  `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(async () => {
  console.log(`MongoDB connected on mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`);
  await generateUsers();
  console.log('Done db initialisation');

  // disconnect db
  mongoose.connection.close();
  console.log('MongoDB disconnected.');
})
.catch(err => console.log(err));
