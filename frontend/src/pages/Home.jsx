import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    <div className="bg-darkbg w-full min-h-screen text-white font-sans overflow-x-hidden selection:bg-gold/30 selection:text-white">

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-start overflow-hidden">

        {/* Ambient Premium Glow Layer */}
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[150px] pointer-events-none z-10" />
        <div className="absolute bottom-1/4 right-10 w-[300px] h-[300px] bg-white/5 rounded-full blur-[120px] pointer-events-none z-10" />

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="http://localhost:5000/uploads/gallery/factory/AA Welcome.jpg"
            alt="Delta Industries Factory"
            className="w-full h-full object-cover object-bottom filter brightness-[0.4] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-darkbg via-darkbg/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-darkbg via-transparent to-darkbg/40" />
        </div>

        {/* Big Background Typography */}
        <div className="absolute right-[-2%] bottom-[12%] select-none pointer-events-none hidden lg:block z-0">
          <h2 className="text-[13vw] font-bold leading-none uppercase tracking-tighter text-transparent opacity-5"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
            CRAFT
          </h2>
        </div>

        {/* Hero Grid Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 max-w-2xl">

              <motion.p
                initial={{ opacity: 0, letterSpacing: "0.2em" }}
                animate={{ opacity: 1, letterSpacing: "0.4em" }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-gold text-xs font-semibold uppercase mb-6 inline-block bg-gold/10 px-4 py-1.5 rounded-full border border-gold/20 backdrop-blur-sm">
                Delta Industries · Est. 1998
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-white text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 font-serif">
                Crafting <span className="text-gold italic font-normal">excellence,</span>
                <br />one trophy at a time.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-xl font-light">
                Twenty-seven years of sculpting recognition. From hand-finished
                walnut bases to optical crystal sculptures — Delta crafts the
                moments that organisations remember.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex gap-4 flex-wrap">
                <Link to="/collections"
                  className="group relative bg-gold text-darkbg font-bold px-8 py-4 tracking-widest uppercase text-xs transition-all duration-300 shadow-xl shadow-gold/10 hover:shadow-gold/20 hover:-translate-y-0.5">
                  Explore Collections →
                </Link>
                <Link to="/contact"
                  className="border border-white/20 text-white font-medium px-8 py-4 tracking-widest uppercase text-xs backdrop-blur-md bg-white/5 hover:bg-white/10 hover:border-gold hover:text-gold transition-all duration-300 hover:-translate-y-0.5">
                  Request Custom Design
                </Link>
              </motion.div>

            </motion.div>

            {/* Right Side — Real Trophy Image */}
            <div className="lg:col-span-5 hidden lg:flex justify-center items-center relative h-[550px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="relative">

                {/* Glow behind trophy */}
                <div className="absolute inset-0 bg-gold/20 blur-[60px] rounded-full" />

                {/* Real trophy image */}
                <img
                  src="http://localhost:5000/uploads/delta-catalogue/metal-cups/MC_5052.png"
                  alt="Featured Trophy"
                  className="relative z-10 w-80 h-96 object-contain drop-shadow-2xl"
                />

                {/* Sparkles */}
                <motion.div
                  animate={{ y: [0, -25, 0], x: [0, 10, 0], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute top-12 right-4 text-gold text-lg select-none">
                  ✦
                </motion.div>
                <motion.div
                  animate={{ y: [0, -35, 0], x: [0, -15, 0], opacity: [0, 0.7, 0] }}
                  transition={{ repeat: Infinity, duration: 5, delay: 1.5, ease: "easeInOut" }}
                  className="absolute bottom-24 left-2 text-white text-xs select-none">
                  ✦
                </motion.div>

              </motion.div>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <p className="text-white/30 text-xs tracking-widest uppercase">Scroll</p>
          <div className="w-px h-8 bg-gradient-to-b from-gold/50 to-transparent" />
        </motion.div>

      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-6 py-28 relative z-20">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3 font-semibold">
              Our Collections
            </p>
            <h2 className="text-white text-3xl md:text-4xl font-bold font-serif tracking-tight">
              Browse by Category
            </h2>
          </div>
          <Link to="/collections"
            className="group text-gold text-xs tracking-widest uppercase hover:text-white transition-colors duration-300 flex items-center gap-2">
            View All <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.6 }}>
              <Link
                to={`/collections?category=${category.slug}`}
                className="group relative block overflow-hidden rounded-lg bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] hover:border-gold/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/5">
                <div className="aspect-square flex flex-col items-center justify-between p-6 relative">

                  <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-white/10 group-hover:border-gold/40 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-white/10 group-hover:border-gold/40 transition-colors duration-300" />

                  <div className="text-4xl mt-4 select-none transform group-hover:scale-125 group-hover:-rotate-6 transition-all duration-500 ease-out">
                    {index % 5 === 0 ? '🏆' :
                     index % 5 === 1 ? '🥇' :
                     index % 5 === 2 ? '🎖️' :
                     index % 5 === 3 ? '🏅' : '⭐'}
                  </div>

                  <div className="w-full text-center z-10">
                    <p className="text-white/80 group-hover:text-gold text-xs tracking-wider uppercase font-medium transition-colors duration-300">
                      {category.name}
                    </p>
                    <p className="text-gold text-[10px] tracking-[0.25em] uppercase mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      Explore →
                    </p>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-24 relative z-20">
        <div className="text-center md:text-left mb-16">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3 font-semibold">
            Featured Masterpieces
          </p>
          <h2 className="text-white text-3xl md:text-4xl font-bold font-serif tracking-tight">
            Popular Designs
          </h2>
        </div>

        {featuredProducts.length === 0 ? (
          <div className="flex justify-center items-center border border-white/5 bg-white/[0.01] rounded-xl h-64">
            <p className="text-white/40 tracking-widest uppercase text-xs">
              Curating high-end pieces shortly...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <Link to="/collections"
            className="inline-block border border-gold/40 text-gold font-medium px-10 py-4 tracking-widest uppercase text-xs hover:bg-gold hover:text-darkbg transition-all duration-300 shadow-lg hover:shadow-gold/10">
            View All Collections
          </Link>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-28 relative z-20 border-y border-white/[0.06] bg-gradient-to-b from-white/[0.01] to-transparent">
        <div className="absolute inset-0 bg-gold/[0.01] mix-blend-color-dodge pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3 font-semibold">
              The People Behind Delta
            </p>
            <h2 className="text-white text-3xl md:text-4xl font-bold font-serif tracking-tight">
              Our Founders
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {[
              {
                name: 'Gurdeep Singh',
                role: 'Founder',
                image: '/uploads/founders/founder-male.jpg',
                slogan: 'Excellence is not a destination — it is the standard we set every single day.'
              },
              {
                name: 'XYZ',
                role: 'Co-Founder',
                image: '/uploads/founders/founder-female.jpg',
                slogan: 'Behind every trophy is a story of perseverance — we are here to tell that story.'
              }
            ].map((founder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.7 }}
                className="text-center group">

                {/* Photo */}
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold to-amber-300 p-[1px] shadow-xl shadow-gold/10">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img
                        src={`http://localhost:5000${founder.image}`}
                        alt={founder.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <p className="text-gold text-xs tracking-widest uppercase mb-1 font-semibold">
                  {founder.role}
                </p>
                <h3 className="text-white text-xl font-bold font-serif mb-4">
                  {founder.name}
                </h3>
                <blockquote className="text-white/50 text-sm italic leading-relaxed max-w-sm mx-auto border-t border-gold/20 pt-4">
                  "{founder.slogan}"
                </blockquote>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative z-20 bg-darkbg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 text-center divide-x-0 md:divide-x divide-white/[0.08]">
            {[
              { number: 27, suffix: '+', label: 'Years of Craft' },
              { number: 500, suffix: '+', label: 'Bespoke Designs' },
              { number: 10000, suffix: '+', label: 'Honored Laureates' },
              { number: 20, suffix: '+', label: 'Cities Served' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="px-4">
                <div className="text-gold text-4xl md:text-5xl font-light tracking-tight font-serif mb-3">
                  {stat.number.toLocaleString()}{stat.suffix}
                </div>
                <p className="text-white/40 text-[11px] tracking-[0.2em] uppercase font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;