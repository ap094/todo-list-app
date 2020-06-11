import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
} from '@material-ui/core';

export default class FormDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogOpened: false,
            formFields: {
                taskName: '',
                taskDescription: '',
            },
            errors: {
                taskName: '',
                taskDescription: '',
            },
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.todo !== prevProps.todo) {
            this.setState({
                formFields: {
                    taskName: this.props.todo.taskName,
                    taskDescription: this.props.todo.taskDescription,
                },
            })
        }
    }

    handleOpen = () => {
        this.setState({ isDialogOpened: true });

        if (
            this.props.todo
            && this.state.formFields.taskName === ''
            && this.state.formFields.taskDescription === ''
        ) {
            this.setState({
                formFields: {
                    taskName: this.props.todo.taskName,
                    taskDescription: this.props.todo.taskDescription,
                },
            })

            return;
        }

        this.setState({
            formFields: {
                taskName: '',
                taskDescription: '',
            },
        })
    }

    handleClose = () => {
        this.setState({ isDialogOpened: false });
    };

    handleChange = (event) => {
        this.setState({
            formFields: {
                ...this.state.formFields,
                [event.target.name]: event.target.value
            }
        });
    }

    isFormValid = (formFields) => {
        let isValid = true;
        let errorMessages = {};

        if (formFields.taskName === '') {
            errorMessages.taskName = 'Field is required';
            isValid = false;
        }

        if (formFields.taskDescription === '') {
            errorMessages.taskDescription = 'Field is required';
            isValid = false;
        }

        this.setState({
            errors: {
                ...errorMessages
            }
        });

        return isValid;
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (!this.isFormValid(this.state.formFields)) {
            return;
        }

        this.setState({ isDialogOpened: false });

        if (this.props.buttonType === 'Add') {
            this.props.action.addTodo({
                taskName: this.state.formFields.taskName,
                taskDescription: this.state.formFields.taskDescription,
            });
        } else {
            this.props.action.editTodo({
                ...this.props.todo,
                taskName: this.state.formFields.taskName,
                taskDescription: this.state.formFields.taskDescription,
            });

            if (this.props.redirect) {
                this.props.redirect.push('/');
            }
        }
    };

    render() {
        return (
            <Dialog
                open={this.state.isDialogOpened}
                onClose={this.handleClose}
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
            >
                <DialogTitle id="form-dialog-title">
                    {this.props.buttonType === 'Edit' ? 'Edit Todo' : 'Create a new todo'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="taskName"
                                label="Todo Name"
                                name="taskName"
                                autoComplete="taskName"
                                helperText={this.state.errors.taskName}
                                error={this.state.errors.taskName ? true : false}
                                value={this.state.formFields.taskName}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="taskDescription"
                                label="Todo Description"
                                name="taskDescription"
                                autoComplete="taskDescription"
                                multiline
                                rows={15}
                                rowsMax={25}
                                helperText={this.state.errors.taskDescription}
                                error={this.state.errors.taskDescription ? true : false}
                                value={this.state.formFields.taskDescription}
                                onChange={this.handleChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="secondary" variant="contained">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary" variant="contained">
                        {this.props.buttonType === 'Edit' ? 'Save' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
