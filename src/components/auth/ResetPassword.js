import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Auth } from "aws-amplify";
import {
    TextField,
    Button
} from "@material-ui/core";
// import LoaderButton from "./components/LoaderButton";
import { makeStyles } from '@material-ui/core/styles';
import AlertBlock from '../AlertBlock';

const useStyles = makeStyles(theme => ({
    root: {
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
        textAlign: "center",
    },
}));

export default function ResetPassword() {
    const classes = useStyles();

    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [codeSent, setCodeSent] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState("");

    function validateCodeForm() {
        return email.length > 0;
    }

    function validateResetForm() {
        return (
            code.length > 0 && password.length > 0 && password === confirmPassword
        );
    }

    const handleSendCodeClick = async event => {
        event.preventDefault();
        setError(undefined);

        try {
            await Auth.forgotPassword(email);
            setCodeSent(true);
        } catch (e) {
            setError(e.message);
        }
    };

    const handleConfirmClick = async event => {
        event.preventDefault();
        setError(undefined);
        // setIsConfirming(true);
        try {
            await Auth.forgotPasswordSubmit(email, code, password);
            setConfirmed(true);
        } catch (e) {
            setError(e.message);
            // setIsConfirming(false);
        }
    };

    function renderRequestCodeForm() {
        return (
            <form onSubmit={handleSendCodeClick}>
                <TextField
                    name="email"
                    type="email"
                    label="Email"
                    variant="outlined"
                    error={!!error}
                    fullWidth
                    margin="dense"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <br />
                <br />

                <Button
                    type="submit"
                    fullWidth
                    color="primary"
                    variant="contained"
                    disabled={!validateCodeForm()}
                >
                    Send Confirmation
                </Button>
                <br />
                <br />

                <p style={{ textAlign: "center" }}>
                    <Link className="show-link" to="/login">Back</Link>
                </p>
            </form>
        );
    }

    function renderConfirmationForm() {
        return (
            <form onSubmit={handleConfirmClick}>
                <TextField
                    name="code"
                    type="text"
                    label="Confirmation Code"
                    variant="outlined"
                    error={!!error}
                    fullWidth
                    margin="dense"
                    required
                    autoFocus
                    value={code}
                    onChange={e => setCode(e.target.value)}
                />
                <hr />
                <TextField
                    name="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    error={!!error}
                    fullWidth
                    margin="dense"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <TextField
                    name="confirmassword"
                    type="password"
                    label="Confirm Password"
                    variant="outlined"
                    error={!!error}
                    fullWidth
                    margin="dense"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
                <br />
                <br />

                <Button
                    type="submit"
                    fullWidth
                    color="primary"
                    variant="contained"
                    disabled={!validateResetForm()}
                >
                    Confirm
                </Button>
                <br />
                <br />

                <p style={{ textAlign: "center" }}>
                    <Link className="show-link" to="/login">Back</Link>
                </p>
            </form>
        );
    }

    function renderSuccessMessage() {
        return (
            <div className={classes.root}>
                {"Your password has been reset."}
            </div>
        );
    }
    return (
        <div className="Login">
            {error && <AlertBlock className="error" msg={error} />}
            {!codeSent
                ? renderRequestCodeForm()
                : !confirmed
                    ? renderConfirmationForm()
                    : renderSuccessMessage()}
        </div>
    );
}
