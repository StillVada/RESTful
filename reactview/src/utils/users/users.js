"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.fetchHashPassword = exports.fetchUser = exports.fetchUsers = void 0;
const ky_1 = __importDefault(require("ky"));
const fetchUsers = async () => {
    try {
        const response = await ky_1.default.get("https://localhost:7075/api/UserAPI").json();
        return response;
    }
    catch (e) {
        console.log(e);
    }
};
exports.fetchUsers = fetchUsers;
const fetchUser = async (email) => {
    if (!email.trim()) {
        return {
            statusCode: 404,
            isSuccess: false,
            result: null,
            errorMessages: ["Email не может быть пустым"],
        };
    }
    try {
        const encodedEmail = encodeURIComponent(email); //перекодировка email в формат для запроса
        const url = `https://localhost:7075/api/UserAPI/${encodedEmail}`;
        const response = await ky_1.default.get(url);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Ошибка при запросе пользователя:", error);
        // Неизвестная ошибка
        return {
            statusCode: 500,
            isSuccess: false,
            result: null,
            errorMessages: ["Неизвестная ошибка"],
        };
    }
};
exports.fetchUser = fetchUser;
const fetchHashPassword = async (password) => {
    try {
        const encodedPassword = encodeURIComponent(password); //перекодировка email в формат для запроса
        const url = `https://localhost:7075/api/ServiceAPI/${encodedPassword}`;
        const response = await ky_1.default.get(url).json();
        return response.result;
    }
    catch (e) {
        console.log(e);
    }
};
exports.fetchHashPassword = fetchHashPassword;
const createUser = async (userData) => {
    var _a;
    try {
        const response = await ky_1.default
            .post("https://localhost:7075/api/UserAPI", {
            json: userData,
        })
            .json();
        return response;
    }
    catch (error) {
        return {
            statusCode: ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) || 500,
            isSuccess: false,
            errorMessages: error,
            result: null,
        };
    }
};
exports.createUser = createUser;
