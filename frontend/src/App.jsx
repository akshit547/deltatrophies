import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LeadPopup from './components/LeadPopup';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Gallery from './pages/Gallery';
import Heritage from './pages/Heritage';
import Contact from './pages/Contact';
import Distributors from './pages/Distributors';
import AdminLogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageProducts from './pages/admin/ManageProducts';
import Leads from './pages/admin/Leads';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <LeadPopup />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/leads" element={<Leads />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<ManageProducts />} />
        <Route path="/collections" element={<Shop />} />
        <Route path="/collections/:id" element={<ProductDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/heritage" element={<Heritage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/distributors" element={<Distributors />} />
      </Routes>
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;