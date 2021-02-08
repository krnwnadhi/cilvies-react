import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

export default function PositionedSnackbar(props) {
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;

    const handleClick = (newState) => () => {
        setState({ open: true, ...newState });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const buttons = (
        <React.Fragment>
            <Button size="small" style={{ color: "white" }} onClick={handleClick({ vertical: 'top', horizontal: 'center' })}>{props.messageButton}</Button>
        </React.Fragment>
    );

    return (
        <div>
            {buttons}
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message={props.message}
                key={vertical + horizontal}
                autoHideDuration={2000}
            >
            </Snackbar>
        </div>
    );
}
