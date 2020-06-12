import React from 'react';
import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';

export default class ConfirmationDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
        };
    }

    openDialog = () => {
        this.setState({ isOpened: true });
    }

    closeDialog = () => {
        this.setState({ isOpened: false });
    }

    onYesButtonClick = () => {
        this.setState({ isOpened: false });
        this.props.onConfirm(true);

        if (this.props.redirect) {
            this.props.redirect.push('/');
        }
    }

    onNoButtonClick = () => {
        this.setState({ isOpened: false });
        this.props.onConfirm(false);
    }

    render() {
        return (
            <Dialog
                open={this.state.isOpened}
                onClose={this.closeDialog}
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
            >
                <DialogContent>
                    <h4>{this.props.alertText}</h4>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.onYesButtonClick}>
                        Yes
                    </Button>
                    <Button variant="contained" color="secondary" onClick={this.onNoButtonClick}>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
