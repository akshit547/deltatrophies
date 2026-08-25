import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import API from '../api/axios';
import { CONTACT } from '../config/contact';

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
      <Helmet>
        <title>Contact Us — Delta Industries Jalandhar | Trophy Manufacturer</title>
        <meta name="description" content="Contact Delta Industries for custom trophy orders, bulk enquiries and dealership. Trophy manufacturer in Jalandhar, Punjab." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">

        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2">Get In Touch</p>
        <h1 className="text-white text-4xl font-bold mb-16">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Info */}
          <div>
            <div className="flex flex-col gap-8">
              {[
                { label: 'Phone', value: CONTACT.phoneDisplay, href: `tel:${CONTACT.phone}` },
                { label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
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

            {/* Sales Team */}
            <div className="mt-12">
              <p className="text-gold text-xs tracking-widest uppercase mb-6 font-semibold">
                Our Sales Team
              </p>
              <div className="flex flex-col gap-3">
                {salesTeam.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border border-white/[0.06] px-4 py-3 hover:border-gold/30 transition-colors">
                    <div>
                      <p className="text-white text-sm font-medium">{member.name}</p>
                      <p className="text-white/40 text-xs">{member.phone}</p>
                    </div>
                    <a
                      href={`tel:+91${member.phone.replace(/-/g, '')}`}
                      className="text-gold text-xs tracking-widest uppercase border border-gold/30 px-3 py-1 hover:bg-gold hover:text-darkbg transition-all duration-300">
                      Call
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 mt-10 tracking-wider uppercase text-sm transition-colors">
              WhatsApp Us
            </a>

            {/* Map */}
            <div className="mt-10 border border-white/[0.06]">
              <iframe            
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.4571601665684!2d75.51642477488356!3d31.401528274268564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a4f64b7c9fb9f%3A0xc86f38e473824c27!2sDelta%20Souvenirs%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1787626418363!5m2!1sen!2sin"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Delta Industries Location"
              />
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
                <div>
                  <label htmlFor="contact-name" className="sr-only">Your Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="w-full bg-white/5 border border-gold/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="sr-only">Email Address</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="w-full bg-white/5 border border-gold/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="sr-only">Phone Number</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                    className="w-full bg-white/5 border border-gold/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="sr-only">Your Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Your Message"
                    autoComplete="off"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={5}
                    required
                    className="w-full bg-white/5 border border-gold/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold text-sm resize-none"
                  />
                </div>
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
    </div>
  );
}

export default Contact;