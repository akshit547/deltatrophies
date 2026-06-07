const distributors = [
  {
    id: 1,
    name: 'Distributor Name',
    city: 'City Name',
    phone: '+91 00000 00000',
    address: 'Full address here',
  },
];

function Distributors() {
  return (
    <div className="bg-darkbg min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2">Find Us Near You</p>
        <h1 className="text-white text-4xl font-bold mb-4">Distributors</h1>
        <p className="text-white/50 text-sm mb-12 max-w-xl">
          Find an authorised Delta Industries distributor near you to purchase
          our products locally.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {distributors.map(d => (
            <div key={d.id}
              className="border border-gold/20 hover:border-gold p-6 transition-colors">
              <p className="text-gold text-xs tracking-widest uppercase mb-3">
                {d.city}
              </p>
              <h3 className="text-white text-lg font-bold mb-4">{d.name}</h3>
              <p className="text-white/50 text-sm mb-2">{d.address}</p>
              <a href={`tel:${d.phone}`}
                className="text-gold text-sm hover:text-gold/70 transition-colors">
                {d.phone}
              </a>
            </div>
          ))}
        </div>

        <div className="border border-gold/20 p-8 mt-16 text-center">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">
            Become a Distributor
          </p>
          <h2 className="text-white text-2xl font-bold mb-4">
            Interested in partnering with us?
          </h2>
          <p className="text-white/50 text-sm mb-6">
            Contact us to learn about our distributor program.
          </p>
          <a href="tel:+910000000000"
            className="bg-gold text-darkbg font-bold px-8 py-3 tracking-widest uppercase text-sm hover:bg-gold/90 transition-colors inline-block">
            Contact Us
          </a>
        </div>

      </div>
    </div>
  );
}

export default Distributors;