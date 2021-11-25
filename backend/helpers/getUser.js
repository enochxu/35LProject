const jwt = require('jsonwebtoken');
const mongo = require('../mongo');
const db = mongo.db('todolist');
const Users = db.collection('users');
const JWT_SECRET = process.env.JWT_SECRET;

const getUser = async (token) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  try {
    const user = await Users.findOne({ username: decoded.username });
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = getUser;