import React, { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { removeUserFromLocalStorage } from "../../utils/localStorage/usersToLS";

const Header = ({ name, surname }: { name?: string; surname?: string }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    removeUserFromLocalStorage();
    navigate("/auth?mode=login"); // Перенаправляем на страницу входа
  };

  return (
    <div className={styles.header} ref={dropdownRef}>
      <ul className={styles.headerList}>
        <li className={styles.headerElements}>
          <Link to="/" className={styles.logo}>
            MagicVilla
          </Link>
          <Link to="/villasApi" className={styles.grayText}>
            Виллы
          </Link>
          <Link to="/villaNumberApi" className={styles.grayText}>
            Номера
          </Link>
        </li>
        {name !== undefined && surname !== undefined ? (
          <li className={styles.userMenu}>
            <div
              className={styles.user}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {surname} {name}
            </div>
            <div
              className={`${styles.dropdown} ${
                isDropdownOpen ? styles.open : ""
              }`}
            >
              <button className={styles.dropdownItem} onClick={handleLogout}>
                Выйти
              </button>
            </div>
          </li>
        ) : (
          <li className={styles.headerElements}>
            <Link to="/auth?mode=login" className={styles.blueText}>
              Войти
            </Link>
            <Link to="/auth?mode=register" className={styles.blueText}>
              Зарегистрироваться
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
