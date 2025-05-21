"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Header_1 = __importDefault(require("../../components/Header/Header"));
const VillasApi_1 = __importDefault(require("../../components/VillasApi/VillasApi"));
const usersToLS_1 = require("../../utils/localStorage/usersToLS");
const VillasApiPage = () => {
    const userData = (0, usersToLS_1.getUserFromLocalStorage)();
    const userName = userData === null || userData === void 0 ? void 0 : userData.name;
    const userSurname = userData === null || userData === void 0 ? void 0 : userData.surname;
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, { name: userName, surname: userSurname }), (0, jsx_runtime_1.jsx)(VillasApi_1.default, {})] }));
};
exports.default = VillasApiPage;
