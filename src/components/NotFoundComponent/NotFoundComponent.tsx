import React from "react";
import styles from "./NotFoundComponent.module.scss";

export const NotFoundComponent: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        🤨 <br /> Ничего не найдено
      </h1>
    </div>
  );
};
