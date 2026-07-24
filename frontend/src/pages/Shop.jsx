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
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

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
    setMobileFilterOpen(false); // close mobile filter after selection
  };

  return (
    <div className="bg-darkbg min-h-screen pt-24">
      <Helmet>
        <title>Trophy Collections — Delta Industries Jalandhar | 259+ Designs</title>
        <meta name="description" content="Browse 259+ premium trophy designs including plastic cups, metal cups, fiber cups, iron cups and wooden trophies." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2">Our Products</p>
          <h1 className="text-white text-4xl font-bold">Collections</h1>
        </div>

        {/* Search + Mobile Filter Button Row */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 md:w-96 md:flex-none bg-white/5 border border-gold/20 rounded px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold text-sm"
          />

          {/* Mobile Filter Button — only shows on mobile */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-2 border border-gold/30 text-gold px-4 py-3 text-xs tracking-widest uppercase hover:border-gold transition-colors">
            ☰ Filter
            {selectedCategory !== 'all' && (
              <span className="bg-gold text-darkbg text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                1
              </span>
            )}
          </button>
        </div>

        {/* Mobile Filter Dropdown */}
        {mobileFilterOpen && (
          <div className="md:hidden border border-gold/20 bg-darkbg mb-6 p-4">
            <p className="text-gold text-xs tracking-widest uppercase mb-3 font-semibold">
              Categories
            </p>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`text-left px-3 py-2 text-sm tracking-wider uppercase transition-colors ${
                  selectedCategory === 'all'
                    ? 'text-gold border-l-2 border-gold pl-3'
                    : 'text-white/50 hover:text-gold'
                }`}>
                All Products
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.slug)}
                  className={`text-left px-3 py-2 text-sm tracking-wider uppercase transition-colors ${
                    selectedCategory === category.slug
                      ? 'text-gold border-l-2 border-gold pl-3'
                      : 'text-white/50 hover:text-gold'
                  }`}>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-8">

          {/* Desktop Sidebar — hidden on mobile */}
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <p className="text-white/30 tracking-widest uppercase text-sm">Loading...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <p className="text-white/30 tracking-widest uppercase text-sm">No products found</p>
              </div>
            ) : (
              <>
                <p className="text-white/30 text-sm mb-6">
                  {products.length} products found
                  {selectedCategory !== 'all' && (
                    <button
                      onClick={() => handleCategoryChange('all')}
                      className="ml-3 text-gold text-xs underline">
                      Clear filter
                    </button>
                  )}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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