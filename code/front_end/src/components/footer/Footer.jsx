import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="footer-title">Élégance</h3>
            <p className="footer-description">
              Discover luxury fragrances that captivate the senses and leave a
              lasting impression.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-link" aria-label="Facebook">
                {/* Facebook icon */}
                <svg
                  className="social-icon"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                {/* Instagram icon */}
                <svg
                  className="social-icon"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 ... 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Quick Links</h4>
            <ul>
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  About
                </Link>
              </li>
              <li>
                <Link to="/shop" className="footer-link">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/login" className="footer-link">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-heading">Contact</h4>
            <address>
              <p>123 Fragrance Avenue</p>
              <p>Paris, France</p>
              <p>12345</p>
              <p>
                <span className="highlight">Email:</span>{" "}
                <a href="mailto:info@elegance.com" className="footer-link">
                  info@elegance.com
                </a>
              </p>
              <p>
                <span className="highlight">Phone:</span>{" "}
                <a href="tel:+123456789" className="footer-link">
                  +1 (234) 567-89
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} Élégance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
