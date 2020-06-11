const functions = require('firebase-functions');
const app = require('express')();

const {
    getTodos,
    getOneTodo,
    postTodo,
    editTodo,
    deleteTodo,
} = require('./api/todos')

app.get('/todos', getTodos);
app.get('/todo/:todoId', getOneTodo);
app.post('/todo', postTodo);
app.put('/todo/:todoId', editTodo);
app.delete('/todo/:todoId', deleteTodo);

exports.api = functions.https.onRequest(app);
