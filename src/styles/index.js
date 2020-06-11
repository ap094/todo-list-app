const baseComponentStyles = (theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    appName: {
        textDecoration: 'none',
        color: 'white'
    },
    addIconButton: {
        top: '10px',
        marginBottom: '50px'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
	toolbar: theme.mixins.toolbar,
});

const todoListStyles = () => ({
    addIconButton: {
        top: '10px',
        marginBottom: '50px'
    },
});

const tableStyles = () => ({
    button: {
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        marginLeft: '10px'
    }
});

const todoDetailStyles = () => ({
    root: {
        flexGrow: 1,
    },
    actionButtons: {
        marginTop: '20px',
        marginRight: '10px',
        float: 'right'
    },
    button: {
        marginRight: '10px'
    },
    homeButton: {
        textDecoration: 'none',
        color: 'black',
        marginRight: '10px'
    }
});

export {
    baseComponentStyles,
    todoListStyles,
    tableStyles,
    todoDetailStyles,
}
