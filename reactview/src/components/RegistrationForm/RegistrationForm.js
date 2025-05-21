"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const RegistrationForm_module_css_1 = __importDefault(require("./RegistrationForm.module.css"));
const PhoneInput_1 = __importDefault(require("../PhoneInput/PhoneInput"));
const checkValidity_1 = require("../../utils/checkValidity/checkValidity");
const users_1 = require("../../utils/users/users");
const react_router_dom_1 = require("react-router-dom");
const usersToLS_1 = require("../../utils/localStorage/usersToLS");
const RegistrationForm = ({ setIsRegistering, }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [formData, setFormData] = (0, react_1.useState)({
        surname: "",
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = (0, react_1.useState)({
        surname: "",
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const handleBlur = (e) => {
        const { name, value } = e.target;
        setFormData(Object.assign(Object.assign({}, formData), { [name]: value }));
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        let isValid = true;
        const newErrors = {
            surname: "",
            name: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
        }; // объект с текстом ошибок
        // Валидация фамилии
        const surnameValidation = (0, checkValidity_1.validateString)(formData.surname, {
            required: true,
            minLength: 3,
            maxLength: 30,
        });
        if (!surnameValidation.isValid) {
            newErrors.surname = surnameValidation.errorMessage;
            isValid = false;
        }
        // Валидация имени
        const nameValidation = (0, checkValidity_1.validateString)(formData.name, {
            required: true,
            minLength: 3,
            maxLength: 30,
        });
        if (!nameValidation.isValid) {
            newErrors.name = nameValidation.errorMessage;
            isValid = false;
        }
        // Валидация номера телефона
        const phoneValidation = (0, checkValidity_1.validateString)(formData.phone, {
            required: true,
            pattern: /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
        });
        if (!phoneValidation.isValid) {
            newErrors.phone = phoneValidation.errorMessage;
            isValid = false;
        }
        // Валидация почты
        const emailValidation = (0, checkValidity_1.validateString)(formData.email, {
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
        const passwordValidation = (0, checkValidity_1.validateString)(formData.password, {
            required: true,
            minLength: 3,
            maxLength: 30,
        });
        if (!passwordValidation.isValid) {
            newErrors.password = passwordValidation.errorMessage;
            isValid = false;
        }
        // Валидация подтверждения пароля
        const confirmPasswordValidation = (0, checkValidity_1.validatePasswords)(formData.password, formData.confirmPassword);
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
            await (0, users_1.createUser)(newUser);
            const user = {
                name: newUser.name,
                surname: newUser.surname,
                email: newUser.email,
                phoneNumber: newUser.phoneNumber,
            };
            (0, usersToLS_1.saveUserToLocalStorage)(user);
            navigate("/");
        }
    };
    const handleSignInClick = (event) => {
        event.preventDefault();
        setIsRegistering(false);
    };
    return ((0, jsx_runtime_1.jsxs)("form", { className: RegistrationForm_module_css_1.default.form, onSubmit: onSubmit, children: [(0, jsx_runtime_1.jsx)("h1", { className: RegistrationForm_module_css_1.default.bigLabel, children: "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { className: RegistrationForm_module_css_1.default.input, placeholder: "\u0424\u0430\u043C\u0438\u043B\u0438\u044F", name: "surname", type: "text", onBlur: handleBlur }), errors.surname && (0, jsx_runtime_1.jsx)("div", { className: RegistrationForm_module_css_1.default.error, children: errors.surname })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { className: RegistrationForm_module_css_1.default.input, placeholder: "\u0418\u043C\u044F", name: "name", type: "text", onBlur: handleBlur }), errors.name && (0, jsx_runtime_1.jsx)("div", { className: RegistrationForm_module_css_1.default.error, children: errors.name })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(PhoneInput_1.default, { className: RegistrationForm_module_css_1.default.input, onBlur: handleBlur }), errors.phone && (0, jsx_runtime_1.jsx)("div", { className: RegistrationForm_module_css_1.default.error, children: errors.phone })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { className: RegistrationForm_module_css_1.default.input, placeholder: "\u041F\u043E\u0447\u0442\u0430", name: "email", type: "text", onBlur: handleBlur }), errors.email && (0, jsx_runtime_1.jsx)("div", { className: RegistrationForm_module_css_1.default.error, children: errors.email })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { className: RegistrationForm_module_css_1.default.input, placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C", name: "password", type: "password", onBlur: handleBlur }), errors.password && ((0, jsx_runtime_1.jsx)("div", { className: RegistrationForm_module_css_1.default.error, children: errors.password }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { className: RegistrationForm_module_css_1.default.input, placeholder: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C", name: "confirmPassword", type: "password", onBlur: handleBlur }), errors.confirmPassword && ((0, jsx_runtime_1.jsx)("div", { className: RegistrationForm_module_css_1.default.error, children: errors.confirmPassword }))] }), (0, jsx_runtime_1.jsx)("button", { className: RegistrationForm_module_css_1.default.button, type: "submit", children: "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F" }), (0, jsx_runtime_1.jsxs)("p", { className: RegistrationForm_module_css_1.default.label, children: ["\u0423\u0436\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u044B?", " ", (0, jsx_runtime_1.jsx)("a", { className: RegistrationForm_module_css_1.default.registrationLabel, onClick: handleSignInClick, children: "\u0412\u043E\u0439\u0442\u0438" })] })] }));
};
exports.default = RegistrationForm;
