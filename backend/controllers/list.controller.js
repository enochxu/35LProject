const mongo = require('../mongo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbClient = mongo;
const db = dbClient.db('todolist');
const Lists = db.collection('lists');

const getList = async(req, res) => {
  // get user
  
}