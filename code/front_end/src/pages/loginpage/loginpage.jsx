import Login from "../../components/login/login";
import styles from "./loginpage.module.css";
export default function LoginPage() {
  return (
    <div className={styles.loginpage}>
      <div className={styles.login}>
        <Login />
      </div>
    </div>
  );
}
