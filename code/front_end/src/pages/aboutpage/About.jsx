import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero-sectionn">
        <div className="hero-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
            alt="Our story"
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Our Story</h1>
            <p className="hero-subtitle">
              Crafting exceptional fragrances since 1985
            </p>
          </div>
        </div>
      </section>
      {/* Our Story */}
      <section className="section">
        <div className="section-container">
          <div className="section-text">
            <h2 className="section-title">The Élégance Journey</h2>
            <p>
              Founded in the heart of Paris in 1985, Élégance began as a small
              boutique dedicated to creating unique, handcrafted fragrances that
              would stand apart from mass-produced perfumes. Our founder,
              Isabelle Laurent, a third-generation perfumer, envisioned a brand
              that would honor the traditional art of perfumery while embracing
              innovation.
            </p>
            <p>
              Each Élégance fragrance is created with passion, precision, and
              patience. We source the finest raw materials from around the
              world—Bulgarian roses, Italian bergamot, Indonesian patchouli, and
              Madagascar vanilla, to name just a few. Our master perfumers spend
              years training their noses to detect and blend the most subtle
              notes, creating complex, multi-layered fragrances that evolve
              beautifully on the skin.
            </p>
            <p>
              Today, Élégance has grown into an internationally recognized brand
              with boutiques in Paris, New York, Tokyo, and Dubai. Despite our
              growth, we remain committed to our founding principles: quality
              without compromise, creativity without bounds, and luxury with
              purpose.
            </p>
          </div>
        </div>
      </section>
      {/* Values */}
      <section className="section values-section">
        <div className="section-container">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            {[
              {
                title: "Artisanal Craftsmanship",
                description: "Every bottle of Élégance perfume is crafted...",
              },
              {
                title: "Sustainable Sourcing",
                description: "We believe in responsible sourcing...",
              },
              {
                title: "Timeless Elegance",
                description: "We create fragrances that transcend...",
              },
            ].map((value, index) => (
              <div key={index} className="value-card">
                <h3 className="value-title">{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Our Process */}
      <section className="section">
        <div className="section-container process-section">
          <div className="process-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1608528577891-eb055944f2e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
              alt="Perfume creation process"
              className="process-image"
            />
          </div>
          <div className="process-text">
            <h2 className="section-title">Our Craft</h2>
            <p>
              Creating a fine fragrance is an art form that requires patience,
              expertise, and passion. Our process begins with inspiration—a
              memory, a place, an emotion—that our perfumers translate into an
              olfactory experience
            </p>
            <p>
              Next comes the careful selection of ingredients, followed by
              numerous iterations of blending and testing. It can take hundreds
              of attempts and several years to perfect a single fragrance. Each
              formula contains 40-80 ingredients that must harmonize perfectly.
            </p>
            <p>
              Finally, the fragrance is aged, like a fine wine, to allow the
              ingredients to meld together. Only then is it ready to be bottled
              in our signature crystal flacons, each one a work of art in
              itself.
            </p>
            <Link to="/shop">
              <button className="gold-button">Discover Our Fragrances</button>
            </Link>
          </div>
        </div>
      </section>
      {/* Team */}
      <section className="section team-section">
        <div className="section-container">
          <h2 className="section-title team-title">
            Meet Our Master Perfumers
          </h2>
          <div className="team-grid">
            {[
              {
                name: "Sophie Dubois",
                role: "Head Perfumer",
                bio: "With over 25 years of experience...",
                image:
                  "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              },
              {
                name: "Jean-Pierre Martin",
                role: "Senior Perfumer",
                bio: "Jean-Pierre specializes in woody...",
                image:
                  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              },
              {
                name: "Elena Costa",
                role: "Innovation Director",
                bio: "Elena combines traditional techniques...",
                image:
                  "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              },
            ].map((person, index) => (
              <div key={index} className="team-card">
                <div className="team-image-wrapper">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="team-image"
                  />
                </div>
                <h3 className="team-name">{person.name}</h3>
                <p className="team-role">{person.role}</p>
                <p className="team-bio">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="section cta-section">
        <div className="section-container text-center">
          <h2 className="section-title">Experience Élégance</h2>
          <p className="cta-description">
            Discover our collection of exquisite fragrances and find the scent
            that speaks to your soul.
          </p>
          <Link to="/shop">
            <button className="gold-button gold-button-lg">Shop Now</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
