const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  db.collection('Users').findOneAndUpdate({
    name: 'Pus'
  }, {
    $set: {
      name: 'Pus'
    },
    $inc: {
      age: 1
    }
  }, {
    // If set to true, returns original object.
    returnOriginal: false
  }).then((res) => {
    console.log(res)
  }).catch(err => console.log(err));
  db.close();
})
