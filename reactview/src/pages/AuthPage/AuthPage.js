"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const AuthPage_module_css_1 = __importDefault(require("./AuthPage.module.css"));
const AuthorizationForm_1 = __importDefault(require("../../components/AuthorizationForm/AuthorizationForm"));
const AuthPage = () => {
    const [searchParams] = (0, react_router_dom_1.useSearchParams)();
    const isRegistering = searchParams.get("mode") === "register";
    return ((0, jsx_runtime_1.jsx)("div", { className: AuthPage_module_css_1.default.page, children: (0, jsx_runtime_1.jsx)(AuthorizationForm_1.default, { register: isRegistering }) }));
};
exports.default = AuthPage;
