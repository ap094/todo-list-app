import { uuid } from 'uuidv4';

const todosData = [
    {
        id: uuid(),
        taskName: 'Create todo app',
        taskDescription: 'React, material UI, long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text',
        createdAt: new Date().toLocaleString(),
    },
    {
        id: uuid(),
        taskName: 'Get a job',
        taskDescription: 'I need to find job asap',
        createdAt: new Date().toLocaleString(),
    },
    {
        id: uuid(),
        taskName: 'Get a job2',
        taskDescription: 'I need to find job asap',
        createdAt: new Date().toLocaleString(),
    },
    {
        id: uuid(),
        taskName: 'Get a job33',
        taskDescription: 'I need to find job asap',
        createdAt: new Date().toLocaleString(),
    },
    {
        id: uuid(),
        taskName: 'Get a job44',
        taskDescription: 'I need to find job asap',
        createdAt: new Date().toLocaleString(),
    },
    {
        id: uuid(),
        taskName: 'Get a job55',
        taskDescription: 'I need to find job asap',
        createdAt: new Date().toLocaleString(),
    },
];

export default todosData;
