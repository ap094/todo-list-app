import { uuid } from 'uuidv4';

const todosData = [
    {
        id: uuid(),
        taskName: 'Create todo app',
        taskDescription: 'React, material UI',
        createdAt: new Date().toLocaleString()
    },
    {
        id: uuid(),
        taskName: 'Get a job',
        taskDescription: 'I need to find job asap',
        createdAt: new Date().toLocaleString()
    },
];

export default todosData;
