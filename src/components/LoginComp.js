import { Button, withStyles } from "@material-ui/core";
import React, { useState } from "react";
import auth, { provider } from "../firebase";
import "../login.css";
import { useDispatch } from "react-redux";
import { storeUserData } from "../Redux/actionCreators";

function LoginComp() {
  const dispatch = useDispatch();
  const storeuser = (user) => {
    dispatch(storeUserData(user));
  };

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        storeuser(result);
      })
      .catch((er) => alert(er.message));
  };

  const StyledButton = withStyles({
    root: {
      "&:hover": {
        backgroundColor: "#009407",
        color: "#ffffff",
      },
    },
  })(Button);
  return (
    <div className="login">
      <div className="login__container">
        <img
          src={`https://i0.wp.com/cantinhodabrantes.com.br/wp-content/uploads/2017/08/whatsapp-logo-PNG-Transparent.png?fit=1000,1000&ssl=1`}
          alt=""
        />
        <div className="login__text">Sign in to ChatApp</div>
        <StyledButton onClick={signIn}>Sign in with Google</StyledButton>
      </div>
    </div>
  );
}

export default LoginComp;
