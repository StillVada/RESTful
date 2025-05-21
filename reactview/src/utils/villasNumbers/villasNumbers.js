"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVillaNumber = exports.editVillaNumber = exports.createVillaNumber = exports.fetchVillaNumber = exports.fetchVillasNumbers = void 0;
const ky_1 = __importDefault(require("ky"));
const fetchVillasNumbers = async () => {
    try {
        const response = await ky_1.default
            .get("https://localhost:7075/api/VillaNumbersAPI")
            .json();
        return response;
    }
    catch (e) {
        console.log(e);
    }
};
exports.fetchVillasNumbers = fetchVillasNumbers;
const fetchVillaNumber = async (VillaNo) => {
    var _a;
    try {
        const url = `https://localhost:7075/api/VillaNumbersAPI/${VillaNo}`;
        const response = await ky_1.default.get(url);
        const data = await response.json();
        return data;
    }
    catch (error) {
        return {
            statusCode: ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) || 500,
            isSuccess: false,
            result: null,
            errorMessages: ["Неизвестная ошибка"],
        };
    }
};
exports.fetchVillaNumber = fetchVillaNumber;
const createVillaNumber = async (villaData) => {
    var _a;
    try {
        const response = await ky_1.default
            .post("https://localhost:7075/api/VillaNumbersAPI", {
            json: villaData,
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
exports.createVillaNumber = createVillaNumber;
const editVillaNumber = async (villaData) => {
    var _a;
    try {
        const response = await ky_1.default
            .put(`https://localhost:7075/api/VillaNumbersAPI/${villaData.villaNo}`, {
            json: villaData,
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
exports.editVillaNumber = editVillaNumber;
const deleteVillaNumber = async (VillaNo) => {
    var _a;
    try {
        const response = await ky_1.default
            .delete(`https://localhost:7075/api/VillaNumbersAPI/${VillaNo}`, {})
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
exports.deleteVillaNumber = deleteVillaNumber;
