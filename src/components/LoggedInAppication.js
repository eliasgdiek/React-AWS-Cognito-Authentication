import React, { useContext, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import DashBoard from "./Dashboard";
import Nav from "./Nav";
import CognitoAuthUserContext from "./auth/index";

function LoggedInApplication() {
    const user = useContext(CognitoAuthUserContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (user) setIsLoggedIn(true);
    }, [user, isLoggedIn]);

    return (
        <div>
            {isLoggedIn ? (
                <Router>
                    <Nav />

                    <div data-testid="main">
                        <Switch>
                            <Route exact path="/dashboard" component={DashBoard} />
                        </Switch>
                    </div>
                </Router>
            ) : (<Redirect to="/login" />

                )}
        </div>
    );
};

export default LoggedInApplication;
