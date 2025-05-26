import React from "react";
import styles from "./Unauthorized.module.css";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.code}>403</h1>
        <h2 className={styles.title}>Unauthorized</h2>
        <p className={styles.message}>
          Sorry, you don’t have permission to access this page.
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
