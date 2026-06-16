import { useState } from 'react';

const factoryImages = [
  '/uploads/gallery/factory/Video Short 1.jpg',
  '/uploads/gallery/factory/Video Short 2.jpg',
  '/uploads/gallery/factory/Video Short 3.jpg',
  '/uploads/gallery/factory/Video Short 4.jpg',
  '/uploads/gallery/factory/Video Short 5.jpg',
  '/uploads/gallery/factory/Video Short 6.jpg',
  '/uploads/gallery/factory/AA Welcome.jpg',
];

const tabs = ['Factory', 'Events', 'Products'];

function Gallery() {
  const [activeTab, setActiveTab] = useState('Factory');
  const [selectedImage, setSelectedImage] = useState(null);

  const images = activeTab === 'Factory' ? factoryImages : [];

  return (
    <div className="bg-darkbg min-h-screen pt-24">

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-4"
          onClick={() => setSelectedImage(null)}>
          <img
            src={`http://localhost:5000${selectedImage}`}
            alt="Gallery"
            className="max-w-4xl max-h-screen object-contain"
          />
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-gold text-2xl">
            ✕
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-12">

        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2">Visual Tour</p>
        <h1 className="text-white text-4xl font-bold mb-10">Gallery</h1>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gold/20 mb-10">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm tracking-widest uppercase transition-colors ${
                activeTab === tab
                  ? 'text-gold border-b-2 border-gold'
                  : 'text-white/50 hover:text-gold'
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        {images.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/30 text-sm tracking-wider">
              Photos coming soon...
            </p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(img)}
                className="break-inside-avoid cursor-pointer group relative overflow-hidden border border-gold/10 hover:border-gold transition-colors">
                <img
                  src={`http://localhost:5000${img}`}
                  alt={`Gallery ${index + 1}`}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs tracking-widest uppercase">
                    View
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Gallery;