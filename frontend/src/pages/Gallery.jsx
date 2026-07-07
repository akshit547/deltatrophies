import { useState } from 'react';
import { motion } from 'framer-motion';

const factoryImages = [
  '/uploads/gallery/factory/Video Short 1.jpg',
  '/uploads/gallery/factory/Video Short 2.jpg',
  '/uploads/gallery/factory/Video Short 3.jpg',
  '/uploads/gallery/factory/Video Short 4.jpg',
  '/uploads/gallery/factory/Video Short 5.jpg',
  '/uploads/gallery/factory/Video Short 6.jpg',
  '/uploads/gallery/factory/AA Welcome.jpg',
];

const videos = [
  {
    id: 1,
    url: 'https://www.youtube.com/embed/GrdlAXQ1uSU',
    title: 'Delta Industries — Factory Tour'
  },
  {
    id: 2,
    url: 'https://www.youtube.com/embed/9n8ikQqi9-U',
    title: 'Delta Industries — Office Tour'
  },
  {
    id: 3,
    url: 'https://www.youtube.com/embed/4BDt-eYcN70',
    title: 'Delta Industries — Reception view'
  },
  {
    id: 4,
    url: 'https://www.youtube.com/embed/W5PmQMYBSk4',
    title: 'Delta Industries — Collection showcase'
  },
];

const tabs = ['Factory', 'Events', 'Videos'];

function Gallery() {
  const [activeTab, setActiveTab] = useState('Factory');
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="bg-darkbg w-full min-h-screen text-white">

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
          <button className="absolute top-6 right-6 text-white/70 hover:text-gold text-2xl">
            ✕
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2 font-semibold">
            Visual Tour
          </p>
          <h1 className="text-white text-5xl font-bold">Gallery</h1>
        </motion.div>

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

        {/* Factory Tab */}
        {activeTab === 'Factory' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {factoryImages.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(img)}
                className="break-inside-avoid cursor-pointer group relative overflow-hidden border border-gold/10 hover:border-gold transition-colors">
                <img
                  src={`http://localhost:5000${img}`}
                  alt={`Factory ${index + 1}`}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs tracking-widest uppercase">
                    View
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Events Tab */}
        {activeTab === 'Events' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center py-20 border border-white/[0.06]">
            <div className="text-center">
              <p className="text-gold text-3xl mb-4">📸</p>
              <p className="text-white/30 text-sm tracking-wider uppercase">
                Event photos coming soon
              </p>
            </div>
          </motion.div>
        )}

        {/* Videos Tab */}
        {activeTab === 'Videos' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-white/[0.06] hover:border-gold/30 transition-colors overflow-hidden group">

                {/* YouTube Embed */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={video.url}
                    title={video.title}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Video Title */}
                <div className="p-4 bg-white/[0.02]">
                  <p className="text-white/70 text-sm group-hover:text-gold transition-colors">
                    {video.title}
                  </p>
                  <p className="text-gold/50 text-xs tracking-widest uppercase mt-1">
                    Delta Industries
                  </p>
                </div>

              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </div>
  );
}

export default Gallery;