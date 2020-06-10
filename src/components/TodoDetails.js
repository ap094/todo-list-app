import React, { useRef, useContext } from 'react';
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
import { useParams, Link } from "react-router-dom";
import { todoDetailStyles } from '../styles/styles';
import FormDialog from './dialogs/FormDialog';
import ConfirmationDialog from './dialogs/ConfirmationDialog';
import { TodoContext } from '../context/TodosProvider';
import Home from './Home';

function TodoDetails({ classes, ...props }) {
    const { todoId } = useParams();
    const { getTodo, editTodo, deleteTodo } = useContext(TodoContext);
    const todoDetails = getTodo(todoId)
    const { id, taskName, taskDescription, createdAt } = todoDetails;

    const formDialogRef = useRef(null);
    const confirmationDialogRef = useRef(null);

    const onEditTodo = () => {
        formDialogRef.current.handleOpen();
    }

    const onDeleteTodo = () => {
        confirmationDialogRef.current.openDialog();
    }

    const deleteTodoRecord = (response) => {
        if (!response) {
            return;
        }

        deleteTodo(id);
    }

    return (
        <Home>
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
                                        defaultValue={id}
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
                                        defaultValue={taskName}
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
                                        defaultValue={taskDescription}
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
                                        defaultValue={createdAt}
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
                    actions={{ editTodo }}
                    buttonType={'Edit'}
                    todo={todoDetails}
                />
                <ConfirmationDialog
                    ref={confirmationDialogRef}
                    alertText={'Are you sure you want to delete this record?'}
                    onConfirm={deleteTodoRecord}
                    redirect={props.history}
                />
            </>
        </Home>
    );
}

export default withStyles(todoDetailStyles)(TodoDetails);
