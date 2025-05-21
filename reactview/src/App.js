"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const AuthPage_1 = __importDefault(require("./pages/AuthPage/AuthPage"));
const VillasPage_1 = __importDefault(require("./pages/VillasPage/VillasPage"));
const VillasApiPage_1 = __importDefault(require("./pages/VillasApiPage/VillasApiPage"));
const CreateVillaPage_1 = __importDefault(require("./pages/CreateVillaPage/CreateVillaPage"));
const VillasNumbersApiPage_1 = __importDefault(require("./pages/VillasNumbersApiPage/VillasNumbersApiPage"));
const CreateVillaNumberPage_1 = __importDefault(require("./pages/CreateVillaNumberPage/CreateVillaNumberPage"));
const App = () => {
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("main", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/auth", element: (0, jsx_runtime_1.jsx)(AuthPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(VillasPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/villasApi", element: (0, jsx_runtime_1.jsx)(VillasApiPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/createVilla", element: (0, jsx_runtime_1.jsx)(CreateVillaPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/villaNumberApi", element: (0, jsx_runtime_1.jsx)(VillasNumbersApiPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/createVillaNumber", element: (0, jsx_runtime_1.jsx)(CreateVillaNumberPage_1.default, {}) })] }) }) }) }));
};
exports.default = App;
