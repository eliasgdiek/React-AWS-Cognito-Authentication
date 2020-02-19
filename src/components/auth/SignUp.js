import React, { useState,useEffect  } from "react";
import {
    Button,
    TextField,
    MuiThemeProvider,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import {
    isPasswordValidate,
    isEmailValidate,
} from "./constant/helper";
import styles from "../../styles/styles";
import AlertBlock from '../AlertBlock';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles();

export default function Login(props) {
    const classes = useStyles();

    useEffect(() => {
        if(localStorage.getItem('willInit') === "true") {
            setVerified(false);
            setEmail(undefined);
            setPassword(undefined);
            setFirstName(undefined);
            setLastName(undefined);
            setError(undefined);
            setConfirmationCode(undefined);
        }
    }, [localStorage.getItem('willInit')]);

    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [firstName, setFirstName] = useState(undefined);
    const [lastName, setLastName] = useState(undefined);
    const [verified, setVerified] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [codeErr, setCodeErr] = useState(undefined);

    const validateForm = () => {
        const validateEmail = isEmailValidate(email);
        if (validateEmail && validateEmail.hasError) return false;
        const ValidatePassword = isPasswordValidate(password);
        if (ValidatePassword && ValidatePassword.hasError) return false;
        return true;
    }
    const signUp = () => {
        localStorage.setItem("willInit", "false");

        Auth.signUp({
            username: email,
            password: password,
            attributes: {
                email: email,
                given_name: firstName,
                family_name: lastName,
            },
        })
        .then(res => {
            setVerified(true);
        })
        .catch(err => {
            setError(err);
        });
    };

    const confirmSignUp = () => {
        setError(undefined);
        setCodeErr(undefined);
        Auth.confirmSignUp(email, confirmationCode, {
            forceAliasCreation: true
        })
        .then(res => {
            Auth.signIn({ username: email, password })
                .catch(err => {
                    setError(err);
                });
        })
        .catch(err => setCodeErr(err));
    };

    const handleSubmit = e => {
        e.preventDefault();
        setError(undefined);
        setCodeErr(undefined);
        if (verified) {
            console.log('verified');
            confirmSignUp();
        } else {
            signUp();
        }
    };

    if (verified) {
        return (
            <div className="confirm-code">
                {codeErr && <AlertBlock className="error" msg={codeErr} />}
                <TextField
                    name="confirmationCode"
                    type="number"
                    label="Confirmation Code"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    required
                    error={!!codeErr}
                    onChange={e => setConfirmationCode(e.target.value)}
                />
                <br />
                <br />

                <Button
                    type="button"
                    fullWidth
                    color="primary"
                    style={{ color: "white" }}
                    variant="contained"
                    onClick={confirmSignUp}
                >
                    Confirm Sign up
                </Button>
            </div>
        );
    } else {
        return (
            <div className="Login">
                {error && <AlertBlock className="error" msg={error} />}
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="firstName"
                        type="text"
                        error={!!error}
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        required
                        margin="dense"
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <br />
                    <br />

                    <TextField
                        name="lastName"
                        type="text"
                        error={!!error}
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        required
                        margin="dense"
                        onChange={e => setLastName(e.target.value)}
                    />
                    <br />
                    <br />

                    <TextField
                        name="email"
                        type="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        error={!!error}
                        required
                        margin="dense"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <br />
                    <br />

                    <TextField
                        name="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        error={!!error}
                        fullWidth
                        required
                        margin="dense"
                        onChange={e => setPassword(e.target.value)}
                    />
                    {props.error && <span className="error">{props.error.message}</span>}
                    <br />
                    <br />

                    <MuiThemeProvider theme={styles.greenTheme}>
                        <Button
                            disabled={!validateForm()}
                            type="submit"
                            fullWidth
                            color="primary"
                            style={{ color: "white" }}
                            variant="contained"
                        >
                            SignUp
                        </Button>
                    </MuiThemeProvider>
                    <br />
                    <br />

                    <p style={{ textAlign: "center" }}>
                        Already have an account? <Link className="show-link" to="/login">Sign in here</Link>
                    </p>
                </form>
            </div>
        );
    }
}
