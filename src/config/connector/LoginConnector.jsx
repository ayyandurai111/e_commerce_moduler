// ─────────────────────────────────────────────────────────────
//  LoginConnector.jsx
// ─────────────────────────────────────────────────────────────
import React         from "react";
import { useNavigate } from "react-router-dom";
import LoginPage     from "../../pages/Auth/LoginPage";
import storeConfig   from "../store/storeConfig";

const LoginConnector = () => {
  const navigate = useNavigate();
  return (
    <LoginPage
      storeName={storeConfig.name}
      loading={false}
      onLogin={(data) => {
        console.log("Login →", data);
        navigate("/account");
      }}
      onSendOtp={(mobile) => {
        console.log("Send OTP to +91", mobile);
      }}
      onForgotPassword={() => {
        console.log("Forgot password flow");
      }}
      onCreateAccount={() => navigate("/register")}
      onLogoClick={()     => navigate("/")}
      onGoogle={() => {
        console.log("Google SSO login");
        navigate("/account");
      }}
    />
  );
};
export default LoginConnector;
