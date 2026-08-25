import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import API from '../api/axios';
import getImageUrl from '../utils/getImageUrl';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data.product);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/inquiries', {
        ...formData,
        product_id: product.id
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="bg-darkbg min-h-screen flex items-center justify-center">
      <p className="text-white/30 tracking-widest uppercase text-sm">Loading...</p>
    </div>
  );

  if (!product) return (
    <div className="bg-darkbg min-h-screen flex items-center justify-center">
      <p className="text-white/30 tracking-widest uppercase text-sm">Product not found</p>
    </div>
  );

  return (
    <div className="bg-darkbg min-h-screen pt-24">
      <Helmet>
        <title>{product.name} | Delta Industries Jalandhar</title>
        <meta
          name="description"
          content={product.description || `${product.name} — premium ${product.category_name || 'trophy'} from Delta Industries, Jalandhar. Custom awards and corporate mementos since 1998.`}
        />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-white/30 text-xs tracking-wider uppercase mb-10">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link to="/collections" className="hover:text-gold transition-colors">Collections</Link>
          <span>/</span>
          <span className="text-gold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Images */}
          <div>
            <div
              className="bg-white border border-gold/20 flex items-center justify-center mb-4"
              style={{ height: '600px' }}>
              {product.images && product.images.length > 0 ? (
                <img
                  src={getImageUrl(product.images[selectedImage])}
                  alt={product.name}
                  style={{ maxHeight: '600px', maxWidth: '100%', objectFit: 'contain', padding: '16px' }}
                />
              ) : (
                <p className="text-darkbg/30 text-sm">No Image Available</p>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 border bg-white overflow-hidden ${
                      selectedImage === index
                        ? 'border-gold'
                        : 'border-gold/20 hover:border-gold/50'
                    }`}>
                    <img
                      src={getImageUrl(img)}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info + Enquiry Form */}
          <div>
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">
              {product.category_name}
            </p>
            <h1 className="text-white text-3xl font-bold mb-2">
              {product.name}
            </h1>
            {product.sku && (
              <p className="text-white/30 text-xs tracking-wider mb-6">
                SKU: {product.sku}
              </p>
            )}
            {product.description && (
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                {product.description}
              </p>
            )}
            {product.material && (
              <div className="border border-gold/20 px-4 py-3 mb-8 inline-block">
                <p className="text-white/30 text-xs tracking-wider uppercase">
                  Material: <span className="text-gold">{product.material}</span>
                </p>
              </div>
            )}

            {/* Enquiry Form */}
            <div className="border border-gold/20 p-6">
              <h3 className="text-white text-lg font-bold mb-4">
                Enquire About This Product
              </h3>

              {submitted ? (
                <div className="text-center py-6">
                  <p className="text-gold text-2xl mb-2">✓</p>
                  <p className="text-white">Enquiry submitted!</p>
                  <p className="text-white/50 text-sm mt-1">
                    We'll contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div>
                    <label htmlFor="enquiry-name" className="sr-only">Your Name</label>
                    <input
                      id="enquiry-name"
                      name="name"
                      type="text"
                      placeholder="Your Name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="w-full bg-white/5 border border-gold/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="enquiry-email" className="sr-only">Email Address</label>
                    <input
                      id="enquiry-email"
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="w-full bg-white/5 border border-gold/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="enquiry-phone" className="sr-only">Phone Number</label>
                    <input
                      id="enquiry-phone"
                      name="phone"
                      type="tel"
                      placeholder="Phone Number"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                      className="w-full bg-white/5 border border-gold/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="enquiry-message" className="sr-only">Your message (optional)</label>
                    <textarea
                      id="enquiry-message"
                      name="message"
                      placeholder="Your message (optional)"
                      autoComplete="off"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={3}
                      className="w-full bg-white/5 border border-gold/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gold text-darkbg font-bold py-3 tracking-widest uppercase text-sm hover:bg-gold/90 transition-colors">
                    Send Enquiry
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;