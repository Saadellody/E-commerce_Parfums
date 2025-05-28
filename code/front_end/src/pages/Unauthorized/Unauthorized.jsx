import React from "react";
import styles from "./Unauthorized.module.css"; // Make sure to rename your CSS file too if needed
import { useNavigate } from "react-router-dom";

export default function Undefined() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.message}>
          Sorry, the page you’re looking for doesn’t exist or is undefined.
        </p>
        <button
          className={styles.button}
          onClick={() => navigate("/")}
          aria-label="Go back to home">
          Go to Home
        </button>
      </div>
    </div>
  );
}
