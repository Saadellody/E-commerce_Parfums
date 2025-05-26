import SignUp from "../../components/signup/signup";
import styles from "./signup.module.css";
export default function SignupPage() {
  return (
    <div className={styles.signuppage}>
      <div className={styles.signup}>
        <SignUp />
      </div>
    </div>
  );
}
