import { useEffect, useState } from "react";
import {
  fetchVillas,
  deleteVilla,
  createVilla,
  fetchVilla,
  editVilla,
} from "../../utils/villas/villas";
import styles from "./CreateVilla.module.css";
import {
  validateNumber,
  validateString,
} from "../../utils/checkValidity/checkValidity";
import { useNavigate, useSearchParams } from "react-router-dom";

interface FormData {
  name: string;
  details?: string;
  rate: number;
  occupancy?: number;
  sqft?: number;
  imageUrl?: string;
  amenity?: string;
}

interface VillaUpdateDto {
  id: number;
  name: string;
  details?: string;
  rate: number;
  occupancy?: number;
  sqft?: number;
  imageUrl?: string;
  amenity?: string;
}

const CreateVilla = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    rate: 0,
  });
  const [errors, setErrors] = useState<{
    name: string;
    rate: string;
    occupancy?: string;
    sqft?: string;
    imageUrl?: string;
  }>({
    name: "",
    rate: "",
  });

  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id")); // получаем параметр id из URL

  useEffect(() => {
    // Если есть id в URL, значит это редактирование существующей виллы
    if (id) {
      setIsEditing(true);
      // Загружаем данные виллы для редактирования
      fetchVillaForEdit(id);
    }
  }, [id]);

  const fetchVillaForEdit = async (villaId: number) => {
    try {
      const response = await fetchVilla(villaId);
      if (response.isSuccess) {
        setFormData(response.result);
      } else {
        console.error("Ошибка при загрузке виллы:", response.errorMessages);
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
    navigate("/villasApi");
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let isValid = true;
    const newErrors: {
      name: string;
      rate: string;
      occupancy?: string;
      sqft?: string;
      imageUrl?: string;
    } = {
      name: "",
      rate: "",
    }; // объект с текстом ошибок

    // Валидация имени
    const nameValidation = validateString(formData.name, {
      required: true,
      minLength: 3,
      maxLength: 30,
    });
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.errorMessage;
      isValid = false;
    }

    // Валидация стоимости
    const rateValidation = validateNumber(formData.rate, {
      required: true,
      moreThan: 0,
    });
    if (!rateValidation.isValid) {
      newErrors.rate = rateValidation.errorMessage;
      isValid = false;
    }

    // Валидация вместительности
    const occupancyValidation = validateNumber(formData.occupancy, {
      moreThan: 0,
    });
    if (!occupancyValidation.isValid) {
      newErrors.occupancy = occupancyValidation.errorMessage;
      isValid = false;
    }

    // Валидация площади
    const sqftValidation = validateNumber(formData.sqft, {
      moreThan: 0,
    });
    if (!sqftValidation.isValid) {
      newErrors.sqft = sqftValidation.errorMessage;
      isValid = false;
    }

    // Валидация ссылки на картинку
    const imageUrlValidation = validateString(formData.imageUrl, {
      pattern:
        /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-./]*)*\.(jpg|jpeg|png|gif|bmp|webp|svg)(\?.*)?$/i,
    });
    if (!imageUrlValidation.isValid) {
      newErrors.imageUrl = imageUrlValidation.errorMessage;
      isValid = false;
    }

    if (isValid) {
      if (isEditing) {
        const villaEditData: VillaUpdateDto = {
          id: id,
          name: formData.name,
          details: formData.details,
          rate: formData.rate,
          occupancy: formData.occupancy,
          sqft: formData.sqft,
          imageUrl: formData.imageUrl,
          amenity: formData.amenity,
        };
        const response = await editVilla(villaEditData);

        if (response.isSuccess) {
          console.log("Успех");
          navigate("/villasApi");
        } else {
          console.log("Неудача!");
          console.log(response.errorMessages);
        }
      } else {
        const response = await createVilla(formData);

        if (response.isSuccess) {
          console.log("Успех");
          navigate("/villasApi");
        } else {
          console.log("Неудача!");
          console.log(response.errorMessages);
        }
      }
    } else {
      newErrors.name = "Ошибка";
      isEditing
        ? console.log("Ошибка при создании виллы")
        : console.log("Ошибка при обновлении виллы");
    }
    setErrors(newErrors);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div>
        <h1 className={styles.blueText}>
          {isEditing ? "Редактировать виллу" : "Создать виллу"}
        </h1>
      </div>
      <table>
        <tbody>
          <tr>
            <td>
              <label>Название</label>
            </td>
            <td className={styles.tdInput}>
              <input
                className={styles.input}
                type="text"
                onBlur={handleBlur}
                name="name"
                defaultValue={formData?.name || ""}
              />
              {errors.name && <div className={styles.error}>{errors.name}</div>}
            </td>
          </tr>
          <tr>
            <td>
              <label>Детали</label>
            </td>
            <td className={styles.tdInput}>
              <textarea
                className={styles.textarea}
                onBlur={handleBlur}
                name="details"
                defaultValue={formData?.details || ""}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Цена</label>
            </td>
            <td className={styles.tdInput}>
              <input
                className={styles.input}
                type="number"
                onBlur={handleBlur}
                name="rate"
                defaultValue={formData?.rate || ""}
              />
              {errors.rate && <div className={styles.error}>{errors.rate}</div>}
            </td>
          </tr>
          <tr>
            <td>
              <label>Вместительность</label>
            </td>
            <td className={styles.tdInput}>
              <input
                className={styles.input}
                type="number"
                onBlur={handleBlur}
                name="occupancy"
                defaultValue={formData?.occupancy || ""}
              />
              {errors.occupancy && (
                <div className={styles.error}>{errors.occupancy}</div>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <label>Площадь</label>
            </td>
            <td className={styles.tdInput}>
              <input
                className={styles.input}
                type="number"
                onBlur={handleBlur}
                name="sqft"
                defaultValue={formData?.sqft || ""}
              />
              {errors.sqft && <div className={styles.error}>{errors.sqft}</div>}
            </td>
          </tr>
          <tr>
            <td>
              <label>Ссылка на изображение</label>
            </td>
            <td className={styles.tdInput}>
              <input
                className={styles.input}
                type="text"
                onBlur={handleBlur}
                name="imageUrl"
                defaultValue={formData?.imageUrl || ""}
              />
              {errors.imageUrl && (
                <div className={styles.error}>{errors.imageUrl}</div>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <label>Удобства</label>
            </td>
            <td className={styles.tdInput}>
              <textarea
                className={styles.textarea}
                onBlur={handleBlur}
                name="amenity"
                defaultValue={formData?.amenity || ""}
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

export default CreateVilla;
