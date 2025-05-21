import React from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./AuthPage.module.css";
import AuthorizationForm from "../../components/AuthorizationForm/AuthorizationForm";
const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const isRegistering = searchParams.get("mode") === "register";
  return (
    <div className={styles.page}>
      <AuthorizationForm register={isRegistering} />
    </div>
  );
};

export default AuthPage;
