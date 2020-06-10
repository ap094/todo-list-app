import React, { useState, useContext, useRef } from 'react';
import MaterialTable from 'material-table';
import { TablePagination } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { TodoContext } from '../context/TodosProvider';
import ConfirmationDialog from './dialogs/ConfirmationDialog';
import FormDialog from './dialogs/FormDialog';
import { tableStyles } from '../styles/styles';

function TodoTable({ classes, ...props }) {
    const { todos, deleteTodo, editTodo, deleteSelectedTodos } = useContext(TodoContext);

    const [ selectedRow, setSelectedRow ] = useState(null);
    const [ recordToDeleteId, setRecordToDeleteId ] = useState('');
    const [ recordToEdit, setRecordToEdit ] = useState(null);
    const [ selectedTodos, setSelectedTodos ] = useState([]);
    const [ isOneRecord, setIsOneRecord ] = useState(true);

    const confirmationDialogRef = useRef(null);
    const formDialogRef = useRef(null);

    const onDeleteTodo = (id) => () => {
        setRecordToDeleteId(id);
        setIsOneRecord(true);
        confirmationDialogRef.current.openDialog();
    }

    const deleteTodoRecord = (response) => {
        if (!response) {
            return;
        }

        deleteTodo(recordToDeleteId);
    }

    const onEditTodo = (todo) => () => {
        setRecordToEdit(todo);
        formDialogRef.current.handleOpen();
    }

    const onDeleteSelectedTodos = (event, selected) => {
        setSelectedTodos(selected);
        setIsOneRecord(false);
        confirmationDialogRef.current.openDialog();
    }

    const deleteSelectedTodoRecords = (response) => {
        if (!response) {
            return;
        }

        deleteSelectedTodos(selectedTodos);
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

    const onRowClick = (event, selectedRow) => setSelectedRow(selectedRow.tableData.id);

    const tableColumns = [
        { title: 'Id', field: 'id', sorting: false, editable: 'never' },
        { title: 'Task Name', field: 'taskName' },
        { title: 'Task Description', field: 'taskDescription',
            cellStyle: {
                width: '10px',
                maxWidth: '10px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
            },
        },
        { title: 'Created At', field: 'createdAt', editable: 'never' },
        { title: 'Actions', field: 'actions', sorting: false, editable: 'never', render: renderTableActions }
    ];

    const tableOptions = {
        sorting: true,
        selection: true,
        search: true,
        rowStyle: rowData => ({ backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF' }),
    }

    const tableActions = [
        {
            tooltip: 'Remove selected todos',
            icon: 'delete',
            onClick: onDeleteSelectedTodos,
        }
    ]

    const tableComponents = {
        Pagination: (props) => {
            if (props.count <= 5) {
                return null;
            }

            return  (
                <TablePagination {...props} />
            );
        }
    }

    // const prepareTodosForTable = todos.map((todo) => {
    //     let shortDescription = '';

    //     if (todo.taskDescription.length >= 20) {
    //         shortDescription = todo.taskDescription.substring(0, 20) + '...';
    //     } else {
    //         shortDescription = todo.taskDescription;
    //     }

    //     return {
    //         ...todo,
    //         shortDescription,
    //     }
    // });

    return (
        <>
            <MaterialTable
                title="Todos"
                columns={tableColumns}
                data={todos}
                options={tableOptions}
                onRowClick={onRowClick}
                actions={tableActions}
                components={tableComponents}
            />
            <ConfirmationDialog
                ref={confirmationDialogRef}
                alertText={isOneRecord
                    ? 'Are you sure you want to delete this record?'
                    : 'Are you sure you want to delete this records?'
                }
                onConfirm={isOneRecord ? deleteTodoRecord : deleteSelectedTodoRecords }
            />
            <FormDialog
                ref={formDialogRef}
                actions={{ editTodo }}
                buttonType={'Edit'}
                todo={recordToEdit}
            />
        </>
    );
}

export default withStyles(tableStyles)(TodoTable);
