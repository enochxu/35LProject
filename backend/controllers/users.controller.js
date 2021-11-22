const mongo = require('../mongo')
const bcrypt = require('bcrypt');
const dbClient = mongo;
const db = dbClient.db('todolist');
const Users = db.collection('users');

const SALT_ROUNDS = 10;

const signIn = async (req, res) => {

}


const createAccount = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send('Username or password missing');
  }
  
  const user = await Users.findOne({ username: req.body.username });
  if (user) {
    return res.status(400).json({ message: 'Username already exists.' });
  }

  const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);
  const newUser = {
    username: req.body.username,
    password: hash
  }

  Users.insertOne(newUser).then((result) => {
    return res.status(200).json({ message: 'User created.' });
  }).catch((err) => {
    return res.status(400).json({ message: 'Error creating user.' });
  });
}


module.exports = {
  signIn,
  createAccount,
}