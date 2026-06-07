import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';

function Home() {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await API.get('/categories');
        setCategories(catRes.data.categories);
        const prodRes = await API.get('/products');
        setFeaturedProducts(prodRes.data.products.slice(0, 6));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-darkbg min-h-screen">

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-between max-w-7xl mx-auto px-6 pt-24">
        <div className="max-w-2xl">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-6">
            Delta Industries · Est. 1998
          </p>
          <h1 className="text-white text-6xl font-bold leading-tight mb-6">
            Crafting <span className="text-gold">excellence,</span>
            <br />one trophy at a time.
          </h1>
          <p className="text-white/50 text-lg leading-relaxed mb-10">
            Twenty-seven years of sculpting recognition. From hand-finished
            walnut bases to optical crystal sculptures — Delta crafts the
            moments that organisations remember.
          </p>
          <div className="flex gap-4">
            <Link to="/collections"
              className="bg-gold text-darkbg font-bold px-8 py-4 tracking-widest uppercase text-sm hover:bg-gold/90 transition-colors">
              Explore Collections →
            </Link>
            <Link to="/contact"
              className="border border-gold/30 text-white px-8 py-4 tracking-widest uppercase text-sm hover:border-gold transition-colors">
              Request Custom Design
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2">
          Our Collections
        </p>
        <h2 className="text-white text-4xl font-bold mb-12">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map(category => (
            <Link
              key={category.id}
              to={`/collections?category=${category.slug}`}
              className="border border-gold/20 hover:border-gold p-6 text-center transition-colors group">
              <p className="text-white/70 group-hover:text-gold text-sm tracking-wider uppercase transition-colors">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2">
          Featured
        </p>
        <h2 className="text-white text-4xl font-bold mb-12">
          Popular Designs
        </h2>
        {featuredProducts.length === 0 ? (
          <p className="text-white/30 text-center py-20">
            Products coming soon...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        <div className="text-center mt-12">
          <Link to="/collections"
            className="border border-gold/30 text-gold px-8 py-4 tracking-widest uppercase text-sm hover:border-gold transition-colors">
            View All Collections →
          </Link>
        </div>
      </section>

      {/* Founder Section */}
      <section className="border-t border-gold/20 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-6">
            Our Founder
          </p>
          <div className="w-24 h-24 rounded-full bg-gold/20 border border-gold/30 mx-auto mb-6 flex items-center justify-center">
            <span className="text-gold text-2xl">👤</span>
          </div>
          <blockquote className="text-white text-2xl md:text-3xl font-light italic max-w-3xl mx-auto mb-6">
            "Your slogan goes here"
          </blockquote>
          <p className="text-gold text-sm tracking-widest uppercase">
            Founder Name — Delta Industries
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-gold/20 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '27+', label: 'Years of Excellence' },
              { number: '500+', label: 'Unique Designs' },
              { number: '10,000+', label: 'Happy Clients' },
              { number: '20+', label: 'Cities Served' },
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-gold text-4xl font-bold mb-2">{stat.number}</p>
                <p className="text-white/50 text-sm tracking-wider uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;