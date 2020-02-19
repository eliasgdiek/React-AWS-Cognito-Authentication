import React from "react";
import { Grid, Paper } from "@material-ui/core";
import Login from "./auth/Login";
import styles from "../styles/styles";

function LoginPage() {
  const classes = styles.useStyles();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      style={{ minHeight: `calc(100vh - 65px)` }}
    >
      <Grid item xs={12}>
        <Paper
          className={classes.paperWideMargin}
          elevation={2}
          style={{ width: "500px" }}
        >
          <Login />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
