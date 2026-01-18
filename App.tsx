
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
  Menu, X, Phone, MessageCircle, MapPin, 
  Layers, Shirt, ChevronRight, 
  Send, Globe, Sparkles, Smartphone, Printer, CheckCircle2,
  Instagram, Facebook, Music2, Ghost, Truck, ExternalLink,
  Settings, LogOut, Plus, Trash2, Edit3, Save, BarChart3, Users, ShoppingCart, Lock
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { translations } from './translations';
import { Language, NavItem, PortfolioItem, SocialLink, SiteStats } from './types';

const MAP_LINK = "https://www.google.com/maps/search/?api=1&query=Koysinjaq+Koya+Iraq";

// Initial Data
const INITIAL_PORTFOLIO: PortfolioItem[] = [
  { id: '1', category: 'apparel', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=600', title: 'Custom T-Shirt' },
  { id: '2', category: 'uv', image: 'https://images.unsplash.com/photo-1605170439002-90f450c997bc?auto=format&fit=crop&q=80&w=600', title: 'UV Phone Case' },
  { id: '3', category: 'dtf', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600', title: 'Vibrant DTF Print' },
];

const INITIAL_SOCIALS: SocialLink[] = [
  { id: 's1', platform: 'Facebook', url: 'https://facebook.com', iconName: 'Facebook' },
  { id: 's2', platform: 'Instagram', url: 'https://instagram.com', iconName: 'Instagram' },
  { id: 's3', platform: 'TikTok', url: 'https://tiktok.com', iconName: 'Music2' },
  { id: 's4', platform: 'Snapchat', url: 'https://snapchat.com', iconName: 'Ghost' },
];

// Helper: Social Icon Component
const SocialIcon = ({ name, className }: { name: string, className?: string }) => {
  switch (name) {
    case 'Facebook': return <Facebook className={className} />;
    case 'Instagram': return <Instagram className={className} />;
    case 'Music2': return <Music2 className={className} />;
    case 'Ghost': return <Ghost className={className} />;
    default: return <Globe className={className} />;
  }
};

// Components
const Navbar = ({ lang, setLang, isAdmin }: { lang: Language, setLang: (l: Language) => void, isAdmin: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const t = (key: string) => translations[key]?.[lang] || key;

  const navItems: NavItem[] = [
    { key: 'nav_home', path: '/' },
    { key: 'nav_services', path: '/services' },
    { key: 'nav_portfolio', path: '/portfolio' },
    { key: 'nav_about', path: '/about' },
    { key: 'nav_contact', path: '/contact' },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'ar', label: 'عربي' },
    { code: 'ku', label: 'کوردی' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
              <Printer className="text-[#6C63FF] w-8 h-8" />
              <span className="text-gradient">PrintFusion</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className={`flex items-center space-x-8 ${lang !== 'en' ? 'space-x-reverse' : ''}`}>
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-[#4ECDC4] ${
                    pathname === item.path ? 'text-[#6C63FF]' : 'text-slate-300'
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}
              
              <div className={`flex items-center gap-6 border-slate-700 ${lang === 'en' ? 'border-l pl-8' : 'border-r pr-8'}`}>
                <div className="flex gap-2">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLang(l.code)}
                      className={`text-xs px-2 py-1 rounded transition-all font-bold ${
                        lang === l.code ? 'bg-[#6C63FF] text-white' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
                {isAdmin && (
                  <Link to="/admin" className="p-2 bg-slate-800 rounded-lg text-[#6C63FF] hover:text-[#4ECDC4] transition-colors" title="Admin Panel">
                    <Settings className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass-card absolute top-20 w-full animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-4 text-base font-medium text-slate-300 hover:bg-slate-800 rounded-lg ${lang !== 'en' ? 'text-right' : ''}`}
              >
                {t(item.key)}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium text-[#6C63FF]">Dashboard</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// Pages
const Home = ({ lang, trackOrder }: { lang: Language, trackOrder: () => void }) => {
  const t = (key: string) => translations[key]?.[lang] || key;

  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-4 py-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6C63FF] rounded-full filter blur-[120px] opacity-10 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#4ECDC4] rounded-full filter blur-[120px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
            {t('hero_title')}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            {t('hero_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link onClick={trackOrder} to="/contact" className="bg-[#6C63FF] hover:bg-[#5a52e0] text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              {t('hero_cta_primary')}
            </Link>
            <Link to="/portfolio" className="border border-slate-700 hover:border-[#4ECDC4] px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2">
              <Printer className="w-5 h-5" />
              {t('hero_cta_secondary')}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-slate-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            {[
              { icon: <Layers />, key: 'usp_no_min', color: '#6C63FF', desc: { en: 'Order exactly what you need.', ar: 'اطلب ما تحتاجه تماماً.', ku: 'تەنها ئەو بڕە داوا بکە کە پێویستتە.' } },
              { icon: <CheckCircle2 />, key: 'usp_quality', color: '#4ECDC4', desc: { en: 'Industry leading DTF & UV quality.', ar: 'جودة DTF و UV رائدة.', ku: 'کوالێتی نایابی چاپی DTF و UV.' } },
              { icon: <Truck />, key: 'usp_fast', color: '#6C63FF', desc: { en: 'Serving all cities in Kurdistan & Iraq.', ar: 'نخدم كافة مدن كوردستان والعراق.', ku: 'بۆ هەموو شارەکانی کوردستان و عێراق.' } }
            ].map((item, idx) => (
              <div key={idx} className={`glass-card p-6 rounded-2xl flex items-center gap-6 group hover:translate-x-2 transition-transform cursor-default ${lang !== 'en' ? 'flex-row-reverse text-right' : ''}`}>
                <div className="p-4 rounded-xl" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold">{t(item.key)}</h4>
                  <p className="text-slate-500 text-sm">{item.desc[lang]}</p>
                </div>
                <div className={`text-slate-800 group-hover:text-slate-500 transition-colors ${lang !== 'en' ? 'rotate-180' : ''}`}>
                  <ChevronRight />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Admin Login
const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === 'admin123') {
      onLogin();
      navigate('/admin');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <form onSubmit={handle} className={`glass-card p-8 rounded-3xl w-full max-w-md space-y-6 transition-transform ${error ? 'animate-bounce border-red-500' : ''}`}>
        <div className="text-center">
          <Lock className="w-12 h-12 text-[#6C63FF] mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Secure Access</h2>
          <p className="text-slate-500 text-sm mt-2">Authorized Personnel Only</p>
        </div>
        <input 
          type="password" 
          placeholder="Access Key" 
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6C63FF]"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button className="w-full bg-[#6C63FF] py-4 rounded-xl font-bold hover:scale-105 transition-transform">Unlock Dashboard</button>
      </form>
    </div>
  );
};

/* Fix: Added Portfolio component to resolve "Cannot find name 'Portfolio'" error. */
const Portfolio = ({ lang, portfolioItems }: { lang: Language, portfolioItems: PortfolioItem[] }) => {
  const [filter, setFilter] = useState('all');
  const t = (key: string) => translations[key]?.[lang] || key;

  const categories = [
    { key: 'all', label: t('all') },
    { key: 'dtf', label: t('filter_dtf') },
    { key: 'uv', label: t('filter_uv') },
    { key: 'apparel', label: t('filter_apparel') },
  ];

  const filteredItems = useMemo(() => {
    if (filter === 'all') return portfolioItems;
    return portfolioItems.filter(item => item.category.toLowerCase() === filter.toLowerCase());
  }, [filter, portfolioItems]);

  return (
    <div className="py-20 max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">{t('portfolio_title')}</h2>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-6 py-2 rounded-full font-bold transition-all border ${
                filter === cat.key 
                  ? 'bg-[#6C63FF] text-white border-[#6C63FF]' 
                  : 'border-slate-800 text-slate-400 hover:border-[#4ECDC4]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div key={item.id} className="glass-card rounded-3xl overflow-hidden group hover:scale-[1.02] transition-all border border-transparent hover:border-[#6C63FF]">
            <div className="aspect-square overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
            </div>
            <div className={`p-6 ${lang !== 'en' ? 'text-right' : ''}`}>
              <p className="text-[#4ECDC4] text-xs font-bold uppercase mb-1">{item.category}</p>
              <h3 className="text-xl font-bold">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* Fix: Added AIAssistant component to utilize the defined Gemini AI translations. */
const AIAssistant = ({ lang }: { lang: Language }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const t = (key: string) => translations[key]?.[lang] || key;

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setResponse('');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: `You are an expert printing consultant for PrintFusion Studio. 
          Help customers decide between DTF (Direct to Film) for fabrics and UV printing for hard surfaces. 
          PrintFusion is based in Koya and delivers to all of Kurdistan and Iraq. 
          Respond in ${lang === 'en' ? 'English' : lang === 'ar' ? 'Arabic' : 'Kurdish'}. 
          Keep answers professional, helpful and concise.`,
        }
      });
      setResponse(result.text || 'Error fetching response');
      setPrompt('');
    } catch (error) {
      console.error(error);
      setResponse('Sorry, I am having trouble connecting right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-8 ${lang === 'en' ? 'left-8' : 'left-8'} z-50`}>
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[#6C63FF] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group"
        >
          <Sparkles className="w-8 h-8 group-hover:rotate-12 transition-transform" />
        </button>
      ) : (
        <div className="glass-card w-[350px] md:w-[400px] rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
          <div className="bg-[#6C63FF] p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold">
              <Sparkles className="w-5 h-5" />
              {t('ai_assistant_title')}
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white"><X /></button>
          </div>
          <div className="p-4 max-h-[300px] overflow-y-auto space-y-4 bg-slate-950/50">
            {response && (
              <div className={`p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 text-sm leading-relaxed ${lang !== 'en' ? 'text-right' : ''}`}>
                {response}
              </div>
            )}
            {loading && (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#6C63FF]"></div>
              </div>
            )}
            {!response && !loading && (
              <p className="text-slate-500 text-sm text-center py-4 italic">
                {lang === 'en' ? 'Ask me anything about our printing services!' : lang === 'ar' ? 'اسألني أي شيء عن خدمات الطباعة لدينا!' : 'هەر پرسیارێکت هەیە دەربارەی خزمەتگوزارییەکانی چاپ لێم بپرسە!'}
              </p>
            )}
          </div>
          <form onSubmit={handleAsk} className="p-4 border-t border-slate-800 flex gap-2">
            <input 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t('ai_assistant_placeholder')}
              className={`flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-[#6C63FF] ${lang !== 'en' ? 'text-right' : ''}`}
            />
            <button disabled={loading} className="bg-[#6C63FF] p-2 rounded-xl text-white disabled:opacity-50"><Send className="w-5 h-5" /></button>
          </form>
        </div>
      )}
    </div>
  );
};

const AdminPanel = ({ 
  onLogout, portfolio, setPortfolio, socials, setSocials, stats 
}: { 
  onLogout: () => void, 
  portfolio: PortfolioItem[], 
  setPortfolio: React.Dispatch<React.SetStateAction<PortfolioItem[]>>,
  socials: SocialLink[],
  setSocials: React.Dispatch<React.SetStateAction<SocialLink[]>>,
  stats: SiteStats
}) => {
  const [newItem, setNewItem] = useState<Partial<PortfolioItem>>({ title: '', category: '', image: '' });
  const [newSocial, setNewSocial] = useState<Partial<SocialLink>>({ platform: '', url: '', iconName: 'Globe' });

  const addItem = () => {
    if (newItem.title && newItem.category && newItem.image) {
      setPortfolio([...portfolio, { ...newItem, id: Date.now().toString() } as PortfolioItem]);
      setNewItem({ title: '', category: '', image: '' });
    }
  };

  const deleteItem = (id: string | number) => setPortfolio(portfolio.filter(p => p.id !== id));

  const addSocial = () => {
    if (newSocial.platform && newSocial.url) {
      setSocials([...socials, { ...newSocial, id: `s-${Date.now()}` } as SocialLink]);
      setNewSocial({ platform: '', url: '', iconName: 'Globe' });
    }
  };

  const deleteSocial = (id: string) => setSocials(socials.filter(s => s.id !== id));

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <h2 className="text-4xl font-extrabold flex items-center gap-4">
          <Settings className="text-[#6C63FF]" /> Admin Dashboard
        </h2>
        <button onClick={onLogout} className="flex items-center gap-2 px-6 py-2 bg-red-600/20 text-red-500 rounded-full hover:bg-red-600 hover:text-white transition-all">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm uppercase font-bold">Total Visitors</p>
              <h3 className="text-3xl font-bold">{stats.visitors}</h3>
            </div>
            <Users className="text-blue-500 w-10 h-10 opacity-20" />
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm uppercase font-bold">Inquiries/Orders</p>
              <h3 className="text-3xl font-bold">{stats.orders}</h3>
            </div>
            <ShoppingCart className="text-green-500 w-10 h-10 opacity-20" />
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm uppercase font-bold">Portfolio Items</p>
              <h3 className="text-3xl font-bold">{portfolio.length}</h3>
            </div>
            <Printer className="text-purple-500 w-10 h-10 opacity-20" />
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl border-l-4 border-teal-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm uppercase font-bold">Social Channels</p>
              <h3 className="text-3xl font-bold">{socials.length}</h3>
            </div>
            <Globe className="text-teal-500 w-10 h-10 opacity-20" />
          </div>
        </div>
      </div>

      {/* Content Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 glass-card p-8 rounded-3xl h-fit sticky top-32">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#6C63FF]"><Plus /> New Portfolio Item</h3>
          <div className="space-y-4">
            <input placeholder="Item Title (e.g. UV Acrylic Case)" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2" value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})} />
            <input placeholder="Category (e.g. UV print, DTF)" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} />
            <input placeholder="Direct Image URL" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2" value={newItem.image} onChange={e => setNewItem({...newItem, image: e.target.value})} />
            <button onClick={addItem} className="w-full bg-[#6C63FF] py-3 rounded-xl font-bold mt-2 hover:bg-[#5a52e0] transition-colors">Save to Portfolio</button>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2 text-[#4ECDC4]"><Layers /> Gallery Inventory</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {portfolio.map(p => (
              <div key={p.id} className="glass-card p-4 rounded-2xl flex gap-4 items-center group relative border border-transparent hover:border-slate-700">
                <img src={p.image} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold truncate">{p.title}</h4>
                  <p className="text-xs text-slate-500 uppercase">{p.category}</p>
                </div>
                <button onClick={() => deleteItem(p.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Media Manager */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 glass-card p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#6C63FF]"><Plus /> Update Socials</h3>
          <div className="space-y-4">
            <input placeholder="Platform Name" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2" value={newSocial.platform} onChange={e => setNewSocial({...newSocial, platform: e.target.value})} />
            <input placeholder="Profile URL" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2" value={newSocial.url} onChange={e => setNewSocial({...newSocial, url: e.target.value})} />
            <select className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2" value={newSocial.iconName} onChange={e => setNewSocial({...newSocial, iconName: e.target.value})}>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="Music2">TikTok</option>
              <option value="Ghost">Snapchat</option>
              <option value="Globe">Other / Website</option>
            </select>
            <button onClick={addSocial} className="w-full bg-[#4ECDC4] text-slate-950 py-3 rounded-xl font-bold mt-2 hover:bg-[#3db8af] transition-colors">Publish Link</button>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2 text-[#6C63FF]"><BarChart3 /> Social Directory</h3>
          <div className="space-y-3">
            {socials.map(s => (
              <div key={s.id} className="glass-card p-4 rounded-2xl flex items-center justify-between group border border-transparent hover:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-800 rounded-xl text-[#6C63FF] group-hover:text-[#4ECDC4] transition-colors">
                    <SocialIcon name={s.iconName} className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold">{s.platform}</div>
                    <div className="text-xs text-slate-500 truncate max-w-[200px]">{s.url}</div>
                  </div>
                </div>
                <button onClick={() => deleteSocial(s.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('ku');
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('is_admin') === 'true');
  
  // Persistent State
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem('site_portfolio');
    return saved ? JSON.parse(saved) : INITIAL_PORTFOLIO;
  });
  
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => {
    const saved = localStorage.getItem('site_socials');
    return saved ? JSON.parse(saved) : INITIAL_SOCIALS;
  });

  const [stats, setStats] = useState<SiteStats>(() => {
    const saved = localStorage.getItem('site_stats');
    return saved ? JSON.parse(saved) : { visitors: 0, orders: 0 };
  });

  // Persist Changes
  useEffect(() => localStorage.setItem('site_portfolio', JSON.stringify(portfolioItems)), [portfolioItems]);
  useEffect(() => localStorage.setItem('site_socials', JSON.stringify(socialLinks)), [socialLinks]);
  useEffect(() => localStorage.setItem('site_stats', JSON.stringify(stats)), [stats]);

  // Track Visitors (Session based to avoid rapid refresh bloat)
  useEffect(() => {
    if (!isAdmin && !sessionStorage.getItem('visited')) {
      setStats(prev => ({ ...prev, visitors: prev.visitors + 1 }));
      sessionStorage.setItem('visited', 'true');
    }
  }, [isAdmin]);

  const trackOrder = () => setStats(prev => ({ ...prev, orders: prev.orders + 1 }));

  const onLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('is_admin');
  };

  useEffect(() => {
    document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <Router>
      <div className={`min-h-screen transition-all duration-500 selection:bg-[#6C63FF] selection:text-white ${lang === 'en' ? 'font-inter' : 'font-noto-arabic'}`}>
        <Navbar lang={lang} setLang={setLang} isAdmin={isAdmin} />
        <main className="pb-20">
          <Routes>
            <Route path="/" element={<Home lang={lang} trackOrder={trackOrder} />} />
            <Route path="/services" element={
              <div className="py-20 max-w-5xl mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold mb-4">{translations.services_title[lang]}</h2>
                  <p className="text-slate-400 max-w-xl mx-auto">{translations.services_desc[lang]}</p>
                </div>
                <div className="space-y-8">
                  {[
                    { key: 'dtf', icon: <Layers />, img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800' },
                    { key: 'apparel', icon: <Shirt />, img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800' },
                    { key: 'uv', icon: <Smartphone />, img: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800' },
                  ].map((item, idx) => (
                    <div key={item.key} className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} glass-card rounded-3xl overflow-hidden group hover:border-[#6C63FF] transition-all border border-transparent`}>
                      <div className="md:w-1/3 h-64 md:h-auto overflow-hidden relative">
                        <img src={item.img} alt={item.key} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 to-transparent"></div>
                      </div>
                      <div className={`md:w-2/3 p-8 md:p-12 flex flex-col justify-center ${lang !== 'en' ? 'text-right items-end' : ''}`}>
                        <div className={`flex items-center gap-3 mb-4 ${lang !== 'en' ? 'flex-row-reverse' : ''}`}>
                          <div className="p-2 bg-[#6C63FF] rounded-lg text-white">{item.icon}</div>
                          <h3 className="text-3xl font-bold">{translations[`service_${item.key}_title`][lang]}</h3>
                        </div>
                        <p className="text-slate-400 mb-8 text-lg leading-relaxed">{translations[`service_${item.key}_desc`][lang]}</p>
                        <Link onClick={trackOrder} to="/contact" className={`bg-slate-800 hover:bg-[#6C63FF] px-6 py-2 rounded-full font-semibold transition-all flex items-center gap-2 ${lang !== 'en' ? 'flex-row-reverse' : ''}`}>
                          {translations.hero_cta_primary[lang]} <ChevronRight className={`w-4 h-4 ${lang !== 'en' ? 'rotate-180' : ''}`} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            } />
            <Route path="/portfolio" element={<Portfolio lang={lang} portfolioItems={portfolioItems} />} />
            <Route path="/about" element={
              <div className="py-20 max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="relative">
                    <div className="absolute -inset-4 border-2 border-dashed border-[#6C63FF]/20 rounded-3xl -z-10 animate-pulse"></div>
                    <img src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&q=80&w=800" alt="Koya Office" className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" />
                    <a href={MAP_LINK} target="_blank" rel="noreferrer" className={`absolute -bottom-6 ${lang === 'en' ? '-right-6' : '-left-6'} glass-card p-6 rounded-2xl hidden md:block border-[#6C63FF]/40 hover:scale-105 transition-transform group`}>
                      <div className={`flex items-center gap-4 mb-2 ${lang !== 'en' ? 'flex-row-reverse' : ''}`}>
                        <MapPin className="text-[#6C63FF]" />
                        <span className="font-bold flex items-center gap-2">{translations.location[lang]}<ExternalLink className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" /></span>
                      </div>
                      <p className={`text-sm text-slate-400 ${lang !== 'en' ? 'text-right' : ''}`}>HQ - Koysinjaq / Koya</p>
                    </a>
                  </div>
                  <div className={lang !== 'en' ? 'text-right' : ''}>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">{translations.about_title[lang]}</h2>
                    <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
                      <p>{translations.about_p1[lang]}</p>
                      <p>{translations.about_p2[lang]}</p>
                    </div>
                  </div>
                </div>
              </div>
            } />
            <Route path="/contact" element={
              <div className="py-20 max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold mb-4">{translations.contact_title[lang]}</h2>
                  <p className="text-slate-400 max-w-xl mx-auto">{translations.contact_subtitle[lang]}</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-1 space-y-4">
                    <a href="tel:+9647704979127" className={`glass-card p-6 rounded-2xl flex items-center gap-6 hover:border-[#6C63FF] transition-all group ${lang !== 'en' ? 'flex-row-reverse text-right' : ''}`}>
                      <div className="p-3 bg-[#6C63FF]/20 rounded-xl text-[#6C63FF]"><Phone className="w-5 h-5" /></div>
                      <div><div className="text-xs text-slate-500 uppercase font-bold">Call Us</div><div className="font-bold group-hover:text-[#6C63FF] transition-colors">+964 770 497 9127</div></div>
                    </a>
                    <a href={MAP_LINK} target="_blank" rel="noreferrer" className={`glass-card p-6 rounded-2xl flex items-center gap-6 hover:border-[#4ECDC4] transition-all group ${lang !== 'en' ? 'flex-row-reverse text-right' : ''}`}>
                      <div className="p-3 bg-[#4ECDC4]/20 rounded-xl text-[#4ECDC4]"><MapPin className="w-5 h-5" /></div>
                      <div><div className="text-xs text-slate-500 uppercase font-bold">Location</div><div className="font-bold group-hover:text-[#4ECDC4] transition-colors">{translations.location[lang]}</div></div>
                    </a>
                    <a onClick={trackOrder} href="https://wa.me/9647704979127" target="_blank" rel="noreferrer" className={`glass-card p-6 rounded-2xl flex items-center gap-6 hover:border-green-500 transition-all group ${lang !== 'en' ? 'flex-row-reverse text-right' : ''}`}>
                      <div className="p-3 bg-green-500/20 rounded-xl text-green-500"><MessageCircle className="w-5 h-5" /></div>
                      <div><div className="text-xs text-slate-500 uppercase font-bold">WhatsApp</div><div className="font-bold group-hover:text-green-500 transition-colors">Start Chat</div></div>
                    </a>
                  </div>
                  <div className="lg:col-span-2">
                    <form className="glass-card p-8 rounded-3xl space-y-6" onSubmit={(e) => { e.preventDefault(); trackOrder(); window.open('https://wa.me/9647704979127', '_blank'); }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className={lang !== 'en' ? 'text-right' : ''}>
                          <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{translations.form_name[lang]}</label>
                          <input required className={`w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-[#6C63FF] ${lang !== 'en' ? 'text-right' : ''}`} />
                        </div>
                        <div className={lang !== 'en' ? 'text-right' : ''}>
                          <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{translations.form_email[lang]}</label>
                          <input type="email" required className={`w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-[#6C63FF] ${lang !== 'en' ? 'text-right' : ''}`} />
                        </div>
                      </div>
                      <div className={lang !== 'en' ? 'text-right' : ''}>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{translations.form_message[lang]}</label>
                        <textarea required rows={4} className={`w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-[#6C63FF] ${lang !== 'en' ? 'text-right' : ''}`} />
                      </div>
                      <button className="w-full bg-gradient-to-r from-green-600 to-green-500 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform">
                        <MessageCircle /> {translations.form_send[lang]}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            } />
            <Route path="/login" element={<Login onLogin={() => { setIsAdmin(true); localStorage.setItem('is_admin', 'true'); }} />} />
            <Route path="/admin" element={isAdmin ? <AdminPanel stats={stats} socials={socialLinks} setSocials={setSocialLinks} portfolio={portfolioItems} setPortfolio={setPortfolioItems} onLogout={onLogout} /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        
        <footer className="bg-slate-950 border-t border-slate-900 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
              <div className={`md:col-span-2 ${lang !== 'en' ? 'md:text-right' : ''}`}>
                <Link to="/" className="text-3xl font-extrabold text-gradient mb-4 block">PrintFusion Studio</Link>
                <p className="text-slate-500 max-w-sm mt-4 text-lg">Premier printing serving Kurdistan & Iraq. HQ: Koya.</p>
              </div>
              <div className={lang !== 'en' ? 'md:text-right' : ''}>
                <h5 className="font-bold text-slate-200 mb-6 uppercase tracking-widest text-sm">Services</h5>
                <ul className="space-y-4 text-slate-500">
                  <li><Link to="/services" className="hover:text-[#4ECDC4] transition-colors">{translations.service_dtf_title[lang]}</Link></li>
                  <li><Link to="/services" className="hover:text-[#4ECDC4] transition-colors">{translations.service_uv_title[lang]}</Link></li>
                  <li><Link to="/services" className="hover:text-[#4ECDC4] transition-colors">{translations.service_apparel_title[lang]}</Link></li>
                </ul>
              </div>
              <div className={lang !== 'en' ? 'md:text-right' : ''}>
                <h5 className="font-bold text-slate-200 mb-6 uppercase tracking-widest text-sm">Follow Us</h5>
                <div className={`flex flex-wrap gap-4 ${lang !== 'en' ? 'justify-end' : 'justify-center md:justify-start'}`}>
                  {socialLinks.map(link => (
                    <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="p-3 bg-slate-900 rounded-full hover:bg-[#6C63FF] hover:text-white transition-all">
                      <SocialIcon name={link.iconName} className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 text-sm">
              <div>&copy; {new Date().getFullYear()} PrintFusion Studio. {translations.footer_rights[lang]}</div>
              <div className="flex gap-4">
                <Link to="/contact" className="hover:text-slate-400">Support</Link>
                {/* Obscured Admin Link - very subtle and not labeled 'Admin' */}
                <Link to="/login" className="opacity-0 hover:opacity-10 cursor-default">Dashboard</Link>
              </div>
            </div>
          </div>
        </footer>

        {/* AI Assistant Button */}
        <AIAssistant lang={lang} />

        <a onClick={trackOrder} href="https://wa.me/9647704979127" target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform group">
          <MessageCircle className="w-8 h-8 group-hover:rotate-12 transition-transform" />
        </a>
      </div>
    </Router>
  );
}
