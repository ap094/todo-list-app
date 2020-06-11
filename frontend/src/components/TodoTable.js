import React, { useState, useContext, useRef } from 'react';
import MaterialTable from 'material-table';
import { TablePagination } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { tableStyles } from '../styles';
import { TodoContext } from '../context/TodosProvider';
import ConfirmationDialog from './dialogs/ConfirmationDialog';
import FormDialog from './dialogs/FormDialog';

function TodoTable({ classes, ...props }) {
    const { todos, deleteTodo, editTodo, deleteSelectedTodos } = useContext(TodoContext);

    const confirmationDialogRef = useRef(null);
    const [ recordToDeleteId, setRecordToDeleteId ] = useState('');
    const onDeleteTodo = (id) => () => {
        setRecordToDeleteId(id);
        confirmationDialogRef.current.openDialog();
    }

    const deleteTodoRecord = (response) => {
        if (!response) {
            return;
        }

        deleteTodo(recordToDeleteId);
    }

    const formDialogRef = useRef(null);
    const [ recordToEdit, setRecordToEdit ] = useState(null);
    const onEditTodo = (todo) => () => {
        setRecordToEdit(todo);
        formDialogRef.current.handleOpen();
    }

    const [ selectedTodos, setSelectedTodos ] = useState([]);
    const onDeleteSelectedTodos = (event, selected) => {
        setSelectedTodos(selected);
        confirmationDialogRef.current.openDialog();
    }

    const deleteSelectedTodoRecords = (response) => {
        if (!response) {
            return;
        }

        deleteSelectedTodos(selectedTodos);
        setSelectedTodos([]);
    }

    const showTodoDetails = (id) => () => {
        props.history.push(`/detail/${id}`);
    };

    const renderTableActions = (rowData) => {
        return (
            <>
                <button className={classes.button}
                    onClick={onEditTodo(rowData)}
                    title="Edit"
                >
                    <i className="material-icons primary-color">edit</i>
                </button>
                <button className={classes.button}
                    onClick={onDeleteTodo(rowData.id)}
                    title="Delete"
                >
                    <i className="material-icons primary-color">delete</i>
                </button>
                <button className={classes.button}
                    onClick={showTodoDetails(rowData.id)}
                    title="View details"
                >
                    <i className="material-icons primary-color">visibility</i>
                </button>
            </>
        );
    }

    const tableProps = getTableProps(renderTableActions, onDeleteSelectedTodos);

    return (
        <>
            <MaterialTable
                title="Todos"
                data={todos}
                {...tableProps}
            />
            <ConfirmationDialog
                ref={confirmationDialogRef}
                alertText={selectedTodos.length
                    ? 'Are you sure you want to delete this records?'
                    : 'Are you sure you want to delete this record?'
                }
                onConfirm={selectedTodos.length ? deleteSelectedTodoRecords : deleteTodoRecord }
            />
            <FormDialog
                ref={formDialogRef}
                action={{ editTodo }}
                todo={recordToEdit}
                buttonType={'Edit'}
            />
        </>
    );
}

const getTableProps = (renderTableActions, onDeleteSelectedTodos) => {
    const actions = [
        {
            tooltip: 'Remove selected todos',
            icon: 'delete',
            onClick: onDeleteSelectedTodos,
        }
    ]

    const columns = [
        { title: 'Id', field: 'id', sorting: false, editable: 'never' },
        { title: 'Task Name', field: 'taskName' },
        { title: 'Task Description', field: 'taskDescription',
            cellStyle: {
                width: '100px',
                maxWidth: '100px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
            },
        },
        { title: 'Created At', field: 'createdAt', editable: 'never' },
        { title: 'Actions', field: 'actions', sorting: false, editable: 'never', render: renderTableActions }
    ];

    const components = {
        Pagination: (props) => {
            if (props.count <= 5) {
                return null;
            }

            return  (
                <TablePagination {...props} />
            );
        }
    }

    const options = {
        sorting: true,
        selection: true,
        search: true,
    }

    return {
        actions,
        columns,
        components,
        options,
    }
}

export default withStyles(tableStyles)(TodoTable);
