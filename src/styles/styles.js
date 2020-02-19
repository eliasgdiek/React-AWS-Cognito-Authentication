import { colors } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import { makeStyles } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";

function styles() {
    this.theme = createMuiTheme({
        palette: {
            primary: colors.white,
            secondary: blue,
            success: green
        },
        status: {
            danger: "orange"
        }
    });

    this.greenTheme = createMuiTheme({
        palette: {
            primary: green,
            secondary: red
        },
        status: {
            danger: "orange"
        }
    });

    this.useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
            "& > *": {
                margin: theme.spacing(1)
            }
        },
        menuButton: {
            margin: theme.spacing(1)
        },
        title: {
            flexGrow: 1
        },
        paper: {
            padding: theme.spacing(5)
            //height: 500
        },
        paperWideMargin: {
            paddingLeft: theme.spacing(10),
            paddingRight: theme.spacing(10),
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(5),
            //margin: theme.spacing(15),
            marginTop: theme.spacing(5),
            borderRadius: 10
        },
        control: {
            padding: theme.spacing(2)
        }
    }));
}

export default new styles();
