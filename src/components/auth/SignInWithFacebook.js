import React from 'react';
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        background: 'linear-gradient(to bottom,#4267B2 0,#3b5c9f 100%)',
        border: 'none',
        color: '#fff',
        height: 45,
        boxShadow: '',
        textTransform: 'capitalize',
        fontSize: '1rem',
        fontWeight: '700',
        position: "relative"
    },
    buttonIcon: {
        position: "absolute",
        left: "15px",
        top: "5px",
    },
}));

function SignInWithFaceBook(props) {
    const classes = useStyles();
    const { className, ...otherProps } = props;

    return (
        <Button
            className={[classes.root, className].filter(Boolean).join(' ')}
            type="button"
            fullWidth
            variant="contained"
            onClick={() =>
                Auth.federatedSignIn({
                    provider: CognitoHostedUIIdentityProvider.Facebook,
                })
            }
            {...otherProps}
        >
            <div className={classes.buttonIcon}>
                <svg className="Icon-image" width="37" height="37" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12" fill="#fff"></path>
                </svg>
            </div>
            <div>
                <span style={{ marginLeft: "25px" }}>
                    Sign in with Facebook
                </span>
            </div>
        </Button>
    );
};

export default SignInWithFaceBook;
