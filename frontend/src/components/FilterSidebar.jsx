function FilterSidebar({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="hidden md:block w-56 shrink-0">
      <h3 className="text-gold text-xs tracking-[0.3em] uppercase mb-4">
        Categories
      </h3>
      <div className="flex flex-col gap-1">

        <button
          onClick={() => onCategoryChange('all')}
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
            onClick={() => onCategoryChange(category.slug)}
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
  );
}

export default FilterSidebar;