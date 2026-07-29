import { useState } from 'react';
import { motion } from 'framer-motion';
import getImageUrl from '../utils/getImageUrl';
import { Helmet } from 'react-helmet-async';

const factoryImages = [
  'https://res.cloudinary.com/aunwcpnr/image/upload/v1785130306/deltatrophies/gallery/factory/AA%20Welcome.jpg',
  'https://res.cloudinary.com/aunwcpnr/image/upload/v1785130315/deltatrophies/gallery/factory/Video%20Short%201.jpg',
  'https://res.cloudinary.com/aunwcpnr/image/upload/v1785130321/deltatrophies/gallery/factory/Video%20Short%202.jpg',
  'https://res.cloudinary.com/aunwcpnr/image/upload/v1785130326/deltatrophies/gallery/factory/Video%20Short%203.jpg',
  'https://res.cloudinary.com/aunwcpnr/image/upload/v1785130328/deltatrophies/gallery/factory/Video%20Short%204.jpg',
  'https://res.cloudinary.com/aunwcpnr/image/upload/v1785130331/deltatrophies/gallery/factory/Video%20Short%205.jpg',
  'https://res.cloudinary.com/aunwcpnr/image/upload/v1785130334/deltatrophies/gallery/factory/Video%20Short%206.jpg',
];

const annualMeetImages = [
  'https://res.cloudinary.com/aunwcpnr/image/upload/v1785130338/deltatrophies/gallery/annual-meet/0E1A9266.jpg',
  'https://res.cloudinary.com/aunwcpnr/image/upload/v1785130353/deltatrophies/gallery/annual-meet/0E1A9286.jpg',
  'https://res.cloudinary.com/aunwcpnr/image/upload/v1785130362/deltatrophies/gallery/annual-meet/0E1A9343.jpg',
  'https://res.cloudinary.com/aunwcpnr/image/upload/v1785130381/deltatrophies/gallery/annual-meet/0E1A9346.jpg',
  'https://res.cloudinary.com/aunwcpnr/image/upload/v1785130389/deltatrophies/gallery/annual-meet/0E1A9459.jpg',
  'https://res.cloudinary.com/aunwcpnr/image/upload/v1785130397/deltatrophies/gallery/annual-meet/0E1A9597.jpg',
  'https://res.cloudinary.com/aunwcpnr/image/upload/v1785130405/deltatrophies/gallery/annual-meet/0E1A9599.jpg',
];

const exhibitionImages = [
  'https://res.cloudinary.com/aunwcpnr/image/upload/v1785130412/deltatrophies/gallery/exhibition/DSC_7678.jpg',
  'https://res.cloudinary.com/aunwcpnr/image/upload/v1785130418/deltatrophies/gallery/exhibition/DSC_7728.jpg',
  'https://res.cloudinary.com/aunwcpnr/image/upload/v1785302100/deltatrophies/gallery/exhibition/DSC_7758.jpg',
  'https://res.cloudinary.com/aunwcpnr/image/upload/v1785130547/deltatrophies/gallery/exhibition/DSC_7859.jpg',
  'https://res.cloudinary.com/aunwcpnr/image/upload/v1785130553/deltatrophies/gallery/exhibition/DSC_7880.jpg',
  'https://res.cloudinary.com/aunwcpnr/image/upload/v1785130558/deltatrophies/gallery/exhibition/IMG-20250325-WA0006.jpg',
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
const tabs = ['Factory', 'Annual Meet', 'Exhibition', 'Videos'];

function Gallery() {
  const [activeTab, setActiveTab] = useState('Factory');
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="bg-darkbg w-full min-h-screen text-white">
      <Helmet>
  <title>Gallery — Delta Industries | Trophy Factory & Events</title>
  <meta name="description" content="View Delta Industries factory, events and trophy collection gallery. Premium trophy manufacturer in Jalandhar, Punjab since 1998." />
</Helmet>
      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-4"
          onClick={() => setSelectedImage(null)}>
          <img
            src={selectedImage}
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
                  src={img}
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

        {/* Annual Meet Tab */}
{activeTab === 'Annual Meet' && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
    className="columns-2 md:columns-4 lg:grid-cols-4 gap-4 space-y-4">
    {annualMeetImages.map((img, index) => (
      <div
        key={index}
        onClick={() => setSelectedImage(img)}
        className="break-inside-avoid cursor-pointer group relative overflow-hidden border border-gold/10 hover:border-gold transition-colors">
        <img
          src={img}
          alt={`Annual Meet ${index + 1}`}
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

{/* Exhibition Tab */}
{activeTab === 'Exhibition' && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
    className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
    {exhibitionImages.map((img, index) => (
      <div
        key={index}
        onClick={() => setSelectedImage(img)}
        className="break-inside-avoid cursor-pointer group relative overflow-hidden border border-gold/10 hover:border-gold transition-colors">
        <img
          src={img}
          alt={`Exhibition ${index + 1}`}
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