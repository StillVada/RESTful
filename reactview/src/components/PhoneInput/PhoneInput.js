"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const PhoneInput = ({ defaultValue = "", onValueChange, onBlur, className, }) => {
    const [phoneValue, setPhoneValue] = (0, react_1.useState)(defaultValue);
    const inputRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        // Синхронизация значения defaultValue при изменении пропса defaultValue
        if (defaultValue !== phoneValue) {
            setPhoneValue(formatPhoneNumber(defaultValue));
        }
    }, [defaultValue]);
    (0, react_1.useEffect)(() => {
        if (onValueChange) {
            onValueChange(phoneValue); // Уведомляем родительский компонент об изменениях
        }
    }, [phoneValue, onValueChange]);
    const formatPhoneNumber = (value) => {
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
                formattedValue += cleanedValue.substring(4, Math.min(7, cleanedValue.length));
                if (cleanedValue.length > 7) {
                    formattedValue += "-";
                }
            }
            if (cleanedValue.length > 7) {
                formattedValue +=
                    cleanedValue.substring(7, Math.min(9, cleanedValue.length)) + "-";
            }
            if (cleanedValue.length > 9) {
                formattedValue += cleanedValue.substring(9, Math.min(11, cleanedValue.length));
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
    const handleChange = (event) => {
        const inputValue = event.target.value;
        const formattedValue = formatPhoneNumber(inputValue);
        setPhoneValue(formattedValue);
    };
    const handlePaste = (event) => {
        event.preventDefault();
        const pastedValue = event.clipboardData.getData("text");
        const formattedValue = formatPhoneNumber(pastedValue);
        setPhoneValue(formattedValue);
    };
    return ((0, jsx_runtime_1.jsx)("input", { type: "tel", name: "phone", value: phoneValue, onBlur: onBlur, onChange: handleChange, onPaste: handlePaste, placeholder: "+7 (___) ___-__-__", ref: inputRef, className: className }));
};
exports.default = PhoneInput;
