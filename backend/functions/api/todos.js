const { db } = require('../utils/admin');

exports.getTodos = (request, response) => {
    db
        .collection('todos')
        .orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let todos = [];

            data.forEach((todo) => {
                todos.push({
                    id: todo.id,
                    taskName: todo.data().taskName,
                    taskDescription: todo.data().taskDescription,
                    createdAt: todo.data().createdAt,
                });
            });

            return response.json(todos);
        })
        .catch((err) => {
            console.error('Error on get todos');
            return response.status(500).json({ error: err.code });
        });
};

exports.getOneTodo = (request, response) => {
    db
        .doc(`todos/${request.params.todoId}`)
        .get()
        .then((data) => {
            if (!data.exists) {
                return response.status(404).json({ error: 'Todo not found' });
            }

            return response.json({
                ...data.data(),
                todoId: data.id
            });
        })
        .catch((err) => {
            console.log('Error on get todo');
            return response.status(500).json({ error: err.code });
        });
}

exports.postTodo = (request, response) => {
    if (request.body.taskName.trim() === '') {
        return response.status(400).json({ taskName: 'Field must not be empty' });
    }

    if (request.body.taskDescription.trim() === '') {
		return response.status(400).json({ taskDescription: 'Field must not be empty' });
    }

    const newTodoItem = {
        taskName: request.body.taskName,
        taskDescription: request.body.taskDescription,
        createdAt: new Date().toLocaleString()
    }

    db
        .collection('todos')
        .add(newTodoItem)
        .then((data)=>{
            return response.json({
                ...newTodoItem,
                id: data.id
            });
        })
        .catch((err) => {
            console.error('Error on post todo');
            return response.status(500).json({ error: err.code });
        });
};

exports.deleteTodo = (request, response) => {
    const document = db.doc(`/todos/${request.params.todoId}`);

    document
        .get()
        .then((data) => {
            if (!data.exists) {
                return response.status(404).json({ error: 'Todo not found' })
            }

            return document.delete();
        })
        .then(() => {
            response.json({ message: 'Delete successfull' });
        })
        .catch((err) => {
            console.error('Error on delete todo');
            return response.status(500).json({ error: err.code });
        });
}

exports.editTodo = (request, response) => {
    if (request.body.todoId || request.body.createdAt) {
        return response.status(403).json({ message: 'Not allowed to edit' });
    }

    const document = db.collection('todos').doc(`${request.params.todoId}`);

    document
        .update(request.body)
        .then(()=> {
            response.json({ message: 'Updated successfully' });
        })
        .catch((err) => {
            console.error('Error on edit todo');
            return response.status(500).json({ error: err.code });
        });
}
