import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./productpage.module.css";
import "boxicons/css/boxicons.min.css";
import Cookies from "js-cookie";

export default function ProductPage() {
  // const [successMessage, setSuccessMessage] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  // const { id } = useParams();

  // const navigate = useNavigate();
  // const products = useSelector((state) => state.product.item);

  // const product = products?.find((product) => product.id === Number(id));

  // const [inputData, setInputData] = useState({
  //   quantity: 1,
  //   product_id: Number(id),
  //   price: product.price,
  // });

  // const handleInput = (e) => {
  //   const { value } = e.target;

  //   if (value > 0) {
  //     setInputData((prevState) => ({
  //       ...prevState,
  //       quantity: value,
  //     }));
  //   }
  // };

  // const handleSubmit = async () => {
  //   try {
  //     const csrfToken = Cookies.get("XSRF-TOKEN");
  //     await axios.post("http://localhost:8000/api/cartitem", inputData, {
  //       headers: { "X-XSRF-TOKEN": csrfToken },
  //       withCredentials: true,
  //     });
  //     setSuccessMessage("✅ Product added to cart successfully!");
  //     setErrorMessage(""); // <-- here
  //   } catch (e) {
  //     console.log(e);
  //     setErrorMessage(
  //       "❌ Failed to add product to cart. Please connect first."
  //     );
  //     setSuccessMessage("");
  //     await setTimeout(() => {
  //       setErrorMessage("");
  //       navigate("/login");
  //     }, 3000);
  //   }
  // };
  // return (
  //   <div className={styles.productPage}>
  //     <div className={styles.container}>
  //       <button className={styles.backButton} onClick={() => navigate("/shop")}>
  //         ← Back to Products
  //       </button>

  //       <div className={styles.product}>
  //         <div className={styles.image}>
  //           <img src={product.image_url} alt={product.name} />
  //         </div>

  //         <div className={styles.left}>
  //           <h1 className={styles.productName}>{product.name}</h1>

  //           <div className={styles.categoryTag}>{product.category}</div>

  //           <p className={styles.price}>${product.price}</p>

  //           <p className={styles.description}>{product.description}</p>

  //           <div className={styles.quantityWrapper}>
  //             <span>Quantity:</span>
  //             <input
  //               type="number"
  //               name="quantity"
  //               min="1"
  //               onChange={handleInput}
  //             />
  //           </div>

  //           <button className={styles.addToCartButton} onClick={handleSubmit}>
  //             <img
  //               src="/icons8-caddie-48.png"
  //               alt=""
  //               style={{ width: "24px", height: "24px" }}
  //             />
  //             Add to cart
  //           </button>
  //           {successMessage && (
  //             <div className={styles.successAlert}>{successMessage}</div>
  //           )}
  //           {errorMessage && (
  //             <div className={styles.errorAlert}>{errorMessage}</div>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
