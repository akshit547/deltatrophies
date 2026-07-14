import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { Helmet } from 'react-helmet-async';

function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'all';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get('/categories');
        setCategories(res.data.categories);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = '/products';
        const params = [];
        if (selectedCategory !== 'all') params.push(`category=${selectedCategory}`);
        if (searchQuery) params.push(`search=${searchQuery}`);
        if (params.length) url += '?' + params.join('&');
        const res = await API.get(url);
        setProducts(res.data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (slug) => {
    if (slug === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: slug });
    }
  };

  return (
    <div className="bg-darkbg min-h-screen pt-24">
      <Helmet>
  <title>Trophy Collections — Delta Industries Jalandhar | 259+ Designs</title>
  <meta name="description" content="Browse 259+ premium trophy designs including plastic cups, metal cups, fiber cups, iron cups and wooden trophies. Custom awards for sports, corporate events and schools. Delta Industries, Jalandhar." />
</Helmet>
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2">
            Our Products
          </p>
          <h1 className="text-white text-4xl font-bold">Collections</h1>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-96 bg-white/5 border border-gold/20 rounded px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold text-sm"
          />
        </div>

        <div className="flex gap-8">

          {/* Sidebar */}
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <p className="text-white/30 tracking-widest uppercase text-sm">
                  Loading...
                </p>
              </div>
            ) : products.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <p className="text-white/30 tracking-widest uppercase text-sm">
                  No products found
                </p>
              </div>
            ) : (
              <>
                <p className="text-white/30 text-sm mb-6">
                  {products.length} products found
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Shop;