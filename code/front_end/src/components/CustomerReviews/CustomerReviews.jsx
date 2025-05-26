import React from "react";
import styles from "./CustomerReviews.module.css";

const testimonials = [
  {
    quote:
      "The fragrances from Élégance are exquisite. I receive compliments every time I wear my Enchanted Rose perfume.",
    author: "Marie L.",
  },
  {
    quote:
      "After years of searching, I finally found my signature scent. Noir Mystery is simply unforgettable!",
    author: "David K.",
  },
  {
    quote:
      "The attention to detail in these fragrances is remarkable. Each scent tells its own unique story.",
    author: "Sophie T.",
  },
];

const Testimonials = () => {
  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>What Our Customers Say</h2>

        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={styles.star}>
                    ★
                  </span>
                ))}
              </div>
              <p className={styles.quote}>&ldquo;{testimonial.quote}&rdquo;</p>
              <p className={styles.author}>— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
