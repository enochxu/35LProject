const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017/todolist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err, db) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to database.');
  }
});

module.exports = client;