"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const villas_1 = require("../../utils/villas/villas");
const CreateVilla_module_css_1 = __importDefault(require("./CreateVilla.module.css"));
const checkValidity_1 = require("../../utils/checkValidity/checkValidity");
const react_router_dom_1 = require("react-router-dom");
const CreateVilla = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    const [formData, setFormData] = (0, react_1.useState)({
        name: "",
        rate: 0,
    });
    const [errors, setErrors] = (0, react_1.useState)({
        name: "",
        rate: "",
    });
    const [searchParams] = (0, react_router_dom_1.useSearchParams)();
    const id = Number(searchParams.get("id")); // получаем параметр id из URL
    (0, react_1.useEffect)(() => {
        // Если есть id в URL, значит это редактирование существующей виллы
        if (id) {
            setIsEditing(true);
            // Загружаем данные виллы для редактирования
            fetchVillaForEdit(id);
        }
    }, [id]);
    const fetchVillaForEdit = async (villaId) => {
        try {
            const response = await (0, villas_1.fetchVilla)(villaId);
            if (response.isSuccess) {
                setFormData(response.result);
            }
            else {
                console.error("Ошибка при загрузке виллы:", response.errorMessages);
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
        navigate("/villasApi");
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        let isValid = true;
        const newErrors = {
            name: "",
            rate: "",
        }; // объект с текстом ошибок
        // Валидация имени
        const nameValidation = (0, checkValidity_1.validateString)(formData.name, {
            required: true,
            minLength: 3,
            maxLength: 30,
        });
        if (!nameValidation.isValid) {
            newErrors.name = nameValidation.errorMessage;
            isValid = false;
        }
        // Валидация стоимости
        const rateValidation = (0, checkValidity_1.validateNumber)(formData.rate, {
            required: true,
            moreThan: 0,
        });
        if (!rateValidation.isValid) {
            newErrors.rate = rateValidation.errorMessage;
            isValid = false;
        }
        // Валидация вместительности
        const occupancyValidation = (0, checkValidity_1.validateNumber)(formData.occupancy, {
            moreThan: 0,
        });
        if (!occupancyValidation.isValid) {
            newErrors.occupancy = occupancyValidation.errorMessage;
            isValid = false;
        }
        // Валидация площади
        const sqftValidation = (0, checkValidity_1.validateNumber)(formData.sqft, {
            moreThan: 0,
        });
        if (!sqftValidation.isValid) {
            newErrors.sqft = sqftValidation.errorMessage;
            isValid = false;
        }
        // Валидация ссылки на картинку
        const imageUrlValidation = (0, checkValidity_1.validateString)(formData.imageUrl, {
            pattern: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-./]*)*\.(jpg|jpeg|png|gif|bmp|webp|svg)(\?.*)?$/i,
        });
        if (!imageUrlValidation.isValid) {
            newErrors.imageUrl = imageUrlValidation.errorMessage;
            isValid = false;
        }
        if (isValid) {
            if (isEditing) {
                const villaEditData = {
                    id: id,
                    name: formData.name,
                    details: formData.details,
                    rate: formData.rate,
                    occupancy: formData.occupancy,
                    sqft: formData.sqft,
                    imageUrl: formData.imageUrl,
                    amenity: formData.amenity,
                };
                const response = await (0, villas_1.editVilla)(villaEditData);
                if (response.isSuccess) {
                    console.log("Успех");
                    navigate("/villasApi");
                }
                else {
                    console.log("Неудача!");
                    console.log(response.errorMessages);
                }
            }
            else {
                const response = await (0, villas_1.createVilla)(formData);
                if (response.isSuccess) {
                    console.log("Успех");
                    navigate("/villasApi");
                }
                else {
                    console.log("Неудача!");
                    console.log(response.errorMessages);
                }
            }
        }
        else {
            newErrors.name = "Ошибка";
            isEditing
                ? console.log("Ошибка при создании виллы")
                : console.log("Ошибка при обновлении виллы");
        }
        setErrors(newErrors);
    };
    return ((0, jsx_runtime_1.jsxs)("form", { className: CreateVilla_module_css_1.default.form, onSubmit: onSubmit, children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("h1", { className: CreateVilla_module_css_1.default.blueText, children: isEditing ? "Редактировать виллу" : "Создать виллу" }) }), (0, jsx_runtime_1.jsx)("table", { children: (0, jsx_runtime_1.jsxs)("tbody", { children: [(0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("label", { children: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435" }) }), (0, jsx_runtime_1.jsxs)("td", { className: CreateVilla_module_css_1.default.tdInput, children: [(0, jsx_runtime_1.jsx)("input", { className: CreateVilla_module_css_1.default.input, type: "text", onBlur: handleBlur, name: "name", defaultValue: (formData === null || formData === void 0 ? void 0 : formData.name) || "" }), errors.name && (0, jsx_runtime_1.jsx)("div", { className: CreateVilla_module_css_1.default.error, children: errors.name })] })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("label", { children: "\u0414\u0435\u0442\u0430\u043B\u0438" }) }), (0, jsx_runtime_1.jsx)("td", { className: CreateVilla_module_css_1.default.tdInput, children: (0, jsx_runtime_1.jsx)("textarea", { className: CreateVilla_module_css_1.default.textarea, onBlur: handleBlur, name: "details", defaultValue: (formData === null || formData === void 0 ? void 0 : formData.details) || "" }) })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("label", { children: "\u0426\u0435\u043D\u0430" }) }), (0, jsx_runtime_1.jsxs)("td", { className: CreateVilla_module_css_1.default.tdInput, children: [(0, jsx_runtime_1.jsx)("input", { className: CreateVilla_module_css_1.default.input, type: "number", onBlur: handleBlur, name: "rate", defaultValue: (formData === null || formData === void 0 ? void 0 : formData.rate) || "" }), errors.rate && (0, jsx_runtime_1.jsx)("div", { className: CreateVilla_module_css_1.default.error, children: errors.rate })] })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("label", { children: "\u0412\u043C\u0435\u0441\u0442\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C" }) }), (0, jsx_runtime_1.jsxs)("td", { className: CreateVilla_module_css_1.default.tdInput, children: [(0, jsx_runtime_1.jsx)("input", { className: CreateVilla_module_css_1.default.input, type: "number", onBlur: handleBlur, name: "occupancy", defaultValue: (formData === null || formData === void 0 ? void 0 : formData.occupancy) || "" }), errors.occupancy && ((0, jsx_runtime_1.jsx)("div", { className: CreateVilla_module_css_1.default.error, children: errors.occupancy }))] })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("label", { children: "\u041F\u043B\u043E\u0449\u0430\u0434\u044C" }) }), (0, jsx_runtime_1.jsxs)("td", { className: CreateVilla_module_css_1.default.tdInput, children: [(0, jsx_runtime_1.jsx)("input", { className: CreateVilla_module_css_1.default.input, type: "number", onBlur: handleBlur, name: "sqft", defaultValue: (formData === null || formData === void 0 ? void 0 : formData.sqft) || "" }), errors.sqft && (0, jsx_runtime_1.jsx)("div", { className: CreateVilla_module_css_1.default.error, children: errors.sqft })] })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("label", { children: "\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435" }) }), (0, jsx_runtime_1.jsxs)("td", { className: CreateVilla_module_css_1.default.tdInput, children: [(0, jsx_runtime_1.jsx)("input", { className: CreateVilla_module_css_1.default.input, type: "text", onBlur: handleBlur, name: "imageUrl", defaultValue: (formData === null || formData === void 0 ? void 0 : formData.imageUrl) || "" }), errors.imageUrl && ((0, jsx_runtime_1.jsx)("div", { className: CreateVilla_module_css_1.default.error, children: errors.imageUrl }))] })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("label", { children: "\u0423\u0434\u043E\u0431\u0441\u0442\u0432\u0430" }) }), (0, jsx_runtime_1.jsx)("td", { className: CreateVilla_module_css_1.default.tdInput, children: (0, jsx_runtime_1.jsx)("textarea", { className: CreateVilla_module_css_1.default.textarea, onBlur: handleBlur, name: "amenity", defaultValue: (formData === null || formData === void 0 ? void 0 : formData.amenity) || "" }) })] })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: CreateVilla_module_css_1.default.rowBtns, children: [(0, jsx_runtime_1.jsx)("button", { className: `${CreateVilla_module_css_1.default.backBtn} ${CreateVilla_module_css_1.default.btn}`, onClick: handleBack, children: "\u041D\u0430\u0437\u0430\u0434 \u043A \u0441\u043F\u0438\u0441\u043A\u0443" }), (0, jsx_runtime_1.jsx)("button", { className: `${CreateVilla_module_css_1.default.createBtn} ${CreateVilla_module_css_1.default.btn}`, type: "submit", children: isEditing ? "Редактировать" : "Создать" })] })] }));
};
exports.default = CreateVilla;
