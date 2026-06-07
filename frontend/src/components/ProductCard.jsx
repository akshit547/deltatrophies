import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Link to={`/collections/${product.id}`}
      className="border border-gold/20 hover:border-gold group transition-colors">
      <div className="bg-white/5 aspect-square flex items-center justify-center">
        {product.images && product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <p className="text-white/20 text-sm">No Image</p>
        )}
      </div>
      <div className="p-4">
        <p className="text-white/50 text-xs tracking-wider uppercase mb-1">
          {product.category_name}
        </p>
        <h3 className="text-white group-hover:text-gold text-sm font-medium transition-colors">
          {product.name}
        </h3>
        <p className="text-gold text-xs mt-3 tracking-widest uppercase">
          Enquire Now →
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;