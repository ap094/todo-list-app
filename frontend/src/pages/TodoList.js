import React, { useContext, useRef } from 'react';
import { Button, Icon } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { todoListStyles } from '../styles';
import { TodoContext } from '../services/TodosProvider';
import BaseComponent from '../components/BaseComponent';
import FormDialog from '../components/dialogs/FormDialog';
import TodoTable from '../components/TodoTable';

function TodoList({ classes, history }) {
    const { addTodo } = useContext(TodoContext);

    const formDialogRef = useRef(null);
    const onAddButtonClick = () => {
        formDialogRef.current.handleOpen();
    }

    return (
        <BaseComponent>
            <Button
                variant="contained"
                color="primary"
                className={classes.addIconButton}
                startIcon={<Icon>add</Icon>}
                onClick={onAddButtonClick}
            >
                Add todo
            </Button>
            <TodoTable history={history} />
            <FormDialog
                ref={formDialogRef}
                action={{ addTodo }}
                buttonType={'Add'}
            />
        </BaseComponent>
    );
}

export default withStyles(todoListStyles)(TodoList);
