import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    error: {
        backgroundColor: fade(theme.palette.error.main, 0.2),
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.error.main}`,
        padding: theme.spacing(2),
    },
    success: {
        backgroundColor: fade(theme.palette.success.main, 0.2),
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.success.main}`,
        padding: theme.spacing(2),
    }
}));

function ErrorBlock(props) {
    const classes = useStyles();

    return (
        <>
            {props.className === 'error' ? (
                <div className={[classes.error, props.className].filter(Boolean).join(' ')}>
                    {typeof props.msg === 'string' ? props.msg : props.msg.message}
                </div>
            ) : (
                <div className={[classes.success, props.className].filter(Boolean).join(' ')}>
                    {typeof props.msg === 'string' ? props.msg : props.msg.message}
                </div>
            )}

            <br />
        </>
    );
};

export default ErrorBlock;
