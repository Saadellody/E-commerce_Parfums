import styles from "./OrdersManagement.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8000/api/admin/orders",
        {
          withCredentials: true,
        }
      );
      setOrders(response.data);
    } catch (err) {
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // Get CSRF token first
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      const csrfToken = Cookies.get("XSRF-TOKEN");

      await axios.put(
        `http://localhost:8000/api/admin/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            "X-XSRF-TOKEN": csrfToken,
          },
          withCredentials: true,
        }
      );

      fetchOrders(); // Refresh after update
    } catch (err) {
      setError("Failed to update order status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Gestion des Commandes</h2>

        <div className={styles.filterSection}>
          <label className={styles.filterLabel}>Filtrer par statut:</label>
          <select
            className={styles.filterSelect}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">Toutes</option>
            <option value="pending">pending</option>
            <option value="processing">processing</option>
            <option value="shipped">shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>
      </div>

      <hr className={styles.divider} />

      {loading ? (
        <p className={styles.loadingText}>Chargement des commandes...</p>
      ) : error ? (
        <p className={styles.errorText}>{error}</p>
      ) : (
        <div className={styles.ordersList}>
          {filteredOrders.map((order) => (
            <div key={order.id} className={styles.orderItem}>
              <div className={styles.orderHeader}>
                <h4 className={styles.orderTitle}>Commande #{order.id}</h4>
                <span
                  className={`${styles.statusBadge} ${
                    styles[`status${order.status}`]
                  }`}>
                  {order.status}
                </span>
              </div>

              <div className={styles.orderInfo}>
                <div className={styles.customerInfo}>
                  <p className={styles.customerName}>
                    <strong>Client:</strong> {order.user?.name}
                  </p>
                  <p className={styles.customerEmail}>{order.user?.email}</p>
                  <p className={styles.customerEmail}>{order.user?.numero}</p>
                </div>
                <div className={styles.statusControl}>
                  <label className={styles.statusLabel}>
                    Changer le statut:
                  </label>
                  <select
                    className={styles.statusSelect}
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order.id, e.target.value)
                    }>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                </div>
              </div>

              <div className={styles.productsSection}>
                <h5 className={styles.productsTitle}>Produits:</h5>
                <ul className={styles.productsList}>
                  {order.order_items.map((item) => (
                    <li key={item.id} className={styles.productItem}>
                      <div className={styles.productInfo}>
                        <span className={styles.productName}>
                          {item.product.name}
                        </span>
                        <span className={styles.productMeta}>
                          {item.quantity} pcs
                        </span>
                      </div>
                      <span className={styles.productPrice}>${item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;
