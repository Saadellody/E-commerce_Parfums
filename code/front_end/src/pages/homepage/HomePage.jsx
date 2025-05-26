import Testimonials from "../../components/CustomerReviews/CustomerReviews";
import FeaturedFragrances from "../../components/FeatureFrangances/FeatureFrangances";
import HeroSection from "../../components/herosection/herosection";
import styles from "./homepage.module.css";
import { useRef } from "react";
export default function HomePage() {
  const productreference = useRef(null);

  return (
    <div className={styles.homepage}>
      <HeroSection />
      <FeaturedFragrances />
      <Testimonials />
    </div>
  );
}
