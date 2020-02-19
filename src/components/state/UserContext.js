import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = props => {
    const [user, setUser] = useState({
        email: null,
        name: null,
        details: null,
        isLoggedIn: false
    });

    /*const handleLogInSuccess = data => {
      setUser({ user: { ...user, details: data, isLoggedIn: true } });
      //setUserLoggedIn(true);
    };*/

    /*const handleLogInFailure = err => {
      setError(err);
      setUserLoggedIn(false);
    };*/

    /*const handleSignUp = () => {
      setUserSignedUp(true);
    };*/

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
};

//const [isUserLoggedIn, setUserLoggedIn] = useState(false);
//const [isUserSignedUp, setUserSignedUp] = useState(false);
//const [userDetails, setUserDetails] = useState({});
//const [error, setError] = useState("");
//const [user, setUser] = useContext(UserContext);
