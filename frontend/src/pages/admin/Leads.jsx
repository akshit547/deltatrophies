import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';

function Leads() {
  const [leads, setLeads] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('leads');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) { navigate('/admin'); return; }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const leadsRes = await API.get('/inquiries/leads', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const inquiriesRes = await API.get('/inquiries/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLeads(leadsRes.data.leads);
      setInquiries(inquiriesRes.data.inquiries);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-darkbg min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <h1 className="text-white text-3xl font-bold mb-8">Leads & Inquiries</h1>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gold/20 mb-8">
          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-3 text-sm tracking-widest uppercase ${
              activeTab === 'leads' ? 'text-gold border-b-2 border-gold' : 'text-white/50'
            }`}>
            Leads ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`pb-3 text-sm tracking-widest uppercase ${
              activeTab === 'inquiries' ? 'text-gold border-b-2 border-gold' : 'text-white/50'
            }`}>
            Product Inquiries ({inquiries.length})
          </button>
        </div>

        {loading ? (
          <p className="text-white/30">Loading...</p>
        ) : activeTab === 'leads' ? (
          <div className="border border-gold/20">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gold/20">
                  <th className="text-gold text-xs uppercase text-left px-6 py-4">Name</th>
                  <th className="text-gold text-xs uppercase text-left px-6 py-4">Email</th>
                  <th className="text-gold text-xs uppercase text-left px-6 py-4">Phone</th>
                  <th className="text-gold text-xs uppercase text-left px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr><td colSpan={4} className="text-center text-white/30 py-12">No leads yet</td></tr>
                ) : leads.map(lead => (
                  <tr key={lead.id} className="border-b border-gold/10">
                    <td className="px-6 py-4 text-white text-sm">{lead.name}</td>
                    <td className="px-6 py-4 text-white/70 text-sm">{lead.email}</td>
                    <td className="px-6 py-4 text-white/70 text-sm">{lead.phone}</td>
                    <td className="px-6 py-4 text-white/50 text-sm">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="border border-gold/20">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gold/20">
                  <th className="text-gold text-xs uppercase text-left px-6 py-4">Name</th>
                  <th className="text-gold text-xs uppercase text-left px-6 py-4">Product</th>
                  <th className="text-gold text-xs uppercase text-left px-6 py-4">Phone</th>
                  <th className="text-gold text-xs uppercase text-left px-6 py-4">Message</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.length === 0 ? (
                  <tr><td colSpan={4} className="text-center text-white/30 py-12">No inquiries yet</td></tr>
                ) : inquiries.map(inq => (
                  <tr key={inq.id} className="border-b border-gold/10">
                    <td className="px-6 py-4 text-white text-sm">{inq.name}</td>
                    <td className="px-6 py-4 text-white/70 text-sm">{inq.product_name || '—'}</td>
                    <td className="px-6 py-4 text-white/70 text-sm">{inq.phone}</td>
                    <td className="px-6 py-4 text-white/50 text-sm">{inq.message || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default Leads;