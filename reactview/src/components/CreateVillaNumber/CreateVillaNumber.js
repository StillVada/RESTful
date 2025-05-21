"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const CreateVillaNumber_module_css_1 = __importDefault(require("./CreateVillaNumber.module.css"));
const checkValidity_1 = require("../../utils/checkValidity/checkValidity");
const react_router_dom_1 = require("react-router-dom");
const villasNumbers_1 = require("../../utils/villasNumbers/villasNumbers");
const CreateVillaNumber = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    const [formData, setFormData] = (0, react_1.useState)({
        villaNo: 0,
        villaID: 0,
    });
    const [errors, setErrors] = (0, react_1.useState)({
        villaNo: "",
        villaID: "",
    });
    const [searchParams] = (0, react_router_dom_1.useSearchParams)();
    const villaNO = Number(searchParams.get("villaNo")); // получаем параметр id из URL
    (0, react_1.useEffect)(() => {
        // Если есть villaNo в URL, значит это редактирование существующего номера
        if (villaNO) {
            setIsEditing(true);
            // Загружаем данные номера для редактирования
            fetchVillaNumberForEdit(villaNO);
        }
    }, [villaNO]);
    const fetchVillaNumberForEdit = async (villaNo) => {
        try {
            const response = await (0, villasNumbers_1.fetchVillaNumber)(villaNo);
            if (response.isSuccess) {
                setFormData(response.result);
            }
            else {
                console.error("Ошибка при загрузке номера:", response.errorMessages);
            }
        }
        catch (error) {
            console.error("Ошибка:", error);
        }
    };
    const handleBlur = (e) => {
        const { name, value } = e.target;
        setFormData(Object.assign(Object.assign({}, formData), { [name]: value }));
    };
    const handleBack = () => {
        navigate("/villaNumberApi");
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        let isValid = true;
        const newErrors = {
            villaNo: "",
            villaID: "",
        }; // объект с текстом ошибок
        // Валидация номера
        const numberValidation = (0, checkValidity_1.validateNumber)(formData.villaNo, {
            required: true,
            moreThan: 0,
        });
        if (!numberValidation.isValid) {
            newErrors.villaNo = numberValidation.errorMessage;
            isValid = false;
        }
        // Валидация Id виллы
        const villaIDValidation = (0, checkValidity_1.validateNumber)(formData.villaID, {
            required: true,
            moreThan: 0,
        });
        if (!villaIDValidation.isValid) {
            newErrors.villaID = villaIDValidation.errorMessage;
            isValid = false;
        }
        if (isValid) {
            const data = {
                villaNo: villaNO,
                villaID: formData.villaID,
                specialDetails: formData.specialDetails,
            };
            if (isEditing) {
                const response = await (0, villasNumbers_1.editVillaNumber)(data);
                if (response.isSuccess) {
                    console.log("Успех");
                    navigate("/villaNumberApi");
                }
                else {
                    console.log("Неудача!");
                    if (response.statusCode == 400) {
                        newErrors.villaID = "Нельзя менять ID виллы";
                    }
                    console.log(response.errorMessages);
                }
            }
            else {
                data.villaNo = formData.villaNo;
                const response = await (0, villasNumbers_1.createVillaNumber)(data);
                if (response.isSuccess) {
                    console.log("Успех");
                    navigate("/villaNumberApi");
                }
                else {
                    console.log("Неудача!");
                    if (response.statusCode == 400) {
                        newErrors.villaID = "Id виллы не найден или номер уже занят";
                    }
                    console.log(response.errorMessages);
                }
            }
        }
        else {
            newErrors.villaNo = "Ошибка";
            isEditing
                ? console.log("Ошибка при создании номера")
                : console.log("Ошибка при обновлении номера");
        }
        setErrors(newErrors);
    };
    return ((0, jsx_runtime_1.jsxs)("form", { className: CreateVillaNumber_module_css_1.default.form, onSubmit: onSubmit, children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("h1", { className: CreateVillaNumber_module_css_1.default.blueText, children: isEditing ? "Редактировать номер" : "Создать номер" }) }), (0, jsx_runtime_1.jsx)("table", { children: (0, jsx_runtime_1.jsxs)("tbody", { children: [!isEditing && ( // Если не редактируем, то добавляется ввод номера
                        (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("label", { children: "\u041D\u043E\u043C\u0435\u0440" }) }), (0, jsx_runtime_1.jsxs)("td", { className: CreateVillaNumber_module_css_1.default.tdInput, children: [(0, jsx_runtime_1.jsx)("input", { className: CreateVillaNumber_module_css_1.default.input, type: "number", onBlur: handleBlur, name: "villaNo", defaultValue: (formData === null || formData === void 0 ? void 0 : formData.villaNo) || "" }), errors.villaNo && ((0, jsx_runtime_1.jsx)("div", { className: CreateVillaNumber_module_css_1.default.error, children: errors.villaNo }))] })] })), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("label", { children: "ID \u0412\u0438\u043B\u043B\u044B" }) }), (0, jsx_runtime_1.jsxs)("td", { className: CreateVillaNumber_module_css_1.default.tdInput, children: [(0, jsx_runtime_1.jsx)("input", { className: CreateVillaNumber_module_css_1.default.input, type: "number", onBlur: handleBlur, name: "villaID", defaultValue: (formData === null || formData === void 0 ? void 0 : formData.villaID) || "" }), errors.villaID && ((0, jsx_runtime_1.jsx)("div", { className: CreateVillaNumber_module_css_1.default.error, children: errors.villaID }))] })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("label", { children: "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F" }) }), (0, jsx_runtime_1.jsx)("td", { className: CreateVillaNumber_module_css_1.default.tdInput, children: (0, jsx_runtime_1.jsx)("textarea", { className: CreateVillaNumber_module_css_1.default.textarea, onBlur: handleBlur, name: "specialDetails", defaultValue: (formData === null || formData === void 0 ? void 0 : formData.specialDetails) || "" }) })] })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: CreateVillaNumber_module_css_1.default.rowBtns, children: [(0, jsx_runtime_1.jsx)("button", { className: `${CreateVillaNumber_module_css_1.default.backBtn} ${CreateVillaNumber_module_css_1.default.btn}`, onClick: handleBack, children: "\u041D\u0430\u0437\u0430\u0434 \u043A \u0441\u043F\u0438\u0441\u043A\u0443" }), (0, jsx_runtime_1.jsx)("button", { className: `${CreateVillaNumber_module_css_1.default.createBtn} ${CreateVillaNumber_module_css_1.default.btn}`, type: "submit", children: isEditing ? "Редактировать" : "Создать" })] })] }));
};
exports.default = CreateVillaNumber;
