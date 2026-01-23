
import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
  Menu, X, Phone, MessageCircle, MapPin, 
  ChevronRight, ChevronLeft,
  Printer, 
  Truck, Settings, Trash2, Users, ShoppingCart, Lock, 
  LayoutGrid, List as ListIcon, Target, History, Edit3, Image as ImageIcon,
  Facebook, Instagram, Music2, ShieldCheck, Zap, Package,
  BarChart3, ShieldAlert, Globe, Send, LogOut, CheckCircle
} from 'lucide-react';
import { supabase } from './supabaseClient';
import { translations } from './translations';
import { Language, NavItem, PortfolioItem, ServiceItem, SocialLink, SiteStats, MultiLangText, AdminLog } from './types';

const PHONE_NUMBER = "+9647704979127";
const ADDRESS = "Industrial Area, Koysinjaq (Koya), Erbil Governorate, Iraq";
const MAP_LINK = "https://www.google.com/maps/search/?api=1&query=PrintFusion+Studio+Koya+Iraq";
const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103323.238495572!2d44.57143445!3d36.0844781!2m3!1f0!2f0!3f0!3m2!i1024!2i768!4f13.1!3m3!1m2!1s0x40062327464d609f%3A0x6b498f3e2645e73e!2sKoya%2C%20Erbil%20Governorate!5e0!3m2!1sen!2siq!4v1700000000000!5m2!1sen!2siq";

const SocialIcon = ({ name, className }: { name: string, className?: string }) => {
  switch (name.toLowerCase()) {
    case 'facebook': return <Facebook className={className} />;
    case 'instagram': return <Instagram className={className} />;
    case 'tiktok': return <Music2 className={className} />;
    default: return <Globe className={className} />;
  }
};

const ImageSlider = ({ images }: { images: string[] }) => {
  const [idx, setIdx] = useState(0);
  if (!images || images.length === 0) return <div className="w-full h-full bg-slate-800 flex items-center justify-center"><ImageIcon className="text-slate-600" /></div>;
  if (images.length === 1) return <img src={images[0]} className="w-full h-full object-cover" alt="Item Preview" />;
  
  return (
    <div className="relative w-full h-full group overflow-hidden rounded-2xl">
      <img src={images[idx]} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" alt="Item Preview" />
      <button 
        onClick={(e) => { e.stopPropagation(); setIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1)); }} 
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-white/20"
      >
        <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); setIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1)); }} 
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-white/20"
      >
        <ChevronRight className="w-5 h-5 rtl:rotate-180" />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx ? 'bg-white w-4' : 'bg-white/30'}`} />
        ))}
      </div>
    </div>
  );
};

// Secure Login Component using Supabase Auth
const SecureLogin = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError('Access denied. Check credentials.');
      setLoading(false);
    } else if (data.user) {
      onLoginSuccess();
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#030712]">
      <div className="glass-card p-8 md:p-12 rounded-[3rem] w-full max-w-md space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#6C63FF] to-transparent"></div>
        <div className="text-center">
          <div className="w-20 h-20 bg-[#6C63FF]/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-[#6C63FF]/20">
            <Lock className="w-10 h-10 text-[#6C63FF]" />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white uppercase">Admin Vault</h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-2">Secure Authentication Required</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="ADMIN_EMAIL" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full bg-slate-900/50 border border-slate-800 p-4 rounded-2xl outline-none focus:border-[#6C63FF] text-center font-mono text-white text-sm"
            required
          />
          <input 
            type="password" 
            placeholder="ACCESS_KEY" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full bg-slate-900/50 border border-slate-800 p-4 rounded-2xl outline-none focus:border-[#6C63FF] text-center font-mono text-white text-sm"
            required
          />
          {error && <div className="text-red-500 text-[10px] font-black text-center uppercase tracking-widest animate-pulse">{error}</div>}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#6C63FF] py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-[#6C63FF]/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? 'Decrypting...' : 'Engage Portal'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('ku');
  const [session, setSession] = useState<any>(null);
  const [maintenance, setMaintenance] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [stats, setStats] = useState<SiteStats>({ visitors: 0, orders: 0 });
  const [selectedProduct, setSelectedProduct] = useState<PortfolioItem | null>(null);
  const [filter, setFilter] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize Data
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    fetchContent();
    checkMaintenance();

    return () => subscription.unsubscribe();
  }, []);

  const fetchContent = async () => {
    const { data: p } = await supabase.from('portfolio').select('*');
    if (p) setPortfolioItems(p);
    
    const { data: s } = await supabase.from('services').select('*');
    if (s) setServices(s);
  };

  const checkMaintenance = async () => {
    const { data } = await supabase.from('settings').select('value').eq('key', 'maintenance_mode').single();
    if (data) setMaintenance(data.value === true || data.value === 'true');
  };

  useEffect(() => {
    document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
    document.documentElement.lang = lang;
  }, [lang]);

  const filteredItems = useMemo(() => {
    if (filter === 'all') return portfolioItems;
    return portfolioItems.filter(i => i.category.toLowerCase() === filter.toLowerCase());
  }, [filter, portfolioItems]);

  const categories = useMemo(() => ['all', ...Array.from(new Set(portfolioItems.map(p => p.category.toLowerCase())))], [portfolioItems]);

  const isManagementPage = location.pathname === '/admin' || location.pathname === '/login';
  const t = (key: string) => translations[key]?.[lang] || key;

  const handleContactSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name') as string;
    const message = formData.get('message') as string;

    // Save lead to Supabase before redirecting
    await supabase.from('leads').insert([{ 
      name, 
      message, 
      metadata: { path: location.pathname } 
    }]);

    window.open(`https://wa.me/${PHONE_NUMBER.replace('+', '')}?text=Hello, my name is ${name}. ${message}`, '_blank');
  };

  if (maintenance && !isManagementPage) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center p-8 text-center">
         <div className="w-24 h-24 bg-amber-500/10 rounded-[2.5rem] flex items-center justify-center mb-10 border border-amber-500/20">
            <Settings className="w-12 h-12 text-amber-500 animate-spin" />
         </div>
         <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">Precision Synchronization</h1>
         <p className="text-slate-500 max-w-sm font-bold text-xs uppercase tracking-[0.3em] leading-loose">Systems undergoing critical maintenance. Our physical studio remains active.</p>
         <Link to="/login" className="mt-16 text-[10px] font-black uppercase text-slate-800 tracking-[0.5em] hover:text-[#6C63FF] transition-colors">Admin Override</Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen selection:bg-[#6C63FF]/30 ${lang === 'en' ? 'font-inter' : 'font-noto-arabic'}`}>
      {!isManagementPage && (
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#030712]/95 backdrop-blur-3xl border-b border-white/5 h-20 md:h-24 px-6">
          <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 md:gap-4 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#6C63FF] rounded-xl flex items-center justify-center shadow-lg shadow-[#6C63FF]/20 group-hover:rotate-12 transition-all">
                <Printer className="text-white w-6 h-6" />
              </div>
              <span className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase">PrintFusion</span>
            </Link>

            <div className="hidden md:flex flex-1 justify-center space-x-8 rtl:space-x-reverse px-8">
              {[{ key: 'nav_home', path: '/' }, { key: 'nav_services', path: '/services' }, { key: 'nav_portfolio', path: '/portfolio' }, { key: 'nav_about', path: '/about' }, { key: 'nav_contact', path: '/contact' }].map(item => (
                <Link key={item.key} to={item.path} className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all hover:text-[#4ECDC4] relative group/link ${location.pathname === item.path ? 'text-[#6C63FF]' : 'text-slate-400'}`}>
                  {t(item.key)}
                  <span className={`absolute -bottom-2 left-0 h-0.5 bg-[#6C63FF] transition-all ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover/link:w-full'}`}></span>
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/5">
              {['en', 'ar', 'ku'].map(l => (
                <button key={l} onClick={() => setLang(l as Language)} className={`text-[9px] px-3 py-1.5 rounded-lg font-black uppercase tracking-widest transition-all ${lang === l ? 'bg-[#6C63FF] text-white' : 'text-slate-500 hover:text-slate-300'}`}>{l}</button>
              ))}
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-300 p-2 bg-white/5 rounded-xl border border-white/10">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Overlay Menu */}
          {isMenuOpen && (
            <div className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#030712] z-[110] p-10 flex flex-col justify-center animate-in slide-in-from-top duration-500">
              <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 p-4 text-white"><X className="w-8 h-8" /></button>
              <div className="space-y-6">
                {[{ key: 'nav_home', path: '/' }, { key: 'nav_services', path: '/services' }, { key: 'nav_portfolio', path: '/portfolio' }, { key: 'nav_about', path: '/about' }, { key: 'nav_contact', path: '/contact' }].map(item => (
                  <Link key={item.key} to={item.path} onClick={() => setIsMenuOpen(false)} className="block text-2xl font-black uppercase tracking-tighter text-white hover:text-[#6C63FF] transition-colors">{t(item.key)}</Link>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 mt-16 pt-10 border-t border-white/5">
                {['en', 'ar', 'ku'].map(l => (
                  <button key={l} onClick={() => { setLang(l as Language); setIsMenuOpen(false); }} className={`py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest ${lang === l ? 'bg-[#6C63FF] text-white' : 'bg-slate-900 text-slate-500'}`}>{l}</button>
                ))}
              </div>
            </div>
          )}
        </nav>
      )}

      <main className={isManagementPage ? "" : "pt-24 pb-12"}>
        <Routes>
          <Route path="/" element={
            <div className="animate-in fade-in duration-700">
              <section className="min-h-[80vh] flex items-center justify-center text-center px-6">
                <div className="max-w-4xl space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                    <Zap className="w-4 h-4 text-[#4ECDC4]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t('premium_studio_badge')}</span>
                  </div>
                  <h1 className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter leading-tight">{t('hero_title')}</h1>
                  <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">{t('hero_subtitle')}</p>
                  <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8">
                    <Link to="/contact" className="bg-[#6C63FF] px-10 py-5 rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-3 shadow-2xl shadow-[#6C63FF]/30 text-white"><MessageCircle className="w-5 h-5" /> {t('hero_cta_primary')}</Link>
                    <Link to="/portfolio" className="border border-white/10 bg-white/5 px-10 py-5 rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-3 text-white"><Printer className="w-5 h-5" /> {t('hero_cta_secondary')}</Link>
                  </div>
                </div>
              </section>
            </div>
          } />

          <Route path="/contact" element={
            <div className="py-20 px-6 text-center space-y-16 animate-in fade-in duration-700">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-8xl font-black text-gradient uppercase tracking-tighter leading-none">{t('contact_title')}</h2>
                <p className="text-slate-500 uppercase tracking-widest font-black text-xs">{t('contact_subtitle')}</p>
              </div>

              {/* Requested Redesigned Layout */}
              <div className="flex flex-col gap-8 max-w-md mx-auto">
                <button 
                  onClick={() => window.open(`https://wa.me/${PHONE_NUMBER.replace('+', '')}`, '_blank')}
                  className="bg-[#25D366] px-10 py-6 rounded-[2rem] font-bold text-2xl flex items-center justify-center gap-5 shadow-2xl shadow-[#25D366]/20 hover:-translate-y-2 transition-all active:scale-95 group text-white"
                >
                  <MessageCircle className="w-8 h-8 group-hover:rotate-6 transition-transform" /> WhatsApp Direct
                </button>
                <div className="grid grid-cols-2 gap-6">
                  <a href={`tel:${PHONE_NUMBER}`} className="glass-card p-8 rounded-[2rem] flex flex-col items-center gap-4 hover:border-[#4ECDC4] transition-all group">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#4ECDC4]/10 transition-colors">
                      <Phone className="w-7 h-7 text-[#4ECDC4] group-hover:rotate-12 transition-transform" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Quick Call</span>
                  </a>
                  <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="glass-card p-8 rounded-[2rem] flex flex-col items-center gap-4 hover:border-[#6C63FF] transition-all group">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#6C63FF]/10 transition-colors">
                      <MapPin className="w-7 h-7 text-[#6C63FF] group-hover:-translate-y-1 transition-transform" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Directions</span>
                  </a>
                </div>
              </div>

              <div className="max-w-xl mx-auto pt-16">
                 <form onSubmit={handleContactSubmit} className="glass-card p-10 rounded-[2.5rem] space-y-4 text-start">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4">Leave a message</h3>
                    <input name="name" placeholder="YOUR NAME" className="w-full bg-slate-900 border border-slate-800 p-5 rounded-2xl outline-none focus:border-[#6C63FF] text-white text-xs font-bold" required />
                    <textarea name="message" placeholder="TELL US ABOUT YOUR PROJECT..." className="w-full bg-slate-900 border border-slate-800 p-5 rounded-2xl h-40 outline-none focus:border-[#6C63FF] text-white text-xs font-bold" required />
                    <button type="submit" className="w-full bg-slate-100 text-black py-5 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-[#6C63FF] hover:text-white transition-all">
                      <Send className="w-5 h-5" /> Submit & Message
                    </button>
                 </form>
              </div>
            </div>
          } />

          <Route path="/login" element={<SecureLogin onLoginSuccess={() => fetchContent()} />} />
          <Route path="/admin" element={session ? (
            <div className="p-10 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
               <div className="flex justify-between items-center border-b border-white/5 pb-10">
                 <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Command Control</h2>
                 <button onClick={() => supabase.auth.signOut()} className="flex items-center gap-3 text-red-500 font-bold uppercase text-[10px] tracking-widest"><LogOut className="w-4 h-4"/> Terminate Session</button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="glass-card p-10 rounded-[2rem] space-y-4 border-l-4 border-emerald-500">
                     <Users className="w-8 h-8 text-emerald-500" />
                     <h3 className="text-2xl font-black text-white">Live Assets</h3>
                     <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{portfolioItems.length} Products Online</p>
                  </div>
                  <div className="glass-card p-10 rounded-[2rem] space-y-4 border-l-4 border-[#6C63FF]">
                     <ShoppingCart className="w-8 h-8 text-[#6C63FF]" />
                     <h3 className="text-2xl font-black text-white">Service Nodes</h3>
                     <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{services.length} Active Modules</p>
                  </div>
                  <div className="glass-card p-10 rounded-[2rem] space-y-4 border-l-4 border-amber-500">
                     <ShieldAlert className="w-8 h-8 text-amber-500" />
                     <h3 className="text-2xl font-black text-white">Security</h3>
                     <button 
                        onClick={async () => {
                          const newVal = !maintenance;
                          await supabase.from('settings').update({ value: newVal }).eq('key', 'maintenance_mode');
                          setMaintenance(newVal);
                        }}
                        className={`px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest ${maintenance ? 'bg-amber-500 text-black' : 'bg-slate-800 text-white'}`}
                      >
                        {maintenance ? 'Exit Maintenance' : 'Enter Maintenance'}
                      </button>
                  </div>
               </div>
               <div className="glass-card p-10 rounded-[3rem] space-y-8">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">System Logs</h3>
                  <div className="space-y-3">
                     <p className="text-slate-500 font-mono text-xs">Waiting for admin interactions...</p>
                  </div>
               </div>
            </div>
          ) : <Navigate to="/login" />} />
          
          <Route path="/services" element={<div className="py-20 px-6 max-w-5xl mx-auto space-y-16">
            <h2 className="text-5xl font-black text-white uppercase text-center">{t('services_title')}</h2>
            <div className="grid gap-12">
              {services.map(s => (
                <div key={s.id} className="glass-card p-8 rounded-[2.5rem] flex flex-col md:flex-row gap-10 items-center">
                  <img src={s.image} className="w-full md:w-80 h-60 object-cover rounded-3xl" alt="" />
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-white uppercase tracking-tight">{s.title[lang]}</h3>
                    <p className="text-slate-400 leading-relaxed">{s.description[lang]}</p>
                    <Link to="/contact" className="inline-flex items-center gap-2 text-[#4ECDC4] font-bold text-xs uppercase tracking-[0.2em]">Request Quote <ChevronRight className="w-4 h-4 rtl:rotate-180" /></Link>
                  </div>
                </div>
              ))}
            </div>
          </div>} />
          
          <Route path="/portfolio" element={<div className="py-20 px-6 max-w-7xl mx-auto">
             <div className="flex justify-between items-center mb-16">
               <h2 className="text-5xl font-black text-white uppercase">{t('portfolio_title')}</h2>
               <div className="flex gap-2">
                 {categories.map(cat => (
                   <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest ${filter === cat ? 'bg-[#6C63FF] text-white' : 'bg-slate-900 text-slate-500'}`}>{cat}</button>
                 ))}
               </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {filteredItems.map(item => (
                 <div key={item.id} className="glass-card rounded-[2.5rem] overflow-hidden group aspect-[4/5] relative">
                    <img src={item.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent flex flex-col justify-end p-8">
                       <span className="text-[10px] font-black text-[#6C63FF] uppercase tracking-[0.3em] mb-2">{item.category}</span>
                       <h3 className="text-2xl font-black text-white uppercase leading-tight">{item.title[lang]}</h3>
                    </div>
                 </div>
               ))}
             </div>
          </div>} />
          
          <Route path="/about" element={<div className="py-24 px-6 max-w-4xl mx-auto space-y-16 text-center">
             <h2 className="text-5xl font-black text-white uppercase">{t('nav_about')}</h2>
             <p className="text-2xl text-slate-400 font-medium italic">"{t('about_p1')}"</p>
             <div className="grid grid-cols-2 gap-10 text-start">
                <div className="glass-card p-10 rounded-[2.5rem] space-y-4">
                   <Target className="w-10 h-10 text-[#6C63FF]" />
                   <h3 className="text-xl font-black text-white uppercase">{t('about_mission_title')}</h3>
                   <p className="text-slate-500 text-sm leading-relaxed">{t('about_mission_text')}</p>
                </div>
                <div className="glass-card p-10 rounded-[2.5rem] space-y-4">
                   <History className="w-10 h-10 text-[#4ECDC4]" />
                   <h3 className="text-xl font-black text-white uppercase">{t('about_history_title')}</h3>
                   <p className="text-slate-500 text-sm leading-relaxed">{t('about_history_text')}</p>
                </div>
             </div>
          </div>} />
        </Routes>
      </main>

      {!isManagementPage && (
        <footer className="bg-[#01030a] py-20 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="md:col-span-2 space-y-8">
              <span className="text-3xl font-black text-white uppercase tracking-tighter">PrintFusion</span>
              <p className="text-slate-500 max-w-md text-sm leading-relaxed">{t('footer_description')}</p>
              <div className="flex gap-4">
                 {[1, 2].map(i => <div key={i} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-[#6C63FF] transition-all"><Globe className="w-5 h-5 text-slate-500" /></div>)}
              </div>
            </div>
            <div>
               <h4 className="text-white font-black text-xs uppercase tracking-widest mb-8">Access Points</h4>
               <ul className="space-y-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
                  <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
                  <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
                  <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
               </ul>
            </div>
            <div>
               <h4 className="text-white font-black text-xs uppercase tracking-widest mb-8">Headquarters</h4>
               <p className="text-slate-500 text-xs leading-loose font-bold">{ADDRESS}</p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 text-center">
             <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.5em]">Engineering Physical Reality in Iraq Since 2023</p>
          </div>
        </footer>
      )}
    </div>
  );
}
