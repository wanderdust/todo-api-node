const expect = require('expect')
,     request = require('supertest')
,     {ObjectID} = require('mongodb');

const {app} = require('./../server.js')
,     {Todo} = require('./../models/todo.js');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 123456789
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done())
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    let text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text: text})
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text)
      })
      .end((err, res) => {
        if(err) return done(err);

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e))
      });
  })
  it('should not create todo with invalid data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e))
      })
  })
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done)
  })
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done)
  });

  it('should return a 404 if todo not found', (done) => {
    let hexId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done)
  });

  it('should return a 404 if non-object id', (done) => {
    let badId = '1234abc';
    request(app)
      .get(`/todos/${badId}`)
      .expect(404)
      .end(done)
  })
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    let hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId)
      })
      .end((err, res) => {
        if (err) return done(err);

        Todo.findById(hexId)
          .then((res) => {
            expect(res).toNotExist();
            done();
          }).catch(e => done(e))
      })
  });

  it('should return 404 if todo not found', (done) => {
    let hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done)
  });

  it('should return 404 if objectID is invalid', (done) => {
    let badId = 'abcd1234';

    request(app)
      .delete(`/todos/${badId}`)
      .expect(404)
      .end(done)
  })
})

describe('PATCH /todos/:id', () => {
  it('should update the Todo', (done) => {
    let id = todos[0]._id;
    let updatedTodo = {
      text: "PATCH test text 1",
      completed: true
    };

    request(app)
      .patch(`/todos/${id}`)
      .send(updatedTodo)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(updatedTodo.text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done)
  })

  it('should clear completedAt when todo is not completed', (done) => {
    let id = todos[1]._id;
    let updatedTodo = {
      text: "PATCH test text 2",
      completed: false
    };

    request(app)
      .patch(`/todos/${id}`)
      .send(updatedTodo)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(updatedTodo.text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done)
  })
})
