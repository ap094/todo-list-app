import React, { useState, useContext, useRef } from 'react';
import MaterialTable from 'material-table';
import { TablePagination } from '@material-ui/core';
import { TodoContext } from '../context/TodosProvider';
import ConfirmationDialog from './ConfirmationDialog';
import FormDialog from './FormDialog';

// import withStyles from '@material-ui/core/styles/withStyles';
// import { tableStyles } from '../styles/styles';

function TodoTable() {
    const [ selectedRow, setSelectedRow ] = useState(null);
    const { todos, deleteTodo, editTodo, deleteSelectedTodos } = useContext(TodoContext);
    const [ recordToDelete, setRecordToDelete ] = useState('');
    const [ recordToEdit, setRecordToEdit ] = useState(null);
    const [ selectedTodos, setSelectedTodos ] = useState([]);
    const [ isOneRecord, setIsOneRecord ] = useState(true);
    const confirmationDialogRef = useRef(null);
    const formDialogRef = useRef(null);

    const onDeleteTodo = (id) => () => {
        setRecordToDelete(id);
        setIsOneRecord(true);
        confirmationDialogRef.current.openDialog();
    }

    const deleteTodoRecord = (response) => {
        if (!response) {
            return;
        }

        deleteTodo(recordToDelete);
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

    const renderTableOperations = (rowData) => {
        return (
            <>
                <button style={{ border: 'none', background: 'none', cursor: 'pointer'}}
                    onClick={onEditTodo(rowData)}
                    title="Edit"
                >
                    <i className="material-icons primary-color">edit</i>
                </button>
                <button style={{ border: 'none', background: 'none', cursor: 'pointer', marginLeft: '10px' }}
                    onClick={onDeleteTodo(rowData.tableData.id)}
                    title="Delete"
                >
                    <i className="material-icons primary-color">delete</i>
                </button>
            </>
        );
    }

    const tableColumns = [
        { title: 'Id', field: 'id', sorting: false, editable: 'never' },
        { title: 'Task Name', field: 'taskName' },
        { title: 'Task Description', field: 'taskDescription' },
        { title: 'Created At', field: 'createdAt', editable: 'never' },
        {
            title: 'Operations',
            field: 'operations',
            sorting: false,
            editable: 'never',
            render: renderTableOperations,
        }
    ];

    const tableOptions = {
        sorting: true,
        selection: true,
        search: true,
        rowStyle: rowData => ({
            backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
        }),
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

    const onRowClick = (event, selectedRow) => setSelectedRow(selectedRow.tableData.id);

    const onSelectionChange = (rows) => {
        // console.log('On select change', rows)
    }

    return (
        <>
            <MaterialTable
                title="Todos"
                columns={tableColumns}
                data={todos}
                // icons={tableIcons}
                options={tableOptions}
                onRowClick={onRowClick}
                // onSelectionChange={onSelectionChange}
                actions={tableActions}
                // editable={tableOperations}
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

export default TodoTable;
