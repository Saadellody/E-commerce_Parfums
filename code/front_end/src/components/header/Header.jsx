import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/userAction";
import styles from "./navbar.module.css";
import "@fontsource/playfair-display";

export default function Header() {
  const [isClicked, setIsClicked] = useState(false);
  const [isProfileClicked, setIsProfileClicked] = useState(false);

  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  const handleprofile = () => {
    setIsProfileClicked((state) => !state);
  };

  return (
    <header>
      <nav className={styles.navbar}>
        <h2 className={styles.image}>Élégance</h2>
        <div className={styles.manu}>
          <div className={styles.linkWrapper}>
            {/* New wrapper */}
            <ul
              className={`${styles.navbarlink} ${
                isClicked ? styles.show : ""
              }`}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/About">About</Link>
              </li>
              <li>
                <Link to="/Contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/cart" className={styles.cartimg}>
                  <img src="cart.svg" alt="cart" />
                </Link>
                <p
                  onClick={handleprofile}
                  className={styles.profileimage}
                  to="/profile">
                  <img src="profile.svg" alt="profile_imgage" />
                </p>
              </>
            ) : (
              <>
                <button className={styles.login}>
                  <Link to="/Login">Login</Link>
                </button>
                <button className={styles.signup}>
                  <Link to="/signup">Sign up</Link>
                </button>
              </>
            )}
            {isAuth && isProfileClicked && (
              <div
                className={`${styles.profilelink} ${
                  isProfileClicked ? styles.apear : ""
                }`}>
                <Link className={styles.profile} to="/profile">
                  Profile
                </Link>
                <button onClick={handleLogout} className={styles.logout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={styles.mobile}>
          <i
            onClick={() => setIsClicked((prev) => !prev)}
            className={isClicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </nav>
    </header>
  );
}
