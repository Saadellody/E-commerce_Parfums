import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_orders } from "../../redux/actions/orderActions";
import styles from "./orders.module.css";
import Loading from "../../components/loading/loading";

export default function OrdersPage() {
  // const dispatch = useDispatch();
  // const orders = useSelector((state) => state.order.orders || []);
  // const loading = useSelector((state) => state.order.isLoading);
  // const error = useSelector((state) => state.order.error);
  // const [expandedOrderId, setExpandedOrderId] = useState(null);

  // useEffect(() => {
  //   dispatch(fetch_orders());
  // }, [dispatch]);

  // const toggleDetails = (id) => {
  //   setExpandedOrderId(expandedOrderId === id ? null : id);
  // };

  // return (
  //   <div className={styles.orderspage}>
  //     <h2>My Orders</h2>
  //     {loading ? (
  //       <Loading />
  //     ) : error ? (
  //       <p className={styles.error}>{error}</p>
  //     ) : orders.length === 0 ? (
  //       <p>No orders found.</p>
  //     ) : (
  //       <ul className={styles.orderList}>
  //         {orders.map((order) => (
  //           <li key={order.id} className={styles.order}>
  //             <div className={styles.orderHeader}>
  //               <div className={styles.orderSummary}>
  //                 <strong>Order #{order.id}</strong>
  //                 <span className={styles.totalPrice}>
  //                   Total: ${order.total_price}
  //                 </span>
  //                 <span
  //                   className={`${styles.statusBadge} ${styles[order.status]}`}>
  //                   {order.status}
  //                 </span>
  //               </div>

  //               <button onClick={() => toggleDetails(order.id)}>
  //                 {expandedOrderId === order.id
  //                   ? "Hide Details"
  //                   : "View Details"}
  //               </button>
  //             </div>

  //             {expandedOrderId === order.id && (
  //               <ul className={styles.orderItems}>
  //                 {order.order_items.map((item) => (
  //                   <li key={item.id} className={styles.orderItem}>
  //                     <img
  //                       src={`http://localhost:8000/storage/${item.product.image}`}
  //                       alt={item.product.name}
  //                       className={styles.productImage}
  //                     />
  //                     <div>
  //                       <p>
  //                         <strong>{item.product.name}</strong>
  //                       </p>
  //                       <p>
  //                         Qty: {item.quantity} – Price: ${item.price}
  //                       </p>
  //                     </div>
  //                   </li>
  //                 ))}
  //               </ul>
  //             )}
  //           </li>
  //         ))}
  //       </ul>
  //     )}
  //   </div>
  // );
}
