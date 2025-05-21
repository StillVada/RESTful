import { useEffect, useState } from "react";
import { fetchVillas, deleteVilla } from "../../utils/villas/villas";
import styles from "./VillasApi.module.css";
import { ReactComponent as TrashIcon } from "../../assets/svg/trashcan.svg";
import { ReactComponent as EditIcon } from "../../assets/svg/edit.svg";
import { useNavigate } from "react-router-dom";

interface Villa {
  id: number;
  name: string;
  details?: string;
  rate: number;
  occupancy?: number;
  sqft?: number;
  imageUrl?: string;
  amenity?: string;
}

const VillasApi = () => {
  const navigate = useNavigate();

  const [villas, setVillas] = useState<Villa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadVillas();
  }, []);

  const loadVillas = async () => {
    try {
      const response = await fetchVillas();

      if (response?.result) {
        setVillas(response.result);
      }
    } catch (e) {
      console.error("Ошибка:", e);
      setError("Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    navigate("/createVilla");
  };

  const handleEdit = (id: number) => {
    console.log(id);

    navigate(`/createVilla?id=${id}`);
  };

  const handleDelete = async (id: number) => {
    const response = await deleteVilla(id);
    if (response.isSuccess) {
      console.log("Вилла удалена");
      loadVillas();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!villas.length) {
    return <div>No villas available</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div>
          <h1 className={styles.blueText}>Список вилл</h1>
        </div>
        <div>
          <button className={styles.createVilla} onClick={handleCreate}>
            Создать виллу
          </button>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Название</th>
            <th>Номер</th>
            <th>Вместительность</th>
            <th>Цена</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {villas.map((villa) => (
            <tr key={villa.id}>
              <td>{villa.name}</td>
              <td>{villa.id}</td>
              <td>{villa.occupancy}</td>
              <td>{villa.rate} р</td>
              <td>
                <button
                  onClick={() => {
                    handleEdit(villa.id);
                  }}
                  className={`${styles.editBtn} ${styles.controlBtn}`}
                >
                  <EditIcon className={styles.icon} />
                </button>{" "}
                <button
                  className={`${styles.deleteBtn} ${styles.controlBtn}`}
                  onClick={() => {
                    handleDelete(villa.id);
                  }}
                >
                  <TrashIcon className={styles.icon} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VillasApi;
