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
<section className="relative min-h-screen flex items-center">

  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <img
      src="http://localhost:5000/uploads/gallery/factory/AA Welcome.jpg"
      alt="Delta Industries Factory"
      className="w-full h-full object-cover object-bottom"
    />
    <div className="absolute inset-0 bg-black/75" />
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24">
    <div className="max-w-2xl">
      <p className="text-gold text-xs tracking-[0.4em] uppercase mb-6">
        Delta Industries · Est. 1998
      </p>
      <h1 className="text-white text-6xl font-bold leading-tight mb-6">
        Crafting <span className="text-gold">excellence,</span>
        <br />one trophy at a time.
      </h1>
      <p className="text-white/60 text-lg leading-relaxed mb-10">
        Twenty-seven years of sculpting recognition. From hand-finished
        walnut bases to optical crystal sculptures — Delta crafts the
        moments that organisations remember.
      </p>
      <div className="flex gap-4 flex-wrap">
        <Link to="/collections"
          className="bg-gold text-darkbg font-bold px-8 py-4 tracking-widest uppercase text-sm hover:bg-gold/90 transition-colors">
          Explore Collections →
        </Link>
        <Link to="/contact"
          className="border border-white/30 text-white px-8 py-4 tracking-widest uppercase text-sm hover:border-gold hover:text-gold transition-colors">
          Request Custom Design
        </Link>
      </div>
    </div>
  </div>

</section>

     {/* Categories Section */}
     <div className="bg-darkbg w-full">
<section className="bg-darkbg max-w-7xl mx-auto px-6 py-20">
  <div className="flex items-end justify-between mb-12">
    <div>
      <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2">
        Our Collections
      </p>
      <h2 className="text-white text-4xl font-bold">
        Browse by Category
      </h2>
    </div>
    <Link to="/collections"
      className="text-gold text-xs tracking-widest uppercase hover:text-gold/70 transition-colors hidden md:block">
      View All →
    </Link>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    {categories.map((category, index) => (
      <Link
        key={category.id}
        to={`/collections?category=${category.slug}`}
        className="group relative overflow-hidden border border-gold/20 hover:border-gold transition-all duration-300">

        {/* Background gradient unique per category */}
        <div className={`aspect-square flex flex-col items-center justify-center p-6 relative
          ${index % 5 === 0 ? 'bg-gradient-to-br from-gold/20 to-darkbg' :
            index % 5 === 1 ? 'bg-gradient-to-br from-white/10 to-darkbg' :
            index % 5 === 2 ? 'bg-gradient-to-br from-gold/10 to-darkbg' :
            index % 5 === 3 ? 'bg-gradient-to-br from-white/5 to-darkbg' :
            'bg-gradient-to-br from-gold/15 to-darkbg'}`}>

          {/* Trophy Icon */}
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {index % 5 === 0 ? '🏆' :
             index % 5 === 1 ? '🥇' :
             index % 5 === 2 ? '🎖️' :
             index % 5 === 3 ? '🏅' : '⭐'}
          </div>

          {/* Category Name */}
          <p className="text-white/70 group-hover:text-gold text-xs tracking-wider uppercase text-center transition-colors duration-300 font-medium">
            {category.name}
          </p>

          {/* Arrow appears on hover */}
          <p className="text-gold text-xs mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-widest">
            Explore →
          </p>

          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/30 group-hover:border-gold transition-colors duration-300" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/30 group-hover:border-gold transition-colors duration-300" />

        </div>
      </Link>
    ))}
  </div>
</section>
</div>

      {/* Featured Products */}
      <div className="bg-darkbg w-full">
      <section className="bg-darkbg max-w-7xl mx-auto px-6 py-20">
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
      </div>

      {/* Founder Section */}
      <section className="border-t border-gold/20 py-20 bg-darkbg">
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
      <section className="border-t border-gold/20 py-20 bg-darkbg">
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