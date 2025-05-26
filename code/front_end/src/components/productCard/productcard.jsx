import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./productcard.module.css";

export default function ProductsCard() {
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.item);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  // Extract unique categories from products
  const getCategories = () => {
    const categories = new Set(products.map((product) => product.category));
    return ["All", ...Array.from(categories)].filter(Boolean);
  };
  // Handle category filter change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // The filtering will be handled by the useEffect below
  };
  // Filter products when category or search term changes
  useEffect(() => {
    let result = products;
    // Apply category filter
    if (activeCategory !== "All") {
      result = result.filter((product) => product.category === activeCategory);
    }
    // Apply search filter (case-insensitive)
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchLower)
      );
    }
    setFilteredProducts(result);
  }, [activeCategory, searchTerm, products]);
  // Navigate to product detail page
  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <div>
      <div className={styles.searchAndFilters}>
        {/* Search Bar */}
        <form className={styles.searchBar} onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            aria-label="Search products"
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>
        {/* Category Filters */}
        <div className={styles.categoryFilters}>
          {getCategories().map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                activeCategory === category ? styles.categoryButtonActive : ""
              }`}
              onClick={() => handleCategoryChange(category)}>
              {category}
            </button>
          ))}
        </div>
      </div>
      {/* Products Grid */}
      <div className={styles.productsGrid}>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            id={product.id}
            className={styles.card}
            onClick={() => handleClick(product.id)}>
            <div className={styles.imageContainer}>
              <img src={product.image_url} alt={product.name} />
              {product.category && (
                <div className={styles.categoryTag}>{product.category}</div>
              )}
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.title}>{product.name}</h3>
              <p className={styles.description}>{product.description}</p>
              <div className={styles.cardFooter}>
                <p className={styles.price}>{product.price}$</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* No Products Found */}
      {filteredProducts.length === 0 && (
        <div style={{ textAlign: "center", padding: "3rem 0" }}>
          <p style={{ fontSize: "1.125rem", color: "#6b7280" }}>
            {searchTerm
              ? `No products found matching "${searchTerm}"`
              : "No products found in this category."}
          </p>
        </div>
      )}
    </div>
  );
}
