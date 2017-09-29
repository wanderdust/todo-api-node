const {ObjectID} = require('mongodb')
,     {mongoose} = require('./../server/db/mongoose.js')
,     {Todo} = require('./../server/models/todo.js')
,     {User} = require('./../server/models/user.js');

// Todo.remove({}).then((result) => {
//   console.log(result)
// })

Todo.findByIdAndRemove('59ce7a4474fe30270ced35a0').then((todo) => {
  console.log(todo)
})

Todo.findOneAndRemove('59ce7a4474fe30270ced35a0').then(todo => {
  console.log(todo)
})
