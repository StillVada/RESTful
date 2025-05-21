export interface ValidationResult {
  isValid: boolean;
  errorMessage: string;
}

export const validateString = (
  value: string,
  rules: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  }
): ValidationResult => {
  // Проверка на пустое значение
  const isEmpty = !value; // или value.length === 0

  if (rules.required && isEmpty) {
    return {
      isValid: false,
      errorMessage: "Это поле обязательно для заполнения.",
    };
  }

  // Если поле необязательное и пустое - сразу валидно
  if (!rules.required && isEmpty) {
    return { isValid: true, errorMessage: "" };
  }

  if (rules.minLength && value.length < rules.minLength) {
    return {
      isValid: false,
      errorMessage: `В этом поле должно быть не менее ${rules.minLength} символов.`,
    };
  }
  if (rules.maxLength && value.length > rules.maxLength) {
    return {
      isValid: false,
      errorMessage: `В этом поле должно быть не более ${rules.maxLength} символов.`,
    };
  }
  if (rules.pattern && !rules.pattern.test(value)) {
    return { isValid: false, errorMessage: "Неверный формат поля." };
  }
  return { isValid: true, errorMessage: "" };
};

export const validateNumber = (
  value: number | undefined | null, // Разрешаем undefined/null
  rules: {
    required?: boolean;
    moreThan?: number;
    lessThan?: number;
  }
): ValidationResult => {
  // Проверка на пустое значение (undefined/null/0)
  const isEmpty = value === undefined || value === null || value === 0;

  if (rules.required && isEmpty) {
    return {
      isValid: false,
      errorMessage: "Это поле обязательно для заполнения.",
    };
  }

  // Если поле необязательное и пустое - сразу валидно
  if (!rules.required && isEmpty) {
    return { isValid: true, errorMessage: "" };
  }

  // Проверки диапазонов только для заполненных значений
  if (rules.moreThan !== undefined && value! < rules.moreThan) {
    return {
      isValid: false,
      errorMessage: `Это значение должно быть не менее ${rules.moreThan}.`,
    };
  }

  if (rules.lessThan !== undefined && value! > rules.lessThan) {
    return {
      isValid: false,
      errorMessage: `Это значение должно быть не более ${rules.lessThan}.`,
    };
  }

  return { isValid: true, errorMessage: "" };
};

export const validatePasswords = (
  value1: string,
  value2: string
): ValidationResult => {
  if (value1 !== value2) {
    return { isValid: false, errorMessage: "Пароли не совпадают." };
  }
  return { isValid: true, errorMessage: "" };
};
