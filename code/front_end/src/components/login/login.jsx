import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/userAction";
import styles from "./login.module.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isFail, setIsFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    setIsFail(!!user?.message);
    if (user?.message) {
      setError(user.message);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Call the login function and wait for the result
      const response = await dispatch(login(formData));

      // Access the user directly from the response
      const userData = JSON.parse(localStorage.getItem("user"));

      if (userData?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/shop");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.formtag}>
        <div>
          <h1 className={styles.title}>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formgroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className={styles.formgroup}>
            <div className={styles.passwordHeader}>
              <label htmlFor="password">Password</label>
              <Link to="#" className={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          <div className={styles.div}>
            <p className={styles.p}>
              Don't have an account?{" "}
              <Link className={styles.links} to="/signup">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
