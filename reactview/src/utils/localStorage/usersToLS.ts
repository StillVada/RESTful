interface User {
  surname: string;
  name: string;
  phoneNumber: string;
  email: string;
}

// Функция для получения юзера из localStorage
const getUserFromLocalStorage = (): User | null => {
  try {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  } catch (error: any) {
    console.error("Ошибка при получении пользователя из localStorage:", error);
    return null;
  }
};

// Функция для сохранения юзера в localStorage
const saveUserToLocalStorage = (user: User): void => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error: any) {
    console.error("Ошибка при сохранении пользователя в localStorage:", error);
  }
};

// Функция для удаления юзера из localStorage
const removeUserFromLocalStorage = (): void => {
  try {
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Ошибка при удалении пользователя из localStorage:", error);
  }
};

export {
  getUserFromLocalStorage,
  saveUserToLocalStorage,
  removeUserFromLocalStorage,
};
