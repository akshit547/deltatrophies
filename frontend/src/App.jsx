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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <LeadPopup />
      <Routes>
        <Route path="/" element={<Home />} />
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