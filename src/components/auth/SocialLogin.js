import React from "react";
import { Grid } from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
// import SocialButton from "./SocialButton";
import FacebookLogin from "react-facebook-login";
// import TwitterLoginButton from "react-twitter-auth/lib/react-twitter-auth-component.js";
// import TwitterLogin from "react-twitter-login";
// import Auth from "aws-amplify";
import { google, facebook } from "./constant/credential";

export default function Index(props) {
    // const [isSignedIn, setSignIn] = useState(false);
    // const [userDetail, setUserDetail] = useState({});
    const customHeader = {};

    customHeader["Test"] = "test-header";

    const handleSocialLogin = user => {
        props.handleLogInSuccess(user);
    };

    // const onSuccess = response => {
    //     response.json().then(body => {
    //         handleSocialLogin(body);
    //         console.log(JSON.stringify(body));
    //     });
    // };

    // const onFailed = error => {
    //     handleSocialLoginFailure(error);
    // };

    const handleSocialLoginFailure = err => {
        props.handleLogInFailure(err.error);
    };
    const responseFacebook = response => {
        response.name && handleSocialLogin(response);
    };

    // const authHandler = (err, data) => {
    //     console.log(err, data);
    //     if (data) {
    //         handleSocialLogin(data);
    //     }
    // };

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <FacebookLogin
                        appId={facebook.appId}
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={responseFacebook}
                        className={"social-login social-facebook"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <GoogleLogin
                        clientId={google.clientId}
                        buttonText="Continue with Google"
                        onSuccess={handleSocialLogin}
                        onFailure={handleSocialLoginFailure}
                        cookiePolicy={"single_host_origin"}
                        className={"social-login social-google"}
                    />
                </Grid>
                {/*<Grid item xs={12}>
                <TwitterLogin
                    authCallback={authHandler}
                    consumerKey={twitter.consumerKey}
                    consumerSecret={twitter.consumerSecret}
                    callbackUrl={window.location.href.replace(/\/$/, "")}
                    className={"social-login social-twitter"}
                    customButton={true}
                >
                    <div className="btn btn-twitter btn-lg social-twitter">
                    <i className="fa fa-twitter fa-fw"></i> Login With Twitter
                    </div>
                </TwitterLogin>
                </Grid>*/}
            </Grid>
        </div>
    );
}
