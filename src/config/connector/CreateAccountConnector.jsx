// ─────────────────────────────────────────────────────────────
//  CreateAccountConnector.jsx
// ─────────────────────────────────────────────────────────────
import React              from "react";
import { useNavigate }    from "react-router-dom";
import CreateAccountPage  from "../../pages/Auth/CreateAccountPage";
import storeConfig        from "../store/storeConfig";

const CreateAccountConnector = () => {
  const navigate = useNavigate();
  return (
    <CreateAccountPage
      storeName={storeConfig.name}
      loading={false}
      onRegister={(data) => {
        console.log("Register →", data);
        navigate("/account");
      }}
      onLogin={()      => navigate("/login")}
      onLogoClick={()  => navigate("/")}
      onGoogle={() => {
        console.log("Google SSO register");
        navigate("/account");
      }}
    />
  );
};
export default CreateAccountConnector;
