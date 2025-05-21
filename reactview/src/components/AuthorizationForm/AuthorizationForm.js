"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const LoginForm_1 = __importDefault(require("../LoginForm/LoginForm"));
const RegistrationForm_1 = __importDefault(require("../RegistrationForm/RegistrationForm"));
const AuthorizationForm = ({ register }) => {
    const [isRegistering, setIsRegistering] = (0, react_1.useState)(register);
    const handleToggleForm = () => {
        setIsRegistering(!isRegistering);
    };
    return ((0, jsx_runtime_1.jsx)("div", { children: isRegistering ? ((0, jsx_runtime_1.jsx)(RegistrationForm_1.default, { setIsRegistering: setIsRegistering })) : ((0, jsx_runtime_1.jsx)(LoginForm_1.default, { setIsRegistering: setIsRegistering })) }));
};
exports.default = AuthorizationForm;
