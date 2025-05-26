import React from "react";
import styles from "./hersosection.module.css";

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.imageContainer}>
        <img
          src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Luxury perfumes"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}></div>
      </div>

      <div className={styles.heroContent}>
        <div className={styles.textContainer}>
          <h1 className={styles.heading}>Discover Your Signature Scent</h1>
          <p className={styles.description}>
            Indulge in luxurious fragrances crafted with the finest ingredients.
            Find the perfect scent that captures your essence.
          </p>
          <div className={styles.buttonGroup}>
            <a href="/shop" className={styles.primaryButton}>
              Explore Collection
            </a>
            <a href="/about" className={styles.outlineButton}>
              Our Story
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
