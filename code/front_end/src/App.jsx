import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./pages/homepage/HomePage";
import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/playfair-display";
import Footer from "./components/footer/footer";
import About from "./pages/aboutpage/About";
import Contact from "./pages/contactpage/Contact";
import SignupPage from "./pages/signuppage/singuppage";
import LoginPage from "./pages/loginpage/loginpage";
import ShopPage from "./pages/shoppage/shoppage";
import ProductPage from "./pages/productpage/productpage";
import "boxicons/css/boxicons.min.css";
import CartPage from "./pages/cartpage/cartpage";
import AdminDashboard from "./pages/adminDashboard/admin";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import OrdersPage from "./pages/Orders/orders";

function LayoutWithHeaderFooter({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {isAdminRoute ? (
        <ProtectedRoute requiredRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      ) : (
        <LayoutWithHeaderFooter>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/shop" element={<ShopPage />}></Route>
            <Route path="/product/:id" element={<ProductPage />}></Route>
            <Route path="/cart" element={<CartPage />}></Route>
            <Route path="/orders" element={<OrdersPage />}></Route>
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </LayoutWithHeaderFooter>
      )}
    </>
  );
}
function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
