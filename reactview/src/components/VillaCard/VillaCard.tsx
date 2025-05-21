import react from "react";
import styles from "./VillaCard.module.css";

interface Props {
  name: string;
  details?: string;
  rate: number;
  occupancy?: number;
  sqft?: number;
  imageUrl?: string;
  amenity?: string;
}

const VillaCard: React.FC<Props> = ({
  name,
  details,
  rate,
  occupancy,
  sqft,
  imageUrl,
  amenity = "",
}) => {
  return (
    <div className={styles.villaCard}>
      <div>
        <img src={imageUrl} className={styles.img} />
      </div>
      <div>
        <h2 className={styles.name}>{name}</h2>
        {details && <p className={styles.description}>{details}</p>}
        <div className={styles.infoBlock}>
          {sqft && (
            <p className={styles.description}>
              <span className={styles.info}>Площадь:</span> {sqft} м
              <sup className={styles.sup}>2</sup>
            </p>
          )}
          {occupancy && occupancy > 0 && (
            <p className={styles.description}>
              <span className={styles.info}>Вместительность: </span>
              {occupancy != 1 ? "до" : ""} {occupancy} человек
            </p>
          )}
        </div>
        {amenity != "" && (
          <p className={styles.description}>
            <span className={styles.info}>Удобства:</span> {amenity}
          </p>
        )}
        <h3 className={styles.price}>{rate} р</h3>
      </div>
    </div>
  );
};

export default VillaCard;
