import React from "react";
import "./RegisterPopup.css";
import SignupForm from "../../Forms/RegisterForm/RegisterForm";
import PopupBanner from "../PopupBanner/PopupBanner";
import useProductContext from "../../../context/useProductContext";

const RegisterPopup = () => {
  const { setSignupPopup } = useProductContext();

  return (
    <div className="popup-register">
      <SignupForm
        redirectLogin={() => {
          setSignupPopup(false);
        }}
      />
      <PopupBanner />
    </div>
  );
};

export default RegisterPopup;