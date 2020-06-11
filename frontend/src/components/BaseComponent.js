import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, CssBaseline, Toolbar, Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { baseComponentStyles } from '../styles';

function BaseComponent({ classes, children  }) {
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Link to="/" className={classes.appName}>
                        <Typography variant="h6" noWrap>
                            Todo List App
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>

            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    );
}

export default withStyles(baseComponentStyles)(BaseComponent);
