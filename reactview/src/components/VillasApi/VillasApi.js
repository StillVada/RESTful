"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const villas_1 = require("../../utils/villas/villas");
const VillasApi_module_css_1 = __importDefault(require("./VillasApi.module.css"));
const trashcan_svg_1 = require("../../assets/svg/trashcan.svg");
const edit_svg_1 = require("../../assets/svg/edit.svg");
const react_router_dom_1 = require("react-router-dom");
const VillasApi = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [villas, setVillas] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        loadVillas();
    }, []);
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
    const handleCreate = () => {
        navigate("/createVilla");
    };
    const handleEdit = (id) => {
        console.log(id);
        navigate(`/createVilla?id=${id}`);
    };
    const handleDelete = async (id) => {
        const response = await (0, villas_1.deleteVilla)(id);
        if (response.isSuccess) {
            console.log("Вилла удалена");
            loadVillas();
        }
    };
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { children: "Loading..." });
    }
    if (error) {
        return (0, jsx_runtime_1.jsx)("div", { children: error });
    }
    if (!villas.length) {
        return (0, jsx_runtime_1.jsx)("div", { children: "No villas available" });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: VillasApi_module_css_1.default.container, children: [(0, jsx_runtime_1.jsxs)("div", { className: VillasApi_module_css_1.default.row, children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("h1", { className: VillasApi_module_css_1.default.blueText, children: "\u0421\u043F\u0438\u0441\u043E\u043A \u0432\u0438\u043B\u043B" }) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("button", { className: VillasApi_module_css_1.default.createVilla, onClick: handleCreate, children: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0432\u0438\u043B\u043B\u0443" }) })] }), (0, jsx_runtime_1.jsxs)("table", { className: VillasApi_module_css_1.default.table, children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435" }), (0, jsx_runtime_1.jsx)("th", { children: "\u041D\u043E\u043C\u0435\u0440" }), (0, jsx_runtime_1.jsx)("th", { children: "\u0412\u043C\u0435\u0441\u0442\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C" }), (0, jsx_runtime_1.jsx)("th", { children: "\u0426\u0435\u043D\u0430" }), (0, jsx_runtime_1.jsx)("th", {})] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: villas.map((villa) => ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: villa.name }), (0, jsx_runtime_1.jsx)("td", { children: villa.id }), (0, jsx_runtime_1.jsx)("td", { children: villa.occupancy }), (0, jsx_runtime_1.jsxs)("td", { children: [villa.rate, " \u0440"] }), (0, jsx_runtime_1.jsxs)("td", { children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => {
                                                handleEdit(villa.id);
                                            }, className: `${VillasApi_module_css_1.default.editBtn} ${VillasApi_module_css_1.default.controlBtn}`, children: (0, jsx_runtime_1.jsx)(edit_svg_1.ReactComponent, { className: VillasApi_module_css_1.default.icon }) }), " ", (0, jsx_runtime_1.jsx)("button", { className: `${VillasApi_module_css_1.default.deleteBtn} ${VillasApi_module_css_1.default.controlBtn}`, onClick: () => {
                                                handleDelete(villa.id);
                                            }, children: (0, jsx_runtime_1.jsx)(trashcan_svg_1.ReactComponent, { className: VillasApi_module_css_1.default.icon }) })] })] }, villa.id))) })] })] }));
};
exports.default = VillasApi;
