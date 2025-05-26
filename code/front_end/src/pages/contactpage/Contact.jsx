import { useState } from "react";
import { Mail, Phone, User } from "lucide-react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      alert(
        "Message Sent: Thank you for contacting us. We'll respond shortly."
      );
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>
            We'd love to hear from you. Whether you have a question about our
            products, orders, or anything else, our team is ready to assist you.
          </p>
        </div>

        <div className="contact-cards">
          <div className="contact-card">
            <div className="card-header">
              <h2>
                <Mail size={20} style={{ color: "#d4af37" }} /> Email Us
              </h2>
              <p>Send us an email and we'll get back to you within 24 hours.</p>
            </div>
            <div className="card-content">
              <a href="mailto:info@elegance.com" style={{ color: "#d4af37" }}>
                info@elegance.com
              </a>
            </div>
          </div>

          <div className="contact-card">
            <div className="card-header">
              <h2>
                <Phone size={20} style={{ color: "#d4af37" }} /> Call Us
              </h2>
              <p>Call our customer support team during business hours.</p>
            </div>
            <div className="card-content">
              <a href="tel:+123456789" style={{ color: "#d4af37" }}>
                +1 (234) 567-89
              </a>
              <p className="note">Monday - Friday: 9am - 5pm</p>
            </div>
          </div>

          <div className="contact-card">
            <div className="card-header">
              <h2>
                <User size={20} style={{ color: "#d4af37" }} /> Visit Us
              </h2>
              <p>
                Visit our flagship store and experience our fragrances in
                person.
              </p>
            </div>
            <div className="card-content">
              <address>
                123 Fragrance Avenue
                <br />
                Paris, France
                <br />
                12345
              </address>
            </div>
          </div>
        </div>

        <div className="form-card">
          <div className="form-header">
            <h2>Send Us a Message</h2>
            <p>
              Fill out this form and we'll get back to you as soon as possible.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="send-button"
              disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
