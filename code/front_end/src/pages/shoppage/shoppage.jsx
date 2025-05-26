import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/loading/loading";
import ProductsCard from "../../components/productCard/productcard";
import { fetchProducts } from "../../redux/actions/productAction";
import styles from "./shoppage.module.css";

export default function ShopPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.product.isloading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={styles.shoppage}>
      <div className={styles.middlecontent}>
        {isLoading ? <Loading /> : <ProductsCard />}
      </div>
    </div>
  );
}
