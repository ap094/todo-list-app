const todoListStyles = (theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    addIconButton: {
		position: 'fixed',
		bottom: 0,
		right: 0
    },
    addIconButtonSize: {
        fontSize: 60,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
	toolbar: theme.mixins.toolbar,

});

export {
    todoListStyles,
}
