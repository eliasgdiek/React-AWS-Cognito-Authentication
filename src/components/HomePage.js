import React from "react";
import { Paper, Box, Grid, Button, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import styles from "../styles/styles";

function HomePage() {
  const classes = styles.useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container spacing={0} margin={1}>
          <Grid item xs={8}>
            <Paper className={classes.paper} elevation={1}></Paper>
          </Grid>
          <Grid item xs>
            <Paper
              className={classes.paper}
              elevation={1}
              style={{ minHeight: `calc(100vh - 65px)` }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h5"
                      className={classes.title}
                      align="center"
                      padding="5"
                    >
                      Join an event
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="filled-required"
                      label="Enter an event code"
                      defaultValue=""
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button fullWidth variant="contained" color="secondary">
                      Join
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography align="center" padding="5">
                      By using Fora, you agree to abide by our Terms and
                      Conditions
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default HomePage;
