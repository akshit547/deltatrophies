import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-darkbg border-b border-gold/20 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2">
          <span className="text-white text-2xl font-bold tracking-wider">
            Delta.
          </span>
          <span className="text-gold text-xs tracking-[0.3em] uppercase">
            Industries
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-white/70 hover:text-gold text-sm tracking-widest uppercase transition-colors">
            Home
          </Link>
          <Link to="/collections" className="text-white/70 hover:text-gold text-sm tracking-widest uppercase transition-colors">
            Collections
          </Link>
          <Link to="/heritage" className="text-white/70 hover:text-gold text-sm tracking-widest uppercase transition-colors">
            Heritage
          </Link>
          <Link to="/gallery" className="text-white/70 hover:text-gold text-sm tracking-widest uppercase transition-colors">
            Gallery
          </Link>
          <Link to="/distributors" className="text-white/70 hover:text-gold text-sm tracking-widest uppercase transition-colors">
            Distributors
          </Link>
          <Link to="/contact" className="text-white/70 hover:text-gold text-sm tracking-widest uppercase transition-colors">
            Contact
          </Link>
        </div>

        <a href="tel:+910000000000"
          className="hidden md:flex items-center gap-2 text-gold text-sm tracking-wider">
          +91 92165 77789
        </a>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>

      </div>

      {menuOpen && (
        <div className="md:hidden bg-darkbg border-t border-gold/20 px-6 py-4 flex flex-col gap-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-white/70 hover:text-gold text-sm tracking-widest uppercase">Home</Link>
          <Link to="/collections" onClick={() => setMenuOpen(false)} className="text-white/70 hover:text-gold text-sm tracking-widest uppercase">Collections</Link>
          <Link to="/heritage" onClick={() => setMenuOpen(false)} className="text-white/70 hover:text-gold text-sm tracking-widest uppercase">Heritage</Link>
          <Link to="/gallery" onClick={() => setMenuOpen(false)} className="text-white/70 hover:text-gold text-sm tracking-widest uppercase">Gallery</Link>
          <Link to="/distributors" onClick={() => setMenuOpen(false)} className="text-white/70 hover:text-gold text-sm tracking-widest uppercase">Distributors</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="text-white/70 hover:text-gold text-sm tracking-widest uppercase">Contact</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;