import React from "react";
import CognitoAuthProvider from "./components/auth";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import "./App.css";
import styles from "./styles/styles";

function App() {
    const theme = styles.theme;

    return (
        <>
            <CssBaseline />
            <MuiThemeProvider theme={theme}>
                <CognitoAuthProvider></CognitoAuthProvider>
            </MuiThemeProvider>
        </>
    );
}

export default App;
