import { useState } from 'react';
import API from '../api/axios';

function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/inquiries', formData);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-darkbg min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2">Get In Touch</p>
        <h1 className="text-white text-4xl font-bold mb-16">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Info */}
          <div>
            <div className="flex flex-col gap-8">
              {[
                { label: 'Phone', value: '+91 000 000 0000', href: 'tel:+910000000000' },
                { label: 'Email', value: 'info@deltatrophies.com', href: 'mailto:info@deltatrophies.com' },
                { label: 'Address', value: 'Jalandhar, Punjab, India', href: null },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-gold text-xs tracking-widest uppercase mb-1">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-white/70 hover:text-gold transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white/70">{item.value}</p>
                  )}
                </div>
              ))}
            </div>

            <br />
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="border border-gold/20 p-8 text-center">
                <p className="text-gold text-3xl mb-3">✓</p>
                <p className="text-white text-lg font-bold">Message Sent!</p>
                <p className="text-white/50 text-sm mt-2">We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="bg-white/5 border border-gold/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold text-sm"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="bg-white/5 border border-gold/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold text-sm"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  className="bg-white/5 border border-gold/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold text-sm"
                />
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  required
                  className="bg-white/5 border border-gold/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold text-sm resize-none"
                />
                <button
                  type="submit"
                  className="bg-gold text-darkbg font-bold py-3 tracking-widest uppercase text-sm hover:bg-gold/90 transition-colors">
                  Send Message
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
  );
}

export default Contact;