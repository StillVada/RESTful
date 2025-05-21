"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const villasNumbers_1 = require("../../utils/villasNumbers/villasNumbers");
const VillasNumbersApi_module_css_1 = __importDefault(require("./VillasNumbersApi.module.css"));
const trashcan_svg_1 = require("../../assets/svg/trashcan.svg");
const edit_svg_1 = require("../../assets/svg/edit.svg");
const react_router_dom_1 = require("react-router-dom");
const VillasNumberApi = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [villas, setVillas] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        loadVillasNumbers();
    }, []);
    const loadVillasNumbers = async () => {
        try {
            const response = await (0, villasNumbers_1.fetchVillasNumbers)();
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
    const handleCreate = () => {
        navigate("/createVillaNumber");
    };
    const handleEdit = (villaNo) => {
        console.log(villaNo);
        navigate(`/createVillaNumber?villaNo=${villaNo}`);
    };
    const handleDelete = async (id) => {
        const response = await (0, villasNumbers_1.deleteVillaNumber)(id);
        if (response.isSuccess) {
            console.log("Номер удалён");
            loadVillasNumbers();
        }
    };
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { children: "Loading..." });
    }
    if (error) {
        return (0, jsx_runtime_1.jsx)("div", { children: error });
    }
    if (!villas.length) {
        return (0, jsx_runtime_1.jsx)("div", { children: "No villas numbers available" });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: VillasNumbersApi_module_css_1.default.container, children: [(0, jsx_runtime_1.jsxs)("div", { className: VillasNumbersApi_module_css_1.default.row, children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("h1", { className: VillasNumbersApi_module_css_1.default.blueText, children: "\u0421\u043F\u0438\u0441\u043E\u043A \u041D\u043E\u043C\u0435\u0440\u043E\u0432" }) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("button", { className: VillasNumbersApi_module_css_1.default.createVillaNumber, onClick: handleCreate, children: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u043C\u0435\u0440" }) })] }), (0, jsx_runtime_1.jsxs)("table", { className: VillasNumbersApi_module_css_1.default.table, children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "\u041D\u043E\u043C\u0435\u0440" }), (0, jsx_runtime_1.jsx)("th", { children: "\u0412\u0438\u043B\u043B\u0430" }), (0, jsx_runtime_1.jsx)("th", { children: "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F" }), (0, jsx_runtime_1.jsx)("th", {})] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: villas.map((villa) => ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: villa.villaNo }), (0, jsx_runtime_1.jsx)("td", { children: villa.villaID }), (0, jsx_runtime_1.jsx)("td", { children: villa.specialDetails }), (0, jsx_runtime_1.jsxs)("td", { children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => {
                                                handleEdit(villa.villaNo);
                                            }, className: `${VillasNumbersApi_module_css_1.default.editBtn} ${VillasNumbersApi_module_css_1.default.controlBtn}`, children: (0, jsx_runtime_1.jsx)(edit_svg_1.ReactComponent, { className: VillasNumbersApi_module_css_1.default.icon }) }), " ", (0, jsx_runtime_1.jsx)("button", { className: `${VillasNumbersApi_module_css_1.default.deleteBtn} ${VillasNumbersApi_module_css_1.default.controlBtn}`, onClick: () => {
                                                handleDelete(villa.villaNo);
                                            }, children: (0, jsx_runtime_1.jsx)(trashcan_svg_1.ReactComponent, { className: VillasNumbersApi_module_css_1.default.icon }) })] })] }, villa.villaNo))) })] })] }));
};
exports.default = VillasNumberApi;
