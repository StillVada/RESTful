"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const VillasList_module_css_1 = __importDefault(require("./VillasList.module.css"));
const VillaCard_1 = __importDefault(require("../VillaCard/VillaCard"));
const villas_1 = require("../../utils/villas/villas");
const VillasList = () => {
    const [villas, setVillas] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const loadVillas = async () => {
            try {
                const response = await (0, villas_1.fetchVillas)();
                if (response === null || response === void 0 ? void 0 : response.result) {
                    setVillas(response.result);
                }
            }
            catch (e) {
                console.error("Ошибка:", e);
                setError("Ошибка загрузки");
            }
            finally {
                setLoading(false);
            }
        };
        loadVillas();
    }, []);
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { children: "Loading..." });
    }
    if (error) {
        return (0, jsx_runtime_1.jsx)("div", { children: error });
    }
    if (!villas.length) {
        return (0, jsx_runtime_1.jsx)("div", { children: "No villas available" });
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: VillasList_module_css_1.default.villasList, children: villas.map((villa) => ((0, jsx_runtime_1.jsx)(VillaCard_1.default, { name: villa.name, details: villa.details, rate: villa.rate, occupancy: villa.occupancy, sqft: villa.sqft, imageUrl: villa.imageUrl, amenity: villa.amenity }, villa.id))) }));
};
exports.default = VillasList;
