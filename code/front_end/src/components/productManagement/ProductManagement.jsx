import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../redux/actions/productAction";
import styles from "./ProductManagement.module.css";
import Loading from "../loading/loading";

export default function ProductsManagement() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.item);
  const isLoading = useSelector((state) => state.product.isloading);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    category: "",
    image: null,
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    if (editId) {
      dispatch(updateProduct(editId, data));
      setEditId(null);
    } else {
      dispatch(addProduct(data));
    }

    setFormData({
      name: "",
      description: "",
      price: "",
      stock_quantity: "",
      category: "",
      image: null,
    });
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock_quantity: product.stock_quantity,
      category: product.category,
      image: null, // can't preload image file input, so keep null
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  if (isLoading)
    return (<Loading/>)

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h1 className={styles.title}>Products Management</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <textarea
            className={styles.textarea}
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            type="number"
            name="price"
            step="0.01"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            type="number"
            name="stock_quantity"
            placeholder="Stock Quantity"
            value={formData.stock_quantity}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            type="file"
            name="image"
            onChange={handleChange}
          />

          <button className={styles.submitButton} type="submit">
            {editId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      <hr className={styles.divider} />

      <ul className={styles.productsList}>
        {products.map((product) => (
          <li key={product.id} className={styles.productItem}>
            <div className={styles.productInfo}>
              <div className={styles.productName}>{product.name}</div>
              <div className={styles.productMeta}>
                Category: {product.category} | Stock: {product.stock_quantity}
              </div>
              <div className={styles.productPrice}>${product.price}</div>
            </div>
            <div className={styles.actions}>
              <button
                className={styles.editButton}
                onClick={() => handleEdit(product)}>
                Edit
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(product.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
