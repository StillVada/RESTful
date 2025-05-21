"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUserFromLocalStorage = exports.saveUserToLocalStorage = exports.getUserFromLocalStorage = void 0;
// Функция для получения юзера из localStorage
const getUserFromLocalStorage = () => {
    try {
        const userString = localStorage.getItem("user");
        return userString ? JSON.parse(userString) : null;
    }
    catch (error) {
        console.error("Ошибка при получении пользователя из localStorage:", error);
        return null;
    }
};
exports.getUserFromLocalStorage = getUserFromLocalStorage;
// Функция для сохранения юзера в localStorage
const saveUserToLocalStorage = (user) => {
    try {
        localStorage.setItem("user", JSON.stringify(user));
    }
    catch (error) {
        console.error("Ошибка при сохранении пользователя в localStorage:", error);
    }
};
exports.saveUserToLocalStorage = saveUserToLocalStorage;
// Функция для удаления юзера из localStorage
const removeUserFromLocalStorage = () => {
    try {
        localStorage.removeItem("user");
    }
    catch (error) {
        console.error("Ошибка при удалении пользователя из localStorage:", error);
    }
};
exports.removeUserFromLocalStorage = removeUserFromLocalStorage;
