import React, { useContext, useRef } from 'react';
import { Button, Icon } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { TodoContext } from '../context/TodosProvider';
import { todoListStyles } from '../styles/styles';
import FormDialog from './dialogs/FormDialog';
import TodoTable from './TodoTable';
import Home from './Home';

function TodoList({ classes, history }) {
    const { addTodo } = useContext(TodoContext);
    const formDialogRef = useRef(null);

    const onAddButtonClick = () => {
        formDialogRef.current.handleOpen();
    }

    return (
        <Home>
            <Button
                variant="contained"
                color="primary"
                className={classes.addIconButton}
                startIcon={<Icon>add</Icon>}
                onClick={onAddButtonClick}
            >
                Add todo
            </Button>
            <FormDialog
                ref={formDialogRef}
                actions={{ addTodo }}
                buttonType={'Add'}
            />
            <TodoTable history={history} />
        </Home>
    );
}

export default withStyles(todoListStyles)(TodoList);
