import { useState } from 'react';

const tabs = ['Factory', 'Events', 'Products'];

function Gallery() {
  const [activeTab, setActiveTab] = useState('Factory');

  return (
    <div className="bg-darkbg min-h-screen pt-24">
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

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i}
              className="bg-white/5 border border-gold/20 aspect-square flex items-center justify-center hover:border-gold transition-colors">
              <p className="text-white/20 text-xs">{activeTab} Photo {i}</p>
            </div>
          ))}
        </div>

        <p className="text-white/30 text-center text-sm mt-10">
          Photos will be added once received from client
        </p>

      </div>
    </div>
  );
}

export default Gallery;