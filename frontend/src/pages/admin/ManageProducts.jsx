import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', sku: '', description: '',
    category_id: '', material: ''
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) { navigate('/admin'); return; }
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const res = await API.get('/products');
    setProducts(res.data.products);
  };

  const fetchCategories = async () => {
    const res = await API.get('/categories');
    setCategories(res.data.categories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      images.forEach(img => data.append('images', img));

      await API.post('/products', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setShowForm(false);
      setFormData({ name: '', sku: '', description: '', category_id: '', material: '' });
      setImages([]);
      fetchProducts();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    await API.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchProducts();
  };

  return (
    <div className="bg-darkbg min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="flex items-center justify-between mb-10">
          <h1 className="text-white text-3xl font-bold">Manage Products</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gold text-darkbg font-bold px-6 py-3 text-sm tracking-widest uppercase hover:bg-gold/90 transition-colors">
            {showForm ? 'Cancel' : '+ Add Product'}
          </button>
        </div>

        {/* Add Product Form */}
        {showForm && (
          <form onSubmit={handleSubmit}
            className="border border-gold/20 p-8 mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Product Name *"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              className="bg-white/5 border border-gold/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold text-sm"
            />
            <input
              placeholder="SKU (e.g. PF-167)"
              value={formData.sku}
              onChange={(e) => setFormData({...formData, sku: e.target.value})}
              className="bg-white/5 border border-gold/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold text-sm"
            />
            <select
              value={formData.category_id}
              onChange={(e) => setFormData({...formData, category_id: e.target.value})}
              required
              className="bg-darkbg border border-gold/20 px-4 py-3 text-white focus:outline-none focus:border-gold text-sm">
              <option value="">Select Category *</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <input
              placeholder="Material (e.g. Crystal, Metal)"
              value={formData.material}
              onChange={(e) => setFormData({...formData, material: e.target.value})}
              className="bg-white/5 border border-gold/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold text-sm"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="bg-white/5 border border-gold/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold text-sm resize-none md:col-span-2"
            />
            <div className="md:col-span-2">
              <label className="text-white/50 text-xs tracking-wider uppercase block mb-2">
                Product Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setImages([...e.target.files])}
                className="text-white/50 text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-gold text-darkbg font-bold px-8 py-3 text-sm tracking-widest uppercase hover:bg-gold/90 transition-colors disabled:opacity-50">
                {loading ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </form>
        )}

        {/* Products Table */}
        <div className="border border-gold/20">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold/20">
                <th className="text-gold text-xs tracking-widest uppercase text-left px-6 py-4">Product</th>
                <th className="text-gold text-xs tracking-widest uppercase text-left px-6 py-4">SKU</th>
                <th className="text-gold text-xs tracking-widest uppercase text-left px-6 py-4">Category</th>
                <th className="text-gold text-xs tracking-widest uppercase text-left px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-white/30 py-12 text-sm">
                    No products yet. Add your first product above.
                  </td>
                </tr>
              ) : (
                products.map(product => (
                  <tr key={product.id} className="border-b border-gold/10 hover:bg-white/5">
                    <td className="px-6 py-4 text-white text-sm">{product.name}</td>
                    <td className="px-6 py-4 text-white/50 text-sm">{product.sku}</td>
                    <td className="px-6 py-4 text-white/50 text-sm">{product.category_name}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-400 hover:text-red-300 text-xs tracking-wider uppercase transition-colors">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default ManageProducts;