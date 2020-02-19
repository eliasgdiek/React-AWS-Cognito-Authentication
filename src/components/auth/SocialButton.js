import React from "react";
import SocialLogin from "react-social-login";

function SocialButton(props) {
  return (
    <button onClick={props.triggerLogin} {...props}>
      {props.children}
    </button>
  );
}

export default SocialLogin(SocialButton);
