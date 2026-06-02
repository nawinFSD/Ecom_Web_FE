import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import LoginPersonal from "./pages/RegistrationPersonalPage";
import LoginAddress from "./pages/RegistrationAddressPage";
import Home from "./pages/HomePage";
import Products from "./pages/ProductsPage";
import ProductsList from "./pages/ProductsListPage";

function App() {
  return (
    <BrowserRouter>  
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<LoginPersonal />} />
        <Route path="/Login2" element={<LoginAddress />} />
        <Route path="/home" element={<Home />} />
         <Route path="/products" element={<Products />} />
         <Route path="/productsList" element={<ProductsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;