import React, { forwardRef, useRef, useState } from "react";
import styles from "./RegistrationForm.module.css";
import PhoneInput from "../PhoneInput/PhoneInput";
import {
  validateString,
  validatePasswords,
} from "../../utils/checkValidity/checkValidity";
import { createUser } from "../../utils/users/users";
import { useNavigate } from "react-router-dom";
import { saveUserToLocalStorage } from "../../utils/localStorage/usersToLS";

interface RegistrationFormProps {
  setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormData {
  surname: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  setIsRegistering,
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    surname: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{
    surname: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    surname: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isValid = true;
    const newErrors: {
      surname: string;
      name: string;
      phone: string;
      email: string;
      password: string;
      confirmPassword: string;
    } = {
      surname: "",
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    }; // объект с текстом ошибок

    // Валидация фамилии
    const surnameValidation = validateString(formData.surname, {
      required: true,
      minLength: 3,
      maxLength: 30,
    });
    if (!surnameValidation.isValid) {
      newErrors.surname = surnameValidation.errorMessage;
      isValid = false;
    }

    // Валидация имени
    const nameValidation = validateString(formData.name, {
      required: true,
      minLength: 3,
      maxLength: 30,
    });
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.errorMessage;
      isValid = false;
    }

    // Валидация номера телефона
    const phoneValidation = validateString(formData.phone, {
      required: true,
      pattern: /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
    });
    if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.errorMessage;
      isValid = false;
    }

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

    // Валидация подтверждения пароля
    const confirmPasswordValidation = validatePasswords(
      formData.password,
      formData.confirmPassword
    );
    if (!confirmPasswordValidation.isValid) {
      newErrors.confirmPassword = confirmPasswordValidation.errorMessage;
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      const newUser = {
        email: formData.email,
        password: formData.password,
        surname: formData.surname,
        name: formData.name,
        phoneNumber: formData.phone,
      };

      await createUser(newUser);

      const user = {
        name: newUser.name,
        surname: newUser.surname,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
      };

      saveUserToLocalStorage(user);

      navigate("/");
    }
  };

  const handleSignInClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsRegistering(false);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h1 className={styles.bigLabel}>Зарегистрироваться</h1>
      <div>
        <input
          className={styles.input}
          placeholder="Фамилия"
          name="surname"
          type="text"
          onBlur={handleBlur}
        />
        {errors.surname && <div className={styles.error}>{errors.surname}</div>}
      </div>
      <div>
        <input
          className={styles.input}
          placeholder="Имя"
          name="name"
          type="text"
          onBlur={handleBlur}
        />
        {errors.name && <div className={styles.error}>{errors.name}</div>}
      </div>
      <div>
        <PhoneInput className={styles.input} onBlur={handleBlur} />
        {errors.phone && <div className={styles.error}>{errors.phone}</div>}
      </div>
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
      <div>
        <input
          className={styles.input}
          placeholder="Повторите пароль"
          name="confirmPassword"
          type="password"
          onBlur={handleBlur}
        />
        {errors.confirmPassword && (
          <div className={styles.error}>{errors.confirmPassword}</div>
        )}
      </div>
      <button className={styles.button} type="submit">
        Зарегистрироваться
      </button>
      <p className={styles.label}>
        Уже зарегистрированы?{" "}
        <a className={styles.registrationLabel} onClick={handleSignInClick}>
          Войти
        </a>
      </p>
    </form>
  );
};

export default RegistrationForm;
