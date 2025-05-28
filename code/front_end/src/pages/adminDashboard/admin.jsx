import React, { useState } from "react";
import ProductsManagement from "../../components/productManagement/ProductManagement";
import OrdersManagement from "../../components/OrdersMangement/OrdersManagement";
import UsersManagement from "../../components/UsersManagement/UserManagement";
import styles from "./admin.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [manageSection, setManageSection] = useState("product"); // default to product

  const handleClick = (section) => {
    setManageSection(section);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };
  return (
    <div className={styles.dashboard}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <button onClick={handleLogout} className={styles.logout}>
          logout
        </button>
      </div>
      <p className={styles.description}>
        Here you can manage products, users, and orders.
      </p>
      <p className={styles.description}>Choose what you want to manage</p>

      <div className={styles.navBar}>
        <button
          className={`${styles.navButton} ${
            manageSection === "product" ? styles.navButtonActive : ""
          }`}
          onClick={() => handleClick("product")}>
          Product
        </button>
        <button
          className={`${styles.navButton} ${
            manageSection === "orders" ? styles.navButtonActive : ""
          }`}
          onClick={() => handleClick("orders")}>
          Orders
        </button>
        <button
          className={`${styles.navButton} ${
            manageSection === "users" ? styles.navButtonActive : ""
          }`}
          onClick={() => handleClick("users")}>
          Users
        </button>
      </div>

      <div className={styles.content}>
        {manageSection === "product" && <ProductsManagement />}
        {manageSection === "orders" && <OrdersManagement />}
        {manageSection === "users" && <UsersManagement />}
      </div>
    </div>
  );
}

export default AdminDashboard;
