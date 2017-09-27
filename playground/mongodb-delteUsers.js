const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) return console.log(err);

  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('59c8d8773544882bcea19ec9')
  }, (err, res) => {
    if (err) return console.log(err);

    console.log(res.value)
  });

  db.close();
})
