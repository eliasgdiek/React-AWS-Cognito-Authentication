import React, { useEffect, useState, createContext } from "react";
import Nav from "../Nav";
import LoginPage from "../LoginPage";
import HomePage from "../HomePage";
import RegisterPage from "../RegisterPage";
import ResetPasswordPage from "../ResetPasswordPage";
import DashBoard from "../Dashboard";

import { MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import "../../App.css";
import styles from "../../styles/styles";
import { Auth, Hub } from 'aws-amplify';

export const CognitoAuthUserContext = createContext(undefined);

function CognitoAuthProvider(props) {
    let [user, setUser] = useState(undefined);
    const theme = styles.theme;

    useEffect(() => {
        const updateUser = async (authState) => {
            try {
                const user = await Auth.currentAuthenticatedUser();
                setUser(user);
            } catch (error) {
                setUser(undefined);
            }
        };
        Hub.listen('auth', updateUser); // listen for login/signup events

        updateUser(); // check manually the first time because we won't get a Hub event
        return () => Hub.remove('auth', updateUser); // cleanup
    }, []);

    return (
        <CognitoAuthUserContext.Provider value={user}>
            { user ? (
                <Router>
                    <CssBaseline />
                    <MuiThemeProvider theme={theme}>
                        <Nav />
                        <Switch>
                            <Route path="/dashboard" exact default component={DashBoard} />
                            <Redirect to='/dashboard' />
                        </Switch>
                    </MuiThemeProvider>
                </Router>
            ) : (
                <Router>
                    <CssBaseline />
                    <MuiThemeProvider theme={theme}>
                        <Nav />
                        <Switch>
                            <Route path="/" exact component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage}/>
                            <Route path="/reset-password" component={ResetPasswordPage} />
                            <Redirect to='/login' />
                        </Switch>
                    </MuiThemeProvider>
                </Router>
            )}
        </CognitoAuthUserContext.Provider>
    );
}

export default CognitoAuthProvider;
