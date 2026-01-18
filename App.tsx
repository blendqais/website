
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
  { id: '1', category: 'Apparel', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=600', title: 'Custom T-Shirt' },
  { id: '2', category: 'UV Print', image: 'https://images.unsplash.com/photo-1605170439002-90f450c997bc?auto=format&fit=crop&q=80&w=600', title: 'UV Phone Case' },
  { id: '3', category: 'DTF', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600', title: 'Vibrant DTF Print' },
];

const INITIAL_SOCIALS: SocialLink[] = [
  { id: 's1', platform: 'Facebook', url: 'https://facebook.com', iconName: 'Facebook' },
  { id: 's2', platform: 'Instagram', url: 'https://instagram.com', iconName: 'Instagram' },
  { id: 's3', platform: 'TikTok', url: 'https://tiktok.com', iconName: 'Music2' },
  { id: 's4', platform: 'Snapchat', url: 'https://snapchat.com', iconName: 'Ghost' },
];

// Helper Components
const SocialIcon = ({ name, className }: { name: string, className?: string }) => {
  switch (name) {
    case 'Facebook': return <Facebook className={className} />;
    case 'Instagram': return <Instagram className={className} />;
    case 'Music2': return <Music2 className={className} />;
    case 'Ghost': return <Ghost className={className} />;
    default: return <Globe className={className} />;
  }
};

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
          systemInstruction: `You are an expert printing consultant for PrintFusion Studio. Help customers decide between DTF (Direct to Film) and UV printing. PrintFusion is based in Koya and delivers to all of Kurdistan and Iraq. Respond in ${lang === 'en' ? 'English' : lang === 'ar' ? 'Arabic' : 'Kurdish'}.`,
        }
      });
      setResponse(result.text || 'Error');
      setPrompt('');
    } catch (error) {
      console.error(error);
      setResponse('Connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-24 ${lang === 'en' ? 'right-8' : 'left-8'} z-40`}>
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="bg-[#6C63FF] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform">
          <Sparkles className="w-6 h-6" />
        </button>
      ) : (
        <div className="glass-card w-72 md:w-80 rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
          <div className="bg-[#6C63FF] p-3 flex justify-between items-center text-white">
            <span className="text-sm font-bold flex items-center gap-2"><Sparkles className="w-4 h-4" /> AI Consultant</span>
            <button onClick={() => setIsOpen(false)}><X className="w-4 h-4" /></button>
          </div>
          <div className="p-4 bg-slate-900/90 max-h-60 overflow-y-auto">
            {response && <div className={`text-xs leading-relaxed text-slate-200 ${lang !== 'en' ? 'text-right' : ''}`}>{response}</div>}
            {loading && <div className="animate-pulse text-slate-500 text-xs">AI is thinking...</div>}
            {!response && !loading && <div className="text-slate-500 text-xs italic">Ask about DTF, UV, or delivery...</div>}
          </div>
          <form onSubmit={handleAsk} className="p-2 border-t border-slate-800 flex gap-1">
            <input 
              value={prompt} onChange={(e) => setPrompt(e.target.value)}
              className={`flex-1 bg-slate-800 text-xs p-2 rounded-lg outline-none focus:ring-1 focus:ring-[#6C63FF] ${lang !== 'en' ? 'text-right' : ''}`}
              placeholder="..."
            />
            <button className="bg-[#6C63FF] p-2 rounded-lg text-white"><Send className="w-4 h-4" /></button>
          </form>
        </div>
      )}
    </div>
  );
};

// Layout Components
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

  return (
    <nav className="sticky top-0 z-50 glass-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <Printer className="text-[#6C63FF] w-8 h-8" />
            <span className="text-gradient">PrintFusion</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className={`flex items-center space-x-6 ${lang !== 'en' ? 'space-x-reverse' : ''}`}>
              {navItems.map((item) => (
                <Link key={item.key} to={item.path} className={`text-sm transition-colors hover:text-[#4ECDC4] ${pathname === item.path ? 'text-[#6C63FF] font-bold' : 'text-slate-300'}`}>
                  {t(item.key)}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-3 border-l border-slate-700 pl-6">
              {['en', 'ar', 'ku'].map((l) => (
                <button key={l} onClick={() => setLang(l as Language)} className={`text-xs px-2 py-1 rounded font-bold uppercase ${lang === l ? 'bg-[#6C63FF] text-white' : 'text-slate-500'}`}>
                  {l === 'ku' ? 'کوردی' : l === 'ar' ? 'عربي' : 'EN'}
                </button>
              ))}
              {isAdmin && (
                <Link to="/admin" className="p-2 bg-slate-800 rounded-lg text-[#6C63FF] hover:text-[#4ECDC4]"><Settings className="w-5 h-5" /></Link>
              )}
            </div>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-300"><Menu /></button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden glass-card absolute top-20 w-full animate-in slide-in-from-top p-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.key} to={item.path} onClick={() => setIsOpen(false)} className={`block py-3 px-4 rounded-lg ${lang !== 'en' ? 'text-right' : ''}`}>
              {t(item.key)}
            </Link>
          ))}
          {isAdmin && <Link to="/admin" onClick={() => setIsOpen(false)} className="block py-3 px-4 text-[#6C63FF]">Admin Dashboard</Link>}
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
        <div className="max-w-4xl mx-auto text-center z-10">
          <h1 className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight">{t('hero_title')}</h1>
          <p className="text-slate-400 mb-10 max-w-2xl mx-auto text-lg">{t('hero_subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link onClick={trackOrder} to="/contact" className="bg-[#6C63FF] px-8 py-4 rounded-full font-bold transition-all hover:scale-105 flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" /> {t('hero_cta_primary')}
            </Link>
            <Link to="/portfolio" className="border border-slate-700 px-8 py-4 rounded-full font-bold transition-all hover:border-[#4ECDC4] flex items-center justify-center gap-2">
              <Printer className="w-5 h-5" /> {t('hero_cta_secondary')}
            </Link>
          </div>
        </div>
      </section>
      <section className="py-20 border-y border-slate-900 max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-6">
        {[
          { icon: <Layers />, key: 'usp_no_min', color: '#6C63FF' },
          { icon: <CheckCircle2 />, key: 'usp_quality', color: '#4ECDC4' },
          { icon: <Truck />, key: 'usp_fast', color: '#6C63FF' }
        ].map((item) => (
          <div key={item.key} className={`glass-card p-8 rounded-3xl flex flex-col gap-4 ${lang !== 'en' ? 'text-right' : ''}`}>
            <div className="p-4 w-fit rounded-2xl self-start" style={{ backgroundColor: `${item.color}20`, color: item.color }}>{item.icon}</div>
            <h3 className="text-xl font-bold">{t(item.key)}</h3>
            <p className="text-slate-500 text-sm">Serving all of Kurdistan & Iraq with premium standards.</p>
          </div>
        ))}
      </section>
    </div>
  );
};

const PortfolioPage = ({ lang, items }: { lang: Language, items: PortfolioItem[] }) => {
  const [filter, setFilter] = useState('all');
  const t = (key: string) => translations[key]?.[lang] || key;
  const cats = ['all', ...Array.from(new Set(items.map(i => i.category.toLowerCase())))];
  const filtered = filter === 'all' ? items : items.filter(i => i.category.toLowerCase() === filter);

  return (
    <div className="py-20 max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-12">{t('portfolio_title')}</h2>
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {cats.map(c => (
          <button key={c} onClick={() => setFilter(c)} className={`px-5 py-2 rounded-full border text-sm font-bold uppercase transition-all ${filter === c ? 'bg-[#6C63FF] border-[#6C63FF]' : 'border-slate-800 text-slate-500'}`}>
            {c === 'all' ? t('all') : c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(i => (
          <div key={i.id} className="glass-card rounded-3xl overflow-hidden group border-transparent hover:border-[#6C63FF]">
            <img src={i.image} className="aspect-square object-cover w-full group-hover:scale-105 transition-transform duration-700" />
            <div className={`p-6 ${lang !== 'en' ? 'text-right' : ''}`}>
              <span className="text-xs text-[#4ECDC4] font-bold uppercase">{i.category}</span>
              <h3 className="text-xl font-bold mt-1">{i.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <form className="glass-card p-10 rounded-3xl w-full max-w-md space-y-6" onSubmit={(e) => { e.preventDefault(); if(pass==='admin123'){ onLogin(); navigate('/admin'); } }}>
        <div className="text-center"><Lock className="w-12 h-12 text-[#6C63FF] mx-auto mb-4" /><h2 className="text-2xl font-bold">Admin Portal</h2></div>
        <input type="password" placeholder="Access Code" value={pass} onChange={e=>setPass(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6C63FF]" />
        <button className="w-full bg-[#6C63FF] py-4 rounded-xl font-bold">Sign In</button>
      </form>
    </div>
  );
};

const AdminPanel = ({ stats, portfolio, setPortfolio, socials, setSocials, onLogout }: any) => {
  const [n, setN] = useState({ title: '', category: '', image: '' });
  const addItem = () => { if(n.title && n.image){ setPortfolio([...portfolio, {...n, id: Date.now().toString()}]); setN({title:'',category:'',image:''}); } };
  const delItem = (id: any) => setPortfolio(portfolio.filter((p: any)=>p.id !== id));

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 space-y-12">
      <div className="flex justify-between items-center"><h2 className="text-4xl font-extrabold">Management</h2><button onClick={onLogout} className="px-6 py-2 bg-red-600/10 text-red-500 rounded-full">Exit</button></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl border-l-4 border-blue-500"><p className="text-xs text-slate-500 font-bold">VISITORS</p><h3 className="text-2xl font-bold">{stats.visitors}</h3></div>
        <div className="glass-card p-6 rounded-2xl border-l-4 border-green-500"><p className="text-xs text-slate-500 font-bold">INQUIRIES</p><h3 className="text-2xl font-bold">{stats.orders}</h3></div>
      </div>
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="glass-card p-8 rounded-3xl h-fit space-y-4">
          <h3 className="font-bold flex items-center gap-2"><Plus className="w-5 h-5" /> Add Work</h3>
          <input placeholder="Title" value={n.title} onChange={e=>setN({...n, title: e.target.value})} className="w-full bg-slate-900 p-3 rounded-xl border border-slate-700" />
          <input placeholder="Category (UV/DTF)" value={n.category} onChange={e=>setN({...n, category: e.target.value})} className="w-full bg-slate-900 p-3 rounded-xl border border-slate-700" />
          <input placeholder="Image URL" value={n.image} onChange={e=>setN({...n, image: e.target.value})} className="w-full bg-slate-900 p-3 rounded-xl border border-slate-700" />
          <button onClick={addItem} className="w-full bg-[#6C63FF] py-3 rounded-xl font-bold">Add Item</button>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold">Recent Works</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {portfolio.map((p: any)=>(
              <div key={p.id} className="glass-card p-4 rounded-2xl flex items-center gap-4">
                <img src={p.image} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1 min-w-0"><p className="font-bold truncate">{p.title}</p><p className="text-xs text-slate-500">{p.category}</p></div>
                <button onClick={()=>delItem(p.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
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
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    const s = localStorage.getItem('p_items'); return s ? JSON.parse(s) : INITIAL_PORTFOLIO;
  });
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => {
    const s = localStorage.getItem('s_links'); return s ? JSON.parse(s) : INITIAL_SOCIALS;
  });
  const [stats, setStats] = useState<SiteStats>(() => {
    const s = localStorage.getItem('s_stats'); return s ? JSON.parse(s) : { visitors: 0, orders: 0 };
  });

  useEffect(() => { localStorage.setItem('p_items', JSON.stringify(portfolioItems)); }, [portfolioItems]);
  useEffect(() => { localStorage.setItem('s_links', JSON.stringify(socialLinks)); }, [socialLinks]);
  useEffect(() => { localStorage.setItem('s_stats', JSON.stringify(stats)); }, [stats]);
  useEffect(() => { if(!isAdmin && !sessionStorage.getItem('v')) { setStats(p=>({...p, visitors: p.visitors+1})); sessionStorage.setItem('v', '1'); } }, [isAdmin]);
  useEffect(() => { document.documentElement.dir = lang==='en'?'ltr':'rtl'; document.documentElement.lang = lang; }, [lang]);

  return (
    <Router>
      <div className={`min-h-screen ${lang==='en'?'font-inter':'font-noto-arabic'}`}>
        <Navbar lang={lang} setLang={setLang} isAdmin={isAdmin} />
        <main className="pb-20">
          <Routes>
            <Route path="/" element={<Home lang={lang} trackOrder={()=>setStats(p=>({...p, orders: p.orders+1}))} />} />
            <Route path="/services" element={<div className="py-20 px-4 max-w-5xl mx-auto"><h2 className="text-4xl font-bold text-center mb-16">{translations.services_title[lang]}</h2><p className="text-center text-slate-400">{translations.services_desc[lang]}</p></div>} />
            <Route path="/portfolio" element={<PortfolioPage lang={lang} items={portfolioItems} />} />
            <Route path="/about" element={<div className="py-20 px-4 text-center max-w-4xl mx-auto"><h2 className="text-4xl font-bold mb-8">{translations.about_title[lang]}</h2><p className="text-slate-400 leading-relaxed text-lg">{translations.about_p1[lang]}</p><a href={MAP_LINK} target="_blank" className="mt-8 inline-flex items-center gap-2 text-[#6C63FF] font-bold"><MapPin /> {translations.location[lang]}</a></div>} />
            <Route path="/contact" element={<div className="py-20 px-4 text-center"><h2 className="text-4xl font-bold mb-4">{translations.contact_title[lang]}</h2><p className="text-slate-400 mb-12">{translations.contact_subtitle[lang]}</p><button onClick={()=>{setStats(p=>({...p, orders: p.orders+1})); window.open('https://wa.me/9647704979127');}} className="bg-green-600 px-8 py-4 rounded-full font-bold flex items-center gap-2 mx-auto"><MessageCircle /> WhatsApp Now</button></div>} />
            <Route path="/login" element={<Login onLogin={()=>{setIsAdmin(true); localStorage.setItem('is_admin', 'true');}} />} />
            <Route path="/admin" element={isAdmin ? <AdminPanel stats={stats} portfolio={portfolioItems} setPortfolio={setPortfolioItems} onLogout={()=>{setIsAdmin(false); localStorage.removeItem('is_admin');}} /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        <footer className="bg-slate-950 py-16 px-4 border-t border-slate-900 text-center">
          <Link to="/" className="text-2xl font-bold text-gradient mb-4 block">PrintFusion Studio</Link>
          <div className="flex justify-center gap-6 mb-8">
            {socialLinks.map(s => <a key={s.id} href={s.url} target="_blank" className="p-3 bg-slate-900 rounded-full hover:text-[#6C63FF]"><SocialIcon name={s.iconName} className="w-5 h-5" /></a>)}
          </div>
          <div className="text-slate-600 text-xs flex justify-between items-center max-w-7xl mx-auto">
            <span>&copy; 2024 PrintFusion. All rights reserved.</span>
            <Link to="/login" className="opacity-0 hover:opacity-10">Admin</Link>
          </div>
        </footer>
        <AIAssistant lang={lang} />
        <a onClick={()=>setStats(p=>({...p, orders: p.orders+1}))} href="https://wa.me/9647704979127" target="_blank" className="fixed bottom-8 right-8 bg-[#25D366] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50"><MessageCircle className="w-6 h-6 text-white" /></a>
      </div>
    </Router>
  );
}
