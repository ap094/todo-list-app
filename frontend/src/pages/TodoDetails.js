import React, { useRef, useContext } from 'react';
import { useParams, Link } from "react-router-dom";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { todoDetailStyles } from '../styles';
import { TodoContext } from '../context/TodosProvider';
import FormDialog from '../components/dialogs/FormDialog';
import ConfirmationDialog from '../components/dialogs/ConfirmationDialog';
import BaseComponent from '../components/BaseComponent';

function TodoDetails({ classes, ...props }) {
    const { getTodo, editTodo, deleteTodo } = useContext(TodoContext);
    const { todoId } = useParams();
    const todoData = getTodo(todoId);

    const formDialogRef = useRef(null);
    const onEditTodo = () => {
        formDialogRef.current.handleOpen();
    }

    const confirmationDialogRef = useRef(null);
    const onDeleteTodo = () => {
        confirmationDialogRef.current.openDialog();
    }

    const deleteTodoRecord = (response) => {
        if (!response) {
            return;
        }

        deleteTodo(todoId);
    }

    return (
        <BaseComponent>
            <>
                <Card >
                    <CardHeader title='Todo details' />
                    <Divider />
                    <CardContent>
                        <div className={classes.root}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="taskId"
                                        fullWidth
                                        label="Id"
                                        defaultValue={todoData.id}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="taskName"
                                        label="Task name"
                                        fullWidth
                                        defaultValue={todoData.taskName}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="taskDescription"
                                        fullWidth
                                        multiline
                                        rows={15}
                                        rowsMax={25}
                                        label="Task description"
                                        defaultValue={todoData.taskDescription}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="createdAt"
                                        fullWidth
                                        label="Created at"
                                        defaultValue={todoData.createdAt}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </CardContent>
                    <CardActions disableSpacing className={classes.actionButtons}>
                        <Link to="/" className={classes.homeButton}>
                            <Button
                                variant="contained"
                                color="default"
                            >
                                Back to home
                            </Button>
                        </Link>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={onEditTodo}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={onDeleteTodo}
                        >
                            Delete
                        </Button>
                    </CardActions>
                </Card>
                <FormDialog
                    ref={formDialogRef}
                    action={{ editTodo }}
                    todo={todoData}
                    buttonType={'Edit'}
                    redirect={props.history}
                />
                <ConfirmationDialog
                    ref={confirmationDialogRef}
                    alertText={'Are you sure you want to delete this record?'}
                    onConfirm={deleteTodoRecord}
                    redirect={props.history}
                />
            </>
        </BaseComponent>
    );
}

export default withStyles(todoDetailStyles)(TodoDetails);
