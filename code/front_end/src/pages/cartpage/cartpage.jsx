import { useDispatch, useSelector } from "react-redux";
import styles from "./cartpage.module.css";
import { useEffect, useState } from "react";
import {
  fetch_cart,
  update_cart_quantity,
  delete_cart_item,
  clear_cart,
} from "../../redux/actions/cartAction";
import Loading from "../../components/loading/loading";
import { create_order } from "../../redux/actions/orderActions";
import { useNavigate } from "react-router-dom";

export default function Cartpage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartitems = useSelector((state) =>
    Array.isArray(state.cart.cartitems) ? state.cart.cartitems : []
  );

  const isloading = useSelector((state) => state.cart.isloading);
  const error = useSelector((state) => state.cart.error);
  const message = useSelector((state) => state.cart.message);
  const userId = useSelector((state) => state.user.user.id); // or state.user

  // Local state to store quantities per item
  const [quantities, setQuantities] = useState({});
  // Track items being updated or deleted
  const [updatingItems, setUpdatingItems] = useState({});
  // Local state for payment method
  const [paymentMethod, setPaymentMethod] = useState("COD"); // default to COD

  // Load cart on mount
  useEffect(() => {
    dispatch(fetch_cart());
  }, [dispatch]);

  // Update local quantities state when cartitems change
  useEffect(() => {
    if (cartitems.length > 0 && Object.keys(quantities).length === 0) {
      const initialQuantities = {};
      cartitems.forEach((item) => {
        initialQuantities[item.id] = item.quantity;
      });
      setQuantities(initialQuantities);
    }
  }, [cartitems, quantities]);

  // Handle quantity input changes
  const handleQuantityChange = (id, value) => {
    if (value < 1) return; // Prevent less than 1 quantity
    setQuantities((prev) => ({ ...prev, [id]: value }));
  };

  // Dispatch update quantity action
  const handleUpdateClick = (id) => {
    const newQty = quantities[id];
    setUpdatingItems((prev) => ({ ...prev, [id]: "updating" }));
    dispatch(update_cart_quantity(id, newQty)).finally(() => {
      setUpdatingItems((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    });
  };

  // Dispatch delete item action
  const handleDeleteClick = (id) => {
    if (
      window.confirm(
        "Are you sure you want to remove this item from your cart?"
      )
    ) {
      setUpdatingItems((prev) => ({ ...prev, [id]: "deleting" }));
      dispatch(delete_cart_item(id)).finally(() => {
        setUpdatingItems((prev) => {
          const updated = { ...prev };
          delete updated[id];
          return updated;
        });
      });
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartitems
      .reduce((total, item) => {
        return total + item.price * (quantities[item.id] ?? item.quantity);
      }, 0)
      .toFixed(2);
  };

  if (isloading && cartitems.length === 0) {
    return <Loading />;
  }

  const handlePurchase = async () => {
    const total = parseFloat(calculateTotal());

    const orderData = {
      user_id: userId,
      total_price: total,
      status: "pending",
    };
    console.log("orderData to send:", orderData);

    const orderItems = cartitems.map((item) => ({
      product_id: item.product_id || item.id,
      quantity: quantities[item.id] || item.quantity,
      price: item.price,
    }));

    await dispatch(create_order(orderData, orderItems));

    // Wait for cart to be cleared
    await dispatch(clear_cart());

    navigate("/orders");
  };

  return (
    <div className={styles.cartpage}>
      {error && <div className={styles.error}>{error}</div>}
      {message && <div className={styles.message}>{message}</div>}

      <div className={styles.items}>
        {cartitems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartitems.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.img}>
                <img src={item.image_url} alt={item.name} />
              </div>
              <div className={styles.left}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p className={styles.price}>
                  <strong>${item.price}</strong>
                </p>
                <div className={styles.actions}>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={quantities[item.id] || item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, Number(e.target.value))
                    }
                    disabled={updatingItems[item.id]}
                  />
                  <button
                    onClick={() => handleUpdateClick(item.id)}
                    disabled={
                      updatingItems[item.id] ||
                      quantities[item.id] === item.quantity
                    }
                    className={styles.updateBtn}>
                    {updatingItems[item.id] === "updating"
                      ? "Updating..."
                      : "Update"}
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item.id)}
                    disabled={updatingItems[item.id]}
                    className={styles.deleteBtn}>
                    {updatingItems[item.id] === "deleting"
                      ? "Removing..."
                      : "Remove"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {cartitems.length > 0 && (
        <div className={styles.checkout}>
          <div className={styles.summary}>
            <h3>Order Summary</h3>
            <div className={styles.totals}>
              <div className={styles.subtotal}>
                <span>Subtotal:</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className={styles.paymentMethod}>
              <h4>Payment Method</h4>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />
                COD
              </label>
              <label style={{ opacity: 0.5, marginLeft: "1rem" }}>
                <input
                  type="radio"
                  name="payment"
                  value="Card"
                  checked={paymentMethod === "Card"}
                  onChange={() => setPaymentMethod("Card")}
                  disabled
                />
                Card
              </label>
            </div>

            <button className={styles.checkoutBtn} onClick={handlePurchase}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
