import React, { createContext, useState, useEffect } from 'react';
import { getData, postData, deleteData } from './todosAPI';

export const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
    const [ todos, setTodos ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        getData('/todos')
            .then((data) => {
                setTodos(data);
                setIsLoading(false);
            });
    }, []);

    const addTodo = (todo) => {
        postData('/todo', 'post', todo)
            .then(({ data }) => {
                setTodos([
                    ...todos,
                    { ...data }
                ]);
            });
    };

    const editTodo = (todoRecord) => {
        const updatedTodo = {
            taskName: todoRecord.taskName,
            taskDescription: todoRecord.taskDescription
        }

        postData(`/todo/${todoRecord.id}`, 'put', updatedTodo);

        setTodos(todos.map((todo) => {
            if (todo.id === todoRecord.id) {
                return { ...todoRecord };
            }

            return todo;
        }));
    }

    const deleteTodo = (id) => {
        deleteData(`/todo/${id}`);
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const deleteSelectedTodos = (selectedTodos) => {
        let todosCopy = [...todos];

        selectedTodos.forEach(st => {
            deleteData(`/todo/${st.id}`);
            todosCopy = todosCopy.filter(tc => tc.id !== st.id);
        });

        setTodos(todosCopy);
    }

    return (
        <TodoContext.Provider
            value={{
                isLoading,
                todos,
                addTodo,
                editTodo,
                deleteTodo,
                deleteSelectedTodos,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};

export default TodoContextProvider;
