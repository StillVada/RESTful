import React, { forwardRef, useRef, useState, useEffect } from "react";
import styles from "./AuthorizationForm.module.css";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";

const AuthorizationForm = ({ register }: { register: boolean }) => {
  const [isRegistering, setIsRegistering] = useState(register);

  const handleToggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div>
      {isRegistering ? (
        <RegistrationForm setIsRegistering={setIsRegistering} />
      ) : (
        <LoginForm setIsRegistering={setIsRegistering} />
      )}
    </div>
  );
};

export default AuthorizationForm;
