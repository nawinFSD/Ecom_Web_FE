import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/LoginPage";
import LoginPersonal from "./pages/RegistrationPersonalPage";
import LoginAddress from "./pages/RegistrationAddressPage";
import Home from "./pages/HomePage";
import Products from "./pages/ProductsPage";
import ProductsList from "./pages/ProductsListPage";
import PrivacyPolicy from "./pages/PrivacyPolicyPage";
import TermsOfService from "./pages/TermsOfServicePage";
import HelpCenter from "./pages/HelpCenterPage";
import ShippingInfo from "./pages/ShippingInfoPage";
import Returns from "./pages/ReturnsPage";
import ContactUs from "./pages/ContactUsPage";
import AboutUs from "./pages/AboutUsPage";
import Careers from "./pages/CareersPage";
import Press from "./pages/PressPage";
import Blog from "./pages/BlogPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

// Reset scroll position to top or scroll to target hash ID on route navigation
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Small delay to ensure DOM is fully rendered
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 120);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

function App() {
  return (
    <BrowserRouter>  
      <UserProvider>
        <CartProvider>
          <WishlistProvider>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<LoginPersonal />} />
              <Route path="/Login2" element={<LoginAddress />} />
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/productsList" element={<ProductsList />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/shipping-info" element={<ShippingInfo />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/press" element={<Press />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </WishlistProvider>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;