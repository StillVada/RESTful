import React, { forwardRef, useRef, useState } from "react";
import styles from "./LoginForm.module.css";
import { fetchHashPassword, fetchUser } from "../../utils/users/users";
import { validateString } from "../../utils/checkValidity/checkValidity";
import { useNavigate } from "react-router-dom";
import { saveUserToLocalStorage } from "../../utils/localStorage/usersToLS";

interface LoginFormProps {
  setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ setIsRegistering }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let isValid = true;
    const newErrors: {
      email: string;
      password: string;
    } = {
      email: "",
      password: "",
    }; // объект с текстом ошибок

    // Валидация почты
    const emailValidation = validateString(formData.email, {
      required: true,
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/,
      minLength: 3,
      maxLength: 50,
    });
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.errorMessage;
      isValid = false;
    }

    // Валидация пароля
    const passwordValidation = validateString(formData.password, {
      required: true,
      minLength: 3,
      maxLength: 30,
    });
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.errorMessage;
      isValid = false;
    }

    if (isValid) {
      const newPassword = await fetchHashPassword(formData.password);

      const userResponse = await fetchUser(formData.email);

      if (userResponse.isSuccess && userResponse.result) {
        if (userResponse.result.password === newPassword) {
          // Если пароль совпадает, то авторизируем пользователя
          const user = {
            name: userResponse.result.name,
            surname: userResponse.result.surname,
            email: userResponse.result.email,
            phoneNumber: userResponse.result.phoneNumber,
          };
          saveUserToLocalStorage(user);
          navigate("/");
          console.log("Успешный вход");
        } else {
          console.log("Пароль неверный!");
          newErrors.password = "Пароль не верный";
        }
      } else {
        newErrors.email = "Пользователь не найден";
        console.log("Пользователь не найден или ошибка");
      }
      setErrors(newErrors);
    }
  };

  const handleRegistrationClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    setIsRegistering(true);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h1 className={styles.bigLabel}>Войти</h1>
      <div>
        <input
          className={styles.input}
          placeholder="Почта"
          name="email"
          type="text"
          onBlur={handleBlur}
        />
        {errors.email && <div className={styles.error}>{errors.email}</div>}
      </div>
      <div>
        <input
          className={styles.input}
          placeholder="Пароль"
          name="password"
          type="password"
          onBlur={handleBlur}
        />
        {errors.password && (
          <div className={styles.error}>{errors.password}</div>
        )}
      </div>
      <button className={styles.button} type="submit">
        Войти
      </button>
      <p className={styles.label}>
        Ещё нет аккаунта?{" "}
        <a
          className={styles.registrationLabel}
          onClick={handleRegistrationClick}
        >
          Зарегистрироваться
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
