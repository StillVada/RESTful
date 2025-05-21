import React, { useState, ChangeEvent, useRef, useEffect } from "react";

interface Props {
  defaultValue?: string;
  onValueChange?: (value: string) => void; // Callback для отслеживания изменений
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  className?: string;
}

const PhoneInput: React.FC<Props> = ({
  defaultValue = "",
  onValueChange,
  onBlur,
  className,
}) => {
  const [phoneValue, setPhoneValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Синхронизация значения defaultValue при изменении пропса defaultValue
    if (defaultValue !== phoneValue) {
      setPhoneValue(formatPhoneNumber(defaultValue));
    }
  }, [defaultValue]);

  useEffect(() => {
    if (onValueChange) {
      onValueChange(phoneValue); // Уведомляем родительский компонент об изменениях
    }
  }, [phoneValue, onValueChange]);

  const formatPhoneNumber = (value: string): string => {
    const cleanedValue = value.replace(/\D/g, ""); // Удаляем все нецифровые символы
    let formattedValue = "";

    if (cleanedValue.length > 0) {
      formattedValue = "+7 ";
      if (cleanedValue.length > 1) {
        formattedValue +=
          "(" + cleanedValue.substring(1, Math.min(4, cleanedValue.length));
        if (cleanedValue.length > 4) {
          formattedValue += ") ";
        }
      }
      if (cleanedValue.length > 4) {
        formattedValue += cleanedValue.substring(
          4,
          Math.min(7, cleanedValue.length)
        );
        if (cleanedValue.length > 7) {
          formattedValue += "-";
        }
      }
      if (cleanedValue.length > 7) {
        formattedValue +=
          cleanedValue.substring(7, Math.min(9, cleanedValue.length)) + "-";
      }
      if (cleanedValue.length > 9) {
        formattedValue += cleanedValue.substring(
          9,
          Math.min(11, cleanedValue.length)
        );
      }
    }

    // Clean up trailing characters if the user is deleting
    if (value.length < phoneValue.length) {
      if (value === "") {
        return "";
      }
      if (formattedValue.endsWith("+7 ")) {
        formattedValue = formattedValue.slice(0, -1);
      }

      if (formattedValue.endsWith("-")) {
        formattedValue = formattedValue.slice(0, -1);
      }
      if (formattedValue.endsWith(") ")) {
        formattedValue = formattedValue.slice(0, -2);
      }
    }
    return formattedValue;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const formattedValue = formatPhoneNumber(inputValue);
    setPhoneValue(formattedValue);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedValue = event.clipboardData.getData("text");
    const formattedValue = formatPhoneNumber(pastedValue);
    setPhoneValue(formattedValue);
  };

  return (
    <input
      type="tel"
      name="phone"
      value={phoneValue}
      onBlur={onBlur}
      onChange={handleChange}
      onPaste={handlePaste}
      placeholder="+7 (___) ___-__-__"
      ref={inputRef}
      className={className}
    />
  );
};

export default PhoneInput;
