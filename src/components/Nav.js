import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
    AppBar,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Menu,
    MenuItem,
} from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import styles from "../styles/styles";
import Login from "./auth/Login";
import Amplify from "aws-amplify";
import aws_exports from "../aws-exports";
import { CognitoAuthUserContext } from "../components/auth/index";
import { Auth } from 'aws-amplify';

Amplify.configure(aws_exports);

function Nav(props) {
    const history = useHistory();
    const classes = styles.useStyles();
    const [open, setLoginOpen] = React.useState(false);
    const user = useContext(CognitoAuthUserContext);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        setAnchorEl(null);

        Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err));
    };

    const handletoSignUp = () => {
        localStorage.setItem("willInit", "true");
        history.push("/register");
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLoginClose = () => {
        setLoginOpen(false);
    };

    return (
        <AppBar position="static" color="inherit" elevation={1}>
            <Toolbar>
                <Typography
                    variant="h6"
                    className={classes.title}
                    component={Link}
                    to="/"
                    style={{ textDecoration: "none" }}
                >
                    Logo
                </Typography>
                <>
                    {!user ? (
                        <>
                            <Button
                                onClick={handletoSignUp}
                                variant="contained"
                                color="secondary"
                            >
                                Sign up
                            </Button>
                            <Button
                                component={Link}
                                to="/login"
                                color="inherit"
                                style={{ marginLeft: "20px" }}
                            //onClick={handleLoginClickOpen}
                            >
                                Login
                            </Button>
                        </>
                    ) : (
                            <div>
                                <Button aria-controls="simple-menu" aria-haspopup="true" style={{ textTransform: "none" }} onClick={handleClick}>
                                    { user.attributes.given_name } { user.attributes.family_name } <ArrowDropDownIcon />
                                </Button>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleLogout}>&nbsp;&nbsp;&nbsp;&nbsp;Logout&nbsp;&nbsp;&nbsp;&nbsp;</MenuItem>
                                </Menu>
                            </div>
                        )}
                </>

                <Dialog
                    open={open}
                    //onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    <DialogContent>
                        <Login />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleLoginClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Toolbar>
        </AppBar>
    );
}

export default Nav;
