import React, { useContext } from "react";
import { CognitoAuthUserContext } from "./auth/index";

function Dashboard() {
    const user = useContext(CognitoAuthUserContext);

    return (
        <div style={{ height: `calc(100vh - 64px)`, padding: "30px" }}>
            <h1>Dashboard</h1>
            <h2>Welcome, {user.attributes.given_name} !</h2>
        </div>
    );
}

export default Dashboard;
