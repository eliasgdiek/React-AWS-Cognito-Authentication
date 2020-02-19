import React, { useState, useContext, useEffect } from "react";
import {
    Button,
    TextField,
    Container,
    Grid,
    MuiThemeProvider,
    Divider
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";
import styles from "../../styles/styles";
import AlertBlock from '../AlertBlock';
import SignInWithGoogle from './SignInWithGoogle';
import SignInWithFaceBook from './SignInWithFacebook';
import { makeStyles } from '@material-ui/core/styles';
import { CognitoAuthUserContext } from "../auth/index";

const useStyles = makeStyles((theme) => ({
    googleButton: {
        marginTop: theme.spacing(4),
    },
    facebookButton: {
        marginTop: theme.spacing(4),
    },
}));

function Login(props) {
    const classes = useStyles();

    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(true);
    const [code, setCode] = useState(undefined);
    const [codeErr, setCodeErr] = useState(undefined);
    const [success, setSuccess] = useState(undefined);

    const user = useContext(CognitoAuthUserContext);
    const [error, setError] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        setError(undefined);
        Auth.signIn({ username: email, password })
        .catch(err => {
            setError(err);
            if(err.message === "User is not confirmed.") {
                setIsConfirmed(false);
            }
        });
    }

    const handleConfirm = () => {
        console.log("confirming...");
        setSuccess(undefined);
        setError(undefined);

        Auth.confirmSignUp(email, code, {
            forceAliasCreation: true
        })
        .then(res => {
            console.log('confirmed');
            Auth.signIn({ username: email, password })
                .catch(err => {
                    setSuccess(undefined);
                    setError(err);
                    if(err.message == "Incorrect username or password.") {
                        setIsConfirmed(true);
                    }
                });
        })
        .catch(err => {
            setSuccess(undefined);
            setError(err);
        });
    }

    const resendConfirmCode = () => {
        Auth.resendSignUp(email).then(() => {
            setError(undefined);
            setCodeErr(undefined);
            setSuccess('Code resent successfully!');
        }).catch(err => {
            setSuccess(undefined);
            setError(err);
        });
    }

    const onKeyDown = (e) => {
        if(e.key === 'Enter') {
            handleConfirm();
        }
    }

    useEffect(() => {
        if (user) setIsLoggedIn(true);
    }, [user]);

    return (
        <div>
            {isLoggedIn ? (
                <Redirect to="/dashboard" />
            ) : isConfirmed ? (
                <form onSubmit={handleSubmit}>
                    <Container style={{ padding: 0 }}>
                        {error && <AlertBlock className="error" msg={error} />}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="email"
                                    label="Email"
                                    error={!!error}
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                    margin="dense"
                                    required
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="password"
                                    label="Password"
                                    error={!!error}
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    margin="dense"
                                    required
                                    onChange={e => setPassword(e.target.value)}
                                />

                                {props.error && (
                                    <span className="error">{props.error.message}</span>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <MuiThemeProvider theme={styles.greenTheme}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        color="primary"
                                        style={{ color: "white" }}
                                        variant="contained"
                                    >
                                        Login
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider></Divider>
                            </Grid>
                            <Grid item xs={12}>
                                <div style={{textAlign: "center"}}>
                                    Don't have a account?{" "}
                                    <Link className="show-link" to="/register">
                                        Sign up here
                                    </Link>
                                </div>
                                <br />
                                <div style={{textAlign: "center"}}>
                                    Forgot password?{" "}
                                    <Link className="show-link" to="/reset-password">
                                        Reset it Here
                                    </Link>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider></Divider>
                            </Grid>
                            <Grid item xs={12}>
                                <SignInWithFaceBook className={classes.facebookButton} />
                                <SignInWithGoogle className={classes.googleButton} />
                            </Grid>
                        </Grid>
                    </Container>
                </form>
            ) : (
                <Container style={{ padding: 0 }}>
                    {success && <AlertBlock className="success" msg={success} />}
                    {error && <AlertBlock className="error" msg={error} />}
                    {codeErr && <AlertBlock className="error" msg={codeErr} />}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="code"
                                label="Confirmation Code"
                                error={!!codeErr}
                                type="text"
                                variant="outlined"
                                fullWidth
                                margin="dense"
                                required
                                onKeyDown={e => onKeyDown(e)}
                                onChange={e => setCode(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="button"
                                fullWidth
                                color="primary"
                                style={{ color: "white" }}
                                variant="contained"
                                onClick={handleConfirm}
                            >
                                Confirm
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider></Divider>
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{textAlign: "center"}}>
                                <Link className="show-link" to="#" onClick={resendConfirmCode}>
                                    Resend
                                </Link>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{textAlign: "center"}}>
                                <Link className="show-link" to="#" onClick={e => setIsConfirmed(true)}>
                                    Back
                                </Link>
                            </div>
                            <br />
                        </Grid>
                    </Grid>
                </Container>
            )}
        </div>
    );
}

export default Login;
