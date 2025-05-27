import { useState } from "react";
import styles from "./signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions/userAction";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    numero: "",
    email: "",
    password: "",
    role: "customer",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await dispatch(register(formData));
      navigate("/shop");
    } catch (err) {
      console.error("Registration failed", err);
      setError(
        "Registration failed. Please check your information and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.formtag}>
        <div>
          <h1 className={styles.title}>Create Account</h1>
          <p>Sign up to get started with our services</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formgroup}>
            <label htmlFor="name">Username</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>

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
            <label htmlFor="numero">Phone Number</label>
            <input
              type="text"
              id="numero"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              placeholder="e.g. 0601020304"
              required
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a secure password"
              required
            />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>

          <div className={styles.div}>
            <p className={styles.p}>
              Already have an account?
              <Link className={styles.links} to="/login">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
