import {
    AppBar,
    CssBaseline,
    IconButton,
    Toolbar,
    Typography,
 } from '@material-ui/core';
import { TodoContext } from '../context/TodosProvider';
import { todoListStyles } from '../styles/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FormDialog from './FormDialog';
import React, { useContext, useRef } from 'react';
import TodoTable from './TodoTable';
import withStyles from '@material-ui/core/styles/withStyles';

function TodoList({ classes }) {
    const { addTodo } = useContext(TodoContext);
    const formDialogRef = useRef(null);

    const onAddButtonClick = () => {
        formDialogRef.current.handleOpen();
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Todo List App
                    </Typography>
                </Toolbar>
            </AppBar>

            <main className={classes.content}>
                <div className={classes.toolbar} />

                <TodoTable />

                <IconButton
                    className={classes.addIconButton}
                    color="primary"
                    aria-label="Add Todo"
                    onClick={onAddButtonClick}
                >
                    <AddCircleIcon className={classes.addIconButtonSize} />
                </IconButton>

                <FormDialog
                    ref={formDialogRef}
                    actions={{ addTodo }}
                    buttonType={'Add'}
                />
            </main>
        </div>
    );
}

export default withStyles(todoListStyles)(TodoList);
