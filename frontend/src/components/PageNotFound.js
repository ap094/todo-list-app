import React from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { pageNotFoundStyles } from '../styles';
import BaseComponent from './BaseComponent';

function PageNotFound({ classes }) {
    return (
        <BaseComponent>
            <div className={classes.pageNotFound}>
                <p>Page not found!</p>
                <Link to="/">
                    Go to home page
                </Link>
            </div>
        </BaseComponent>
    );
}

export default withStyles(pageNotFoundStyles)(PageNotFound);
