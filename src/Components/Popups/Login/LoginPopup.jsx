import React from "react";
import "./LoginPopup.css";
import LoginForm from "../../Forms/LoginForm/LoginForm";
import PopupBanner from "../PopupBanner/PopupBanner";
import useProductContext from "../../../context/useProductContext";

const LoginPopup = () => {
  const { setSignupPopup } = useProductContext();

  return (
    <div className="login-popup">
      <LoginForm
        redirectSignup={() => {
          setSignupPopup(true);
        }}
      />
      <PopupBanner />
    </div>
  );
};

export default LoginPopup;