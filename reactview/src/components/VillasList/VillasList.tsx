import React, { useEffect, useState } from "react";
import styles from "./VillasList.module.css";
import VillaCard from "../VillaCard/VillaCard";
import { fetchVillas } from "../../utils/villas/villas";
import { Link, useNavigate } from "react-router-dom";

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

const VillasList = () => {
  const [villas, setVillas] = useState<Villa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    loadVillas();
  }, []);

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
    <div className={styles.villasList}>
      {villas.map((villa) => (
        <VillaCard
          key={villa.id}
          name={villa.name}
          details={villa.details}
          rate={villa.rate}
          occupancy={villa.occupancy}
          sqft={villa.sqft}
          imageUrl={villa.imageUrl}
          amenity={villa.amenity}
        />
      ))}
    </div>
  );
};

export default VillasList;
