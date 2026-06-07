function Heritage() {
  return (
    <div className="bg-darkbg min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2">Our Story</p>
        <h1 className="text-white text-4xl font-bold mb-16">Heritage</h1>

        {/* Founder Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
          <div className="bg-white/5 border border-gold/20 aspect-square flex items-center justify-center">
            <p className="text-white/20 text-sm">Founder Photo</p>
          </div>
          <div>
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">Our Founder</p>
            <h2 className="text-white text-3xl font-bold mb-6">Founder Name</h2>
            <blockquote className="text-white/70 text-xl italic border-l-2 border-gold pl-6 mb-6">
              "Your slogan goes here"
            </blockquote>
            <p className="text-white/50 text-sm leading-relaxed">
              Founded in 1998, Delta Industries has been crafting recognition
              and excellence for over two decades. From humble beginnings in
              Jalandhar, we have grown to serve clients across India.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="border-t border-gold/20 pt-16">
          <h2 className="text-white text-3xl font-bold mb-12 text-center">Our Journey</h2>
          <div className="flex flex-col gap-8 max-w-2xl mx-auto">
            {[
              { year: '1998', text: 'Delta Industries founded in Jalandhar, Punjab' },
              { year: '2005', text: 'Expanded product range to include crystal and acrylic trophies' },
              { year: '2010', text: 'Reached milestone of 1000+ satisfied clients' },
              { year: '2015', text: 'Expanded distribution network across North India' },
              { year: '2024', text: 'Serving 20+ cities with 500+ unique designs' },
            ].map((item, index) => (
              <div key={index} className="flex gap-6 items-start">
                <p className="text-gold font-bold text-lg w-16 shrink-0">{item.year}</p>
                <div className="flex-1 border-l border-gold/20 pl-6 pb-4">
                  <p className="text-white/70 text-sm">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Heritage;