import { useEffect, useState } from "react";
import styles from "./CreateVillaNumber.module.css";
import {
  validateNumber,
  validateString,
} from "../../utils/checkValidity/checkValidity";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  createVillaNumber,
  editVillaNumber,
  fetchVillaNumber,
} from "../../utils/villasNumbers/villasNumbers";

interface FormData {
  VillaNo?: number;
  villaID: number;
  specialDetails?: string;
}

interface VillaNumberCreateDto {
  VillaNo: number;
  villaID: number;
  specialDetails?: string;
}
const CreateVillaNumber = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    VillaNo: 0,
    villaID: 0,
  });
  const [errors, setErrors] = useState<{
    VillaNo: string;
    villaID: string;
    specialDetails?: string;
  }>({
    VillaNo: "",
    villaID: "",
  });

  const [searchParams] = useSearchParams();
  const VillaNo = Number(searchParams.get("VillaNo")); // получаем параметр id из URL

  useEffect(() => {
    // Если есть VillaNo в URL, значит это редактирование существующего номера
    if (VillaNo) {
      setIsEditing(true);
      // Загружаем данные номера для редактирования
      fetchVillaNumberForEdit(VillaNo);
    }
  }, [VillaNo]);

  const fetchVillaNumberForEdit = async (VillaNo: number) => {
    try {
      const response = await fetchVillaNumber(VillaNo);
      if (response.isSuccess) {
        setFormData(response.result);
      } else {
        console.error("Ошибка при загрузке номера:", response.errorMessages);
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const handleBlur = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.FocusEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBack = () => {
    navigate("/villaNumberApi");
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(formData);

    let isValid = true;
    const newErrors: {
      VillaNo: string;
      villaID: string;
      specialDetails?: string;
    } = {
      VillaNo: "",
      villaID: "",
    }; // объект с текстом ошибок

    // Валидация номера
    const numberValidation = validateNumber(formData.VillaNo, {
      required: true,
      moreThan: 0,
    });
    if (!numberValidation.isValid) {
      newErrors.VillaNo = numberValidation.errorMessage;
      isValid = false;
    }

    // Валидация Id виллы
    const villaIDValidation = validateNumber(formData.villaID, {
      required: true,
      moreThan: 0,
    });
    if (!villaIDValidation.isValid) {
      newErrors.villaID = villaIDValidation.errorMessage;
      isValid = false;
    }

    if (isValid) {
      const data: VillaNumberCreateDto = {
        VillaNo: VillaNo,
        villaID: formData.villaID,
        specialDetails: formData.specialDetails,
      };
      if (isEditing) {
        const response = await editVillaNumber(data);

        if (response.isSuccess) {
          console.log("Успех");
          navigate("/villaNumberApi");
        } else {
          console.log("Неудача!");
          if (response.statusCode == 400) {
            newErrors.villaID = "Нельзя менять ID виллы";
          }
          console.log(response.errorMessages);
        }
      } else {
        data.VillaNo = formData.VillaNo;
        const response = await createVillaNumber(data);

        if (response.isSuccess) {
          console.log("Успех");
          navigate("/villaNumberApi");
        } else {
          console.log("Неудача!");
          if (response.statusCode == 400) {
            newErrors.villaID = "Id виллы не найден или номер уже занят";
          }
          console.log(response.errorMessages);
        }
      }
    } else {
      newErrors.VillaNo = "Ошибка";
      isEditing
        ? console.log("Ошибка при создании номера")
        : console.log("Ошибка при обновлении номера");
    }
    setErrors(newErrors);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div>
        <h1 className={styles.blueText}>
          {isEditing ? "Редактировать номер" : "Создать номер"}
        </h1>
      </div>
      <table>
        <tbody>
          {!isEditing && ( // Если не редактируем, то добавляется ввод номера
            <tr>
              <td>
                <label>Номер</label>
              </td>
              <td className={styles.tdInput}>
                <input
                  className={styles.input}
                  type="number"
                  onBlur={handleBlur}
                  name="VillaNo"
                  defaultValue={formData?.VillaNo || ""}
                />
                {errors.VillaNo && (
                  <div className={styles.error}>{errors.VillaNo}</div>
                )}
              </td>
            </tr>
          )}

          <tr>
            <td>
              <label>ID Виллы</label>
            </td>
            <td className={styles.tdInput}>
              <input
                className={styles.input}
                type="number"
                onBlur={handleBlur}
                name="villaID"
                defaultValue={formData?.villaID || ""}
              />
              {errors.villaID && (
                <div className={styles.error}>{errors.villaID}</div>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <label>Информация</label>
            </td>
            <td className={styles.tdInput}>
              <textarea
                className={styles.textarea}
                onBlur={handleBlur}
                name="specialDetails"
                defaultValue={formData?.specialDetails || ""}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className={styles.rowBtns}>
        <button
          className={`${styles.backBtn} ${styles.btn}`}
          onClick={handleBack}
        >
          Назад к списку
        </button>
        <button className={`${styles.createBtn} ${styles.btn}`} type="submit">
          {isEditing ? "Редактировать" : "Создать"}
        </button>
      </div>
    </form>
  );
};

export default CreateVillaNumber;
