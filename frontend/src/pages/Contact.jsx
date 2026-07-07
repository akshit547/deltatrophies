import { useState } from 'react';
import { motion } from 'framer-motion';
import API from '../api/axios';

const salesTeam = [
  { name: 'Komal', phone: '92165-77789' },
  { name: 'Navneet', phone: '87596-66665' },
  { name: 'Nidhi', phone: '95924-13333' },
  { name: 'Pooja Sharma', phone: '77194-36916' },
  { name: 'Sweety', phone: '95179-11665' },
];

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
    <div className="bg-darkbg w-full min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2 font-semibold">
            Get In Touch
          </p>
          <h1 className="text-white text-5xl font-bold font-serif">Contact Us</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}>

            {/* Company Info */}
            <div className="flex flex-col gap-6 mb-12">
              <div>
                <p className="text-gold text-xs tracking-widest uppercase mb-2 font-semibold">
                  Email
                </p>
                <a 
                  href="mailto:gsbedi_99@yahoo.com"
                  className="text-white/70 hover:text-gold transition-colors text-sm">
                  gsbedi_99@yahoo.com
                </a>
              </div>
              <div>
                <p className="text-gold text-xs tracking-widest uppercase mb-2 font-semibold">
                  Address
                </p>
                <p className="text-white/70 text-sm leading-relaxed">
                  Jalandhar, Punjab, India
                </p>
              </div>
            </div>

            {/* Sales Team */}
            <div className="mb-12">
              <p className="text-gold text-xs tracking-widest uppercase mb-6 font-semibold">
                Our Sales Team
              </p>
              <div className="flex flex-col gap-3">
                {salesTeam.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center justify-between border border-white/[0.06] px-4 py-3 hover:border-gold/30 transition-colors group">
                    <div>
                      <p className="text-white text-sm font-medium">{member.name}</p>
                      <p className="text-white/40 text-xs">{member.phone}</p>
                    </div>
                    <a 
                      href={`tel:+91${member.phone.replace(/-/g, '')}`}
                      className="text-gold text-xs tracking-widest uppercase border border-gold/30 px-3 py-1 hover:bg-gold hover:text-darkbg transition-all duration-300">
                      Call
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* WhatsApp Button */}
            <a 
              href="https://wa.me/919216577789"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 tracking-wider uppercase text-xs transition-colors rounded-sm">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>

          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}>

            {submitted ? (
              <div className="border border-gold/20 p-10 text-center h-full flex flex-col items-center justify-center min-h-[350px]">
                <p className="text-gold text-4xl mb-4">✓</p>
                <p className="text-white text-xl font-bold mb-2">Message Sent!</p>
                <p className="text-white/50 text-sm">We'll get back to you shortly.</p>
              </div>
            ) : (
              <div className="border border-white/[0.06] p-8 bg-white/[0.01]">
                <h3 className="text-white text-xl font-bold mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold text-sm transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold text-sm transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                    className="bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold text-sm transition-colors"
                  />
                  <textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={5}
                    required
                    className="bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold text-sm resize-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-gold text-darkbg font-bold py-4 tracking-widest uppercase text-xs hover:bg-gold/90 transition-colors">
                    Send Message
                  </button>
                </form>
              </div>
            )}

          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default Contact;