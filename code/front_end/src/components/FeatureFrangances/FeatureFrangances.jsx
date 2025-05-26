import { useSelector, useDispatch } from "react-redux";
import styles from "./FeatureFrangances.module.css";
import { useEffect } from "react";
import { fetchProducts } from "../../redux/actions/productAction";
import { Link } from "react-router-dom";

const FeaturedFragrances = () => {
  const featuredProducts = useSelector((state) => state.product.item);
  const dispatch = useDispatch();

  const products = featuredProducts.slice(0, 3);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Fragrances</h2>
          <p className={styles.subtitle}>
            Explore our most coveted scents, crafted with passion and precision
            for the discerning fragrance connoisseur.
          </p>
        </div>

        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img
                  src={product.image_url}
                  alt={product.name}
                  className={styles.image}
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>
                  {product.description}
                </p>
                <div className={styles.productFooter}>
                  <span className={styles.price}>${product.price}</span>
                  <Link
                    to={`/product/${product.id}`}
                    className={styles.outlineButton}>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.viewAll}>
          <a href="/shop" className={styles.ghostButton}>
            View All Products
            <svg
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M5 12l5-5-5-5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedFragrances;
