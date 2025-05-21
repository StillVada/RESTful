"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const LoginForm_module_css_1 = __importDefault(require("./LoginForm.module.css"));
const users_1 = require("../../utils/users/users");
const checkValidity_1 = require("../../utils/checkValidity/checkValidity");
const react_router_dom_1 = require("react-router-dom");
const usersToLS_1 = require("../../utils/localStorage/usersToLS");
const LoginForm = ({ setIsRegistering }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [formData, setFormData] = (0, react_1.useState)({
        email: "",
        password: "",
    });
    const [errors, setErrors] = (0, react_1.useState)({
        email: "",
        password: "",
    });
    const handleBlur = (e) => {
        const { name, value } = e.target;
        setFormData(Object.assign(Object.assign({}, formData), { [name]: value }));
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        let isValid = true;
        const newErrors = {
            email: "",
            password: "",
        }; // объект с текстом ошибок
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
        if (isValid) {
            const newPassword = await (0, users_1.fetchHashPassword)(formData.password);
            const userResponse = await (0, users_1.fetchUser)(formData.email);
            if (userResponse.isSuccess && userResponse.result) {
                if (userResponse.result.password === newPassword) {
                    // Если пароль совпадает, то авторизируем пользователя
                    const user = {
                        name: userResponse.result.name,
                        surname: userResponse.result.surname,
                        email: userResponse.result.email,
                        phoneNumber: userResponse.result.phoneNumber,
                    };
                    (0, usersToLS_1.saveUserToLocalStorage)(user);
                    navigate("/");
                    console.log("Успешный вход");
                }
                else {
                    console.log("Пароль неверный!");
                    newErrors.password = "Пароль не верный";
                }
            }
            else {
                newErrors.email = "Пользователь не найден";
                console.log("Пользователь не найден или ошибка");
            }
            setErrors(newErrors);
        }
    };
    const handleRegistrationClick = (event) => {
        event.preventDefault();
        setIsRegistering(true);
    };
    return ((0, jsx_runtime_1.jsxs)("form", { className: LoginForm_module_css_1.default.form, onSubmit: onSubmit, children: [(0, jsx_runtime_1.jsx)("h1", { className: LoginForm_module_css_1.default.bigLabel, children: "\u0412\u043E\u0439\u0442\u0438" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { className: LoginForm_module_css_1.default.input, placeholder: "\u041F\u043E\u0447\u0442\u0430", name: "email", type: "text", onBlur: handleBlur }), errors.email && (0, jsx_runtime_1.jsx)("div", { className: LoginForm_module_css_1.default.error, children: errors.email })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { className: LoginForm_module_css_1.default.input, placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C", name: "password", type: "password", onBlur: handleBlur }), errors.password && ((0, jsx_runtime_1.jsx)("div", { className: LoginForm_module_css_1.default.error, children: errors.password }))] }), (0, jsx_runtime_1.jsx)("button", { className: LoginForm_module_css_1.default.button, type: "submit", children: "\u0412\u043E\u0439\u0442\u0438" }), (0, jsx_runtime_1.jsxs)("p", { className: LoginForm_module_css_1.default.label, children: ["\u0415\u0449\u0451 \u043D\u0435\u0442 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430?", " ", (0, jsx_runtime_1.jsx)("a", { className: LoginForm_module_css_1.default.registrationLabel, onClick: handleRegistrationClick, children: "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F" })] })] }));
};
exports.default = LoginForm;
