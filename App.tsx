
import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
  Menu, X, Phone, MessageCircle, MapPin, 
  ChevronRight, ChevronLeft,
  Printer, Settings, Trash2, Users, Lock, 
  LayoutGrid, List as ListIcon, Target, History, Edit3, Image as ImageIcon, ExternalLink,
  Facebook, Instagram, ShieldCheck, Zap, Package,
  BarChart3, Send, LogOut, Plus, ArrowRight, Save, RefreshCcw, Activity, MousePointer2, Truck, ShoppingCart, ShieldAlert, FileText, Layout, Video, Share2
} from 'lucide-react';
import { supabase } from './supabaseClient';
import { translations } from './translations';
import { Language, PortfolioItem, ServiceItem, AdminLog } from './types';

// Simple TikTok Icon as it's not in standard Lucide version usually used
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.31-.75.42-1.24 1.17-1.35 1.99-.06.75.14 1.51.58 2.12.45.62 1.2 1.01 1.96 1.05h.33c.8-.02 1.61-.41 2.12-1.03.49-.6.76-1.37.78-2.14.04-3.34.01-6.68.03-10.02v-3.54z"/>
  </svg>
);

const SnapchatIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2c-.6 0-1.1.1-1.6.2-1.7.3-3.2 1.3-4.2 2.8-.7 1-1.1 2.2-1.1 3.5 0 1.5.5 2.8 1.4 3.9-1.1.4-1.9 1.3-2.4 2.3-.6 1.1-.8 2.4-.6 3.7.2 1.2.8 2.4 1.8 3.2 1.3 1 3 1.4 4.7 1.4.2 0 .4 0 .6-.1 1-.2 2-.5 2.9-.9.9.4 1.9.7 2.9.9.2 0 .4.1.6.1 1.7 0 3.4-.4 4.7-1.4 1-.8 1.6-2 1.8-3.2.2-1.3 0-2.6-.6-3.7-.5-1-1.3-1.9-2.4-2.3.9-1.1 1.4-2.4 1.4-3.9 0-1.3-.4-2.5-1.1-3.5-1-1.5-2.5-2.5-4.2-2.8-.5-.1-1-.2-1.6-.2zm0 2c1.3 0 2.5.8 3.2 2 .5.8.8 1.8.8 2.8 0 1.2-.4 2.3-1.2 3.1-.4.4-.9.7-1.4.8-.4.1-.9.2-1.4.2s-1-.1-1.4-.2c-.5-.1-1-.4-1.4-.8-.8-.8-1.2-1.9-1.2-3.1 0-1 .3-2 .8-2.8.7-1.2 1.9-2 3.2-2z"/>
  </svg>
);

const PHONE_NUMBER = "+9647704979127";
const ADDRESS = "Industrial Area, Koysinjaq (Koya), Erbil Governorate, Iraq";
const MAP_LINK = "https://www.google.com/maps/search/?api=1&query=PrintFusion+Studio+Koya+Iraq";
const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103323.238495572!2d44.57143445!3d36.0844781!2m3!1f0!2f0!3f0!3m2!i1024!2i768!4f13.1!3m3!1m2!1s0x40062327464d609f%3A0x6b498f3e2645e73e!2sKoya%2C%20Erbil%20Governorate!5e0!3m2!1sen!2siq!4v1700000000000!5m2!1sen!2siq";

const ImageSlider = ({ images }: { images: string[] }) => {
  const [idx, setIdx] = useState(0);
  if (!images || images.length === 0) return <div className="w-full h-full bg-slate-800 flex items-center justify-center"><ImageIcon className="text-slate-600" /></div>;
  return (
    <div className="relative w-full h-full group overflow-hidden">
      <img src={images[idx]} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt="Preview" />
      {images.length > 1 && (
        <>
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIdx(prev => (prev === 0 ? images.length - 1 : prev - 1)); }} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"><ChevronLeft className="w-4 h-4" /></button>
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIdx(prev => (prev === images.length - 1 ? 0 : prev + 1)); }} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"><ChevronRight className="w-4 h-4" /></button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx ? 'bg-white w-4' : 'bg-white/30'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const SecureLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#020617]">
      <div className="glass-card p-12 rounded-[3rem] w-full max-w-md space-y-10 text-center relative border border-white/10">
        <div className="w-20 h-20 bg-[#6366f1]/10 rounded-3xl flex items-center justify-center mx-auto border border-[#6366f1]/20">
          <Lock className="w-10 h-10 text-[#6366f1]" />
        </div>
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">System Access</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="ENCRYPTED EMAIL" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-900/50 border border-white/5 p-4 rounded-2xl outline-none focus:border-[#6366f1] text-white text-sm font-bold placeholder:text-slate-600" required />
          <input type="password" placeholder="ACCESS KEY" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-900/50 border border-white/5 p-4 rounded-2xl outline-none focus:border-[#6366f1] text-white text-sm font-bold placeholder:text-slate-600" required />
          {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">{error}</p>}
          <button disabled={loading} type="submit" className="w-full bg-[#6366f1] py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all text-white shadow-xl shadow-[#6366f1]/20">
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
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [socials, setSocials] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const [editingItem, setEditingItem] = useState<Partial<PortfolioItem> | null>(null);
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [editingSocial, setEditingSocial] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setSession(session));
    fetchInitialData();
    return () => subscription.unsubscribe();
  }, []);

  const fetchInitialData = async () => {
    setIsLoading(true);
    const { data: p } = await supabase.from('portfolio').select('*').order('created_at', { ascending: false });
    if (p) setPortfolio(p);
    const { data: s } = await supabase.from('services').select('*').order('created_at', { ascending: false });
    if (s) setServices(s);
    const { data: soc } = await supabase.from('social_links').select('*').order('created_at', { ascending: false });
    if (soc) setSocials(soc);
    const { data: l } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (l) setLeads(l);
    const { data: logsData } = await supabase.from('admin_logs').select('*').order('created_at', { ascending: false }).limit(50);
    if (logsData) setLogs(logsData.map(log => ({ ...log, timestamp: log.created_at })));
    const { data: st } = await supabase.from('settings').select('value').eq('key', 'maintenance_mode').single();
    if (st) setMaintenance(st.value === true);
    setIsLoading(false);
  };

  const createLog = async (action: string, details: string, status: 'success' | 'failure' = 'success') => {
    await supabase.from('admin_logs').insert([{ action, details, status }]);
  };

  const savePortfolioItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const itemData = {
      category: { en: formData.get('cat_en'), ar: formData.get('cat_ar'), ku: formData.get('cat_ku') },
      images: (formData.get('imageUrls') as string).split(',').map(u => u.trim()),
      title: { en: formData.get('title_en'), ar: formData.get('title_ar'), ku: formData.get('title_ku') },
      description: { en: formData.get('desc_en'), ar: formData.get('desc_ar'), ku: formData.get('desc_ku') }
    };
    if (editingItem?.id) await supabase.from('portfolio').update(itemData).eq('id', editingItem.id);
    else await supabase.from('portfolio').insert([itemData]);
    setEditingItem(null);
    fetchInitialData();
    setIsLoading(false);
  };

  const saveServiceItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const serviceData = {
      image: formData.get('image') as string,
      title: { en: formData.get('title_en'), ar: formData.get('title_ar'), ku: formData.get('title_ku') },
      description: { en: formData.get('desc_en'), ar: formData.get('desc_ar'), ku: formData.get('desc_ku') }
    };
    if (editingService?.id) await supabase.from('services').update(serviceData).eq('id', editingService.id);
    else await supabase.from('services').insert([serviceData]);
    setEditingService(null);
    fetchInitialData();
    setIsLoading(false);
  };

  const saveSocialLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const socialData = {
      platform: formData.get('platform') as string,
      url: formData.get('url') as string
    };
    if (editingSocial?.id) await supabase.from('social_links').update(socialData).eq('id', editingSocial.id);
    else await supabase.from('social_links').insert([socialData]);
    setEditingSocial(null);
    fetchInitialData();
    setIsLoading(false);
  };

  const deletePortfolioItem = async (id: string, title: string) => {
    if (window.confirm(`Delete "${title}"?`)) {
      setIsLoading(true);
      const { error } = await supabase.from('portfolio').delete().eq('id', id);
      if (error) {
        await createLog('delete_portfolio_failed', error.message, 'failure');
      } else {
        await createLog('delete_portfolio', `Deleted item: ${title}`);
        fetchInitialData();
      }
      setIsLoading(false);
    }
  };

  const deleteServiceItem = async (id: string, title: string) => {
    if (window.confirm(`Delete service "${title}"?`)) {
      setIsLoading(true);
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) {
        await createLog('delete_service_failed', error.message, 'failure');
      } else {
        await createLog('delete_service', `Deleted service: ${title}`);
        fetchInitialData();
      }
      setIsLoading(false);
    }
  };

  const toggleMaintenance = async () => {
    const newVal = !maintenance;
    await supabase.from('settings').update({ value: newVal }).eq('key', 'maintenance_mode');
    setMaintenance(newVal);
  };

  const filteredItems = useMemo(() => {
    if (filter === 'all') return portfolio;
    return portfolio.filter(i => (i.category.en || '').toLowerCase() === filter.toLowerCase());
  }, [filter, portfolio]);

  const categories = useMemo(() => ['all', ...Array.from(new Set(portfolio.map(p => (p.category.en || '').toLowerCase()))).filter(Boolean)], [portfolio]);

  const isManagement = location.pathname.startsWith('/admin') || location.pathname === '/login';
  const t = (key: string) => translations[key]?.[lang] || key;
  const isRtl = lang === 'ar' || lang === 'ku';

  const getSocialIcon = (platform: string, className?: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return <Facebook className={className} />;
      case 'instagram': return <Instagram className={className} />;
      case 'tiktok': return <TikTokIcon className={className} />;
      case 'snapchat': return <SnapchatIcon className={className} />;
      default: return <Share2 className={className} />;
    }
  };

  return (
    <div className={`min-h-screen bg-[#020617] selection:bg-[#6366f1]/30 ${lang === 'en' ? 'font-inter' : 'font-noto-arabic'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {!isManagement && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F172A]/80 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-[#6C63FF] to-[#FF6B6B] p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-[#6C63FF]/20">
                <Printer className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white leading-none">PRINTFUSION</span>
                <span className="text-[10px] font-bold text-[#6C63FF] tracking-[0.3em] uppercase opacity-80">Studio</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {['home', 'services', 'portfolio', 'about', 'contact'].map(k => (
                <Link key={k} to={k === 'home' ? '/' : `/${k}`} className={`text-sm font-semibold transition-all hover:text-white ${location.pathname === (k === 'home' ? '/' : `/${k}`) ? 'text-[#6C63FF]' : 'text-slate-400'}`}>
                  {t(`nav_${k}`)}
                </Link>
              ))}
              <div className="flex bg-slate-800/50 p-1 rounded-lg border border-white/5">
                {['en', 'ar', 'ku'].map(l => (
                  <button key={l} onClick={() => setLang(l as Language)} className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${lang === l ? 'bg-[#6366f1] text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>{l}</button>
                ))}
              </div>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-400">
               {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-[#0F172A] border-b border-white/5 p-8 space-y-8 animate-in slide-in-from-top-4 duration-300">
              <div className="space-y-4">
                {['home', 'services', 'portfolio', 'about', 'contact'].map(k => (
                  <Link key={k} to={k === 'home' ? '/' : `/${k}`} className="block text-2xl font-black text-slate-200 hover:text-[#6366f1]" onClick={() => setIsMenuOpen(false)}>
                    {t(`nav_${k}`)}
                  </Link>
                ))}
              </div>
              <div className="flex gap-2 p-1 bg-slate-900 rounded-xl border border-white/10">
                {['en', 'ar', 'ku'].map(l => (
                  <button key={l} onClick={() => { setLang(l as Language); setIsMenuOpen(false); }} className={`flex-1 py-4 rounded-lg text-xs font-black uppercase transition-all ${lang === l ? 'bg-[#6366f1] text-white shadow-lg' : 'text-slate-500'}`}>{l}</button>
                ))}
              </div>
            </div>
          )}
        </nav>
      )}

      <main className={isManagement ? "" : "pt-20"}>
        <Routes>
          <Route path="/" element={
            <div className="space-y-32 pb-32">
              <section className="relative h-[85vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#6C63FF]/10 to-transparent pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                      <Zap className="w-4 h-4 text-[#FF6B6B]" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF6B6B]">{t('premium_studio_badge')}</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1]">{t('hero_title')}</h1>
                    <p className="text-lg text-slate-400 leading-relaxed max-w-xl">{t('hero_subtitle')}</p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <a href={`https://wa.me/${PHONE_NUMBER.replace('+', '')}`} target="_blank" rel="noreferrer" className="bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-[#6C63FF]/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                        <MessageCircle className="w-5 h-5" /> {t('hero_cta_primary')}
                      </a>
                      <Link to="/portfolio" className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 backdrop-blur-md hover:bg-white/10 transition-all">
                        {t('hero_cta_secondary')} <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                      </Link>
                    </div>
                  </div>
                  <div className="hidden lg:block relative">
                    <div className="absolute -inset-4 bg-gradient-to-tr from-[#6C63FF]/30 to-[#FF6B6B]/30 blur-3xl rounded-full"></div>
                    <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl rotate-3">
                      <img className="w-full h-full object-cover" alt="Printing Showcase" src="https://images.unsplash.com/photo-1563223552-30400d41fca5?auto=format&fit=crop&q=80&w=1200" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
                      <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                        <p className="text-white font-bold text-lg mb-1">UV Precision Printing</p>
                        <p className="text-white/60 text-xs">Serving Erbil, Sulaymaniyah, Duhok & Baghdad</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-slate-900/50 p-8 rounded-[2rem] border border-white/5 hover:border-white/10 transition-all group">
                  <div className="mb-6 p-4 bg-slate-800 rounded-2xl w-fit group-hover:scale-110 transition-transform text-[#6C63FF]">
                    <Package className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{t('usp_no_min')}</h3>
                  <p className="text-slate-400 text-sm">{t('usp_no_min_desc')}</p>
                </div>
                <div className="bg-slate-900/50 p-8 rounded-[2rem] border border-white/5 hover:border-white/10 transition-all group">
                  <div className="mb-6 p-4 bg-slate-800 rounded-2xl w-fit group-hover:scale-110 transition-transform text-emerald-400">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{t('usp_quality')}</h3>
                  <p className="text-slate-400 text-sm">{t('usp_quality_desc')}</p>
                </div>
                <div className="bg-slate-900/50 p-8 rounded-[2rem] border border-white/5 hover:border-white/10 transition-all group">
                  <div className="mb-6 p-4 bg-slate-800 rounded-2xl w-fit group-hover:scale-110 transition-transform text-amber-400">
                    <Truck className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{t('usp_fast')}</h3>
                  <p className="text-slate-400 text-sm">{t('usp_fast_desc')}</p>
                </div>
              </section>

              <section className="bg-slate-950 py-32 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="text-center space-y-4 mb-20">
                    <h2 className="text-4xl md:text-5xl font-black text-white">{t('process_title')}</h2>
                    <div className="w-20 h-1.5 bg-[#6C63FF] mx-auto rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-slate-800 to-transparent z-0"></div>
                    {[1, 2, 3].map(step => (
                      <div key={step} className="relative z-10 text-center space-y-6">
                        <div className="w-16 h-16 bg-slate-900 border-2 border-[#6C63FF] rounded-2xl flex items-center justify-center text-2xl font-black text-white mx-auto shadow-lg shadow-[#6C63FF]/20">
                          {step}
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-xl font-bold text-white">{t(`step${step}_title`)}</h4>
                          <p className="text-slate-400 text-sm max-w-[250px] mx-auto">{t(`step${step}_desc`)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          } />

          <Route path="/services" element={
            <div className="py-20 max-w-5xl mx-auto px-6 space-y-24">
               <div className="text-center space-y-6">
                 <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">{t('services_title')}</h2>
                 <div className="w-24 h-2 bg-[#6366f1] mx-auto rounded-full" />
                 <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-medium">{t('services_desc')}</p>
               </div>
               <div className="grid gap-16">
                 {services.map(s => (
                   <div key={s.id} className="glass-card p-6 md:p-12 rounded-[2.5rem] md:rounded-[4rem] flex flex-col md:flex-row gap-8 md:gap-16 items-center hover:border-[#6366f1]/20 transition-all duration-700 group">
                     <img src={s.image} className="w-full md:w-80 h-64 md:h-72 object-cover rounded-[2rem] md:rounded-[3rem] border border-white/10 group-hover:scale-105 transition-transform" alt="" />
                     <div className="space-y-6 md:space-y-8 flex-1 text-center md:text-left rtl:md:text-right">
                        <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">{s.title[lang] || s.title.en}</h3>
                        <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed">{s.description[lang] || s.description.en}</p>
                        <Link to="/contact" className="inline-flex items-center gap-4 text-[#6366f1] font-black text-xs uppercase tracking-[0.4em] hover:gap-8 transition-all">
                          {t('hero_cta_primary')} <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
                        </Link>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          } />

          <Route path="/portfolio" element={
            <div className="py-20 max-w-7xl mx-auto px-6 space-y-20">
              <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                <div className="space-y-4">
                  <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">{t('nav_portfolio')}</h2>
                  <div className="w-24 h-1.5 bg-[#6C63FF] rounded-full"></div>
                </div>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10 overflow-x-auto no-scrollbar max-w-full">
                    {categories.map(cat => (
                      <button key={cat} onClick={() => setFilter(cat)} className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${filter === cat ? 'bg-[#6366f1] text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>
                        {cat === 'all' ? t('all') : cat}
                      </button>
                    ))}
                  </div>
                  <div className="flex bg-slate-800/50 p-1 rounded-xl border border-white/5">
                    <button onClick={() => setViewMode('grid')} className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[#6366f1] text-white shadow-md' : 'text-slate-600 hover:text-slate-300'}`}>
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button onClick={() => setViewMode('list')} className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-[#6366f1] text-white shadow-md' : 'text-slate-600 hover:text-slate-300'}`}>
                      <ListIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12" : "space-y-12"}>
                {filteredItems.map((item) => (
                  <div key={item.id} className={`glass-card rounded-[3rem] overflow-hidden group border border-white/5 hover:border-[#6366f1]/30 transition-all duration-700 ${viewMode === 'list' ? 'flex flex-col md:flex-row items-center gap-6 md:gap-10 p-6 md:p-10' : ''}`}>
                     <div className={viewMode === 'list' ? "w-full md:w-80 aspect-square flex-shrink-0 rounded-[2rem] overflow-hidden relative" : "aspect-square overflow-hidden relative"}>
                        <ImageSlider images={item.images} />
                        {viewMode === 'grid' && (
                          <div className="absolute top-6 left-6 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-[9px] font-black text-white uppercase tracking-widest z-10">
                            {item.category[lang] || item.category.en}
                          </div>
                        )}
                     </div>
                     <div className={`space-y-6 ${viewMode === 'list' ? 'flex-1 text-center md:text-left rtl:md:text-right' : 'p-10'}`}>
                        {viewMode === 'list' && <span className="text-[10px] font-black text-[#6366f1] uppercase tracking-[0.3em]">{item.category[lang] || item.category.en}</span>}
                        <h3 className="text-3xl font-black text-white uppercase leading-none tracking-tight">{item.title[lang] || item.title.en}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{item.description[lang] || item.description.en}</p>
                        <button onClick={() => window.open(`https://wa.me/${PHONE_NUMBER.replace('+', '')}?text=${encodeURIComponent(`${t('request_this')}: ${item.title.en}`)}`, '_blank')} className="w-full md:w-fit bg-white/5 py-4 px-8 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.3em] hover:bg-[#6366f1] transition-all border border-white/5 flex items-center justify-center gap-3 mx-auto md:mx-0">
                           <ShoppingCart className="w-4 h-4" /> {t('request_this')}
                        </button>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          } />

          <Route path="/about" element={
            <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-8">
                  <h1 className="text-6xl font-black text-white leading-tight uppercase tracking-tighter">{t('about_title')}</h1>
                  <div className="w-20 h-2 bg-[#6C63FF] rounded-full"></div>
                  <p className="text-xl text-slate-400 leading-relaxed italic border-l-4 border-slate-800 pl-6">"{t('about_p1')}"</p>
                </div>
                <div className="relative">
                  <div className="absolute -inset-10 bg-gradient-to-br from-[#6C63FF]/20 to-[#FF6B6B]/20 blur-3xl"></div>
                  <img className="relative rounded-[3rem] border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 w-full object-cover h-[500px]" alt="About Us" src="https://images.unsplash.com/photo-1513346030226-ee39978b4e42?auto=format&fit=crop&q=80&w=1200" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="glass-card p-12 rounded-[2.5rem] border border-white/5 space-y-6">
                  <Target className="w-12 h-12 text-[#6C63FF]" />
                  <h3 className="text-2xl font-bold text-white">{t('about_mission_title')}</h3>
                  <p className="text-slate-400 leading-relaxed">{t('about_mission_text')}</p>
                </div>
                <div className="bg-slate-900/50 p-12 rounded-[2.5rem] border border-white/5 space-y-6">
                  <History className="w-12 h-12 text-[#FF6B6B]" />
                  <h3 className="text-2xl font-bold text-white">{t('about_history_title')}</h3>
                  <p className="text-slate-400 leading-relaxed">{t('about_history_text')}</p>
                </div>
              </div>
            </div>
          } />

          <Route path="/contact" element={
            <div className="py-20 px-6 max-w-7xl mx-auto flex flex-col items-center">
               <div className="space-y-16 w-full max-w-3xl">
                  <div className="space-y-6 text-center">
                    <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">{t('contact_title')}</h2>
                    <p className="text-slate-500 uppercase font-black text-[11px] tracking-[0.5em]">{t('contact_subtitle')}</p>
                    <div className="w-24 h-2 bg-[#6366f1] mx-auto rounded-full mt-8"></div>
                  </div>
                  <div className="space-y-8">
                    <div className="glass-card p-6 md:p-10 rounded-[3rem] space-y-6 md:space-y-8 border-white/5">
                      <a href={`tel:${PHONE_NUMBER}`} className="flex flex-col md:flex-row items-center gap-6 md:gap-8 p-6 md:p-8 bg-white/5 rounded-[2rem] border border-white/10 hover:border-[#4ECDC4] transition-all group text-center md:text-left rtl:md:text-right">
                         <div className="w-16 h-16 bg-[#4ECDC4]/10 rounded-2xl flex items-center justify-center text-[#4ECDC4] group-hover:scale-110 transition-transform"><Phone className="w-7 h-7" /></div>
                         <div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Direct Comms</p><p className="text-2xl font-bold text-white tracking-tight" dir="ltr">{PHONE_NUMBER}</p></div>
                      </a>
                      <a href={MAP_LINK} target="_blank" rel="noreferrer" className="flex flex-col md:flex-row items-center gap-6 md:gap-8 p-6 md:p-8 bg-[#6366f1]/10 rounded-[2rem] border border-[#6366f1]/20 hover:bg-[#6366f1]/20 transition-all group text-center md:text-left rtl:md:text-right">
                         <div className="w-16 h-16 bg-[#6366f1]/10 rounded-2xl flex items-center justify-center text-[#6366f1] group-hover:scale-110 transition-transform"><MapPin className="w-7 h-7" /></div>
                         <div className="flex-1"><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('location')}</p><p className="text-base font-bold text-white tracking-tight uppercase leading-snug">{ADDRESS}</p></div>
                      </a>
                    </div>
                    <div className="rounded-[3rem] overflow-hidden border border-white/10 h-[300px] md:h-[450px]">
                      <iframe 
                        src={MAP_EMBED_URL}
                        className="w-full h-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                        allowFullScreen={true}
                        loading="lazy"
                        title="Location"
                      />
                    </div>
                  </div>
               </div>
            </div>
          } />

          <Route path="/login" element={<SecureLogin />} />
          <Route path="/admin" element={session ? (
            <div className="min-h-screen p-6 md:p-12 space-y-12 animate-in fade-in duration-700">
               <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 border-b border-white/10 pb-12">
                  <div className="space-y-4">
                    <h2 className="text-5xl font-black text-white uppercase tracking-tighter">Command Center</h2>
                    <div className="flex items-center gap-4">
                       <span className={`w-3 h-3 rounded-full ${maintenance ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Grid Status: {maintenance ? 'Locked' : 'Production'}</p>
                    </div>
                  </div>
                  <button onClick={() => supabase.auth.signOut()} className="px-8 py-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-3"><LogOut className="w-4 h-4" /> Terminate</button>
               </header>

               <nav className="flex gap-4 bg-white/5 p-2 rounded-[2rem] border border-white/10 w-fit overflow-x-auto no-scrollbar">
                  {[
                    { id: 'overview', icon: Activity, label: t('admin_overview') },
                    { id: 'portfolio', icon: Package, label: t('admin_portfolio') },
                    { id: 'services', icon: Layout, label: t('admin_services') },
                    { id: 'social', icon: Share2, label: t('admin_social') },
                    { id: 'logs', icon: ShieldAlert, label: t('admin_logs') }
                  ].map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all flex items-center gap-3 ${activeTab === tab.id ? 'bg-[#6366f1] text-white shadow-xl shadow-[#6366f1]/20' : 'text-slate-500 hover:text-white'}`}>
                      <tab.icon className="w-4 h-4" /> {tab.label}
                    </button>
                  ))}
               </nav>

               <div className="grid grid-cols-1 gap-12">
                 {activeTab === 'social' && (
                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                     <div className="glass-card p-12 rounded-[4rem] h-fit sticky top-12 border-t-8 border-pink-500 space-y-8">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{editingSocial ? 'Edit Link' : 'Add Social Link'}</h3>
                        <form onSubmit={saveSocialLink} className="space-y-6">
                          <select name="platform" defaultValue={editingSocial?.platform} className="w-full bg-slate-900 border border-white/5 p-5 rounded-2xl text-xs font-bold text-white uppercase">
                            <option value="Facebook">Facebook</option>
                            <option value="Instagram">Instagram</option>
                            <option value="TikTok">TikTok</option>
                            <option value="Snapchat">Snapchat</option>
                          </select>
                          <input defaultValue={editingSocial?.url} name="url" placeholder="URL (https://...)" className="w-full bg-slate-900 border border-white/5 p-5 rounded-2xl text-xs font-bold text-white outline-none focus:border-pink-500" required />
                          <button type="submit" className="w-full bg-pink-500 py-6 rounded-[2rem] font-black uppercase text-[11px] tracking-widest text-white shadow-xl">Engage Link</button>
                        </form>
                     </div>
                     <div className="lg:col-span-2 space-y-4">
                       {socials.map(s => (
                         <div key={s.id} className="glass-card p-6 rounded-[2rem] flex items-center justify-between border-white/5">
                            <div className="flex items-center gap-6">
                               {getSocialIcon(s.platform, "w-8 h-8 text-pink-500")}
                               <div>
                                 <h4 className="text-lg font-black text-white uppercase">{s.platform}</h4>
                                 <p className="text-xs text-slate-500">{s.url}</p>
                               </div>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => setEditingSocial(s)} className="p-3 bg-white/5 text-slate-400 rounded-xl hover:text-white transition-all"><Edit3 className="w-4 h-4"/></button>
                              <button onClick={async () => { if(window.confirm('Delete?')){ await supabase.from('social_links').delete().eq('id', s.id); fetchInitialData(); } }} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-4 h-4"/></button>
                            </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 )}
                 {activeTab === 'portfolio' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                      <div className="glass-card p-12 rounded-[4rem] h-fit sticky top-12 border-t-8 border-[#6366f1] space-y-8">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Deploy Asset</h3>
                        <form onSubmit={savePortfolioItem} className="space-y-6">
                          <div className="space-y-4">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Category Assets</label>
                            <input defaultValue={editingItem?.category?.en} name="cat_en" placeholder="Category (EN)" className="w-full bg-slate-900 border border-white/5 p-4 rounded-xl text-xs font-bold text-white" required />
                            <input defaultValue={editingItem?.category?.ar} name="cat_ar" placeholder="الفئة (AR)" className="w-full bg-slate-900 border border-white/5 p-4 rounded-xl text-xs font-bold text-white text-right" dir="rtl" />
                            <input defaultValue={editingItem?.category?.ku} name="cat_ku" placeholder="پۆلێن (KU)" className="w-full bg-slate-900 border border-white/5 p-4 rounded-xl text-xs font-bold text-white text-right" dir="rtl" />
                          </div>
                          <textarea defaultValue={editingItem?.images?.join(', ')} name="imageUrls" placeholder="IMAGE LINKS (comma separated)" className="w-full bg-slate-900 border border-white/5 p-5 rounded-2xl text-xs font-bold text-white h-24" required />
                          <div className="space-y-4">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Title Assets</label>
                            <input defaultValue={editingItem?.title?.en} name="title_en" placeholder="Title (EN)" className="w-full bg-slate-900 p-4 rounded-xl border border-white/5 text-xs font-bold text-white" required />
                            <input defaultValue={editingItem?.title?.ar} name="title_ar" dir="rtl" placeholder="العنوان (AR)" className="w-full bg-slate-900 p-4 rounded-xl border border-white/5 text-xs font-bold text-white" />
                            <input defaultValue={editingItem?.title?.ku} name="title_ku" dir="rtl" placeholder="ناونیشان (KU)" className="w-full bg-slate-900 p-4 rounded-xl border border-white/5 text-xs font-bold text-white" />
                          </div>
                          <button type="submit" className="w-full bg-[#6366f1] py-6 rounded-[2rem] font-black uppercase text-[11px] tracking-widest text-white shadow-xl hover:scale-105 transition-all">Engage Production</button>
                        </form>
                      </div>
                      <div className="lg:col-span-2 space-y-4">
                        {portfolio.map(p => (
                          <div key={p.id} className="glass-card p-6 rounded-[2rem] flex items-center justify-between border-white/5">
                            <div className="flex items-center gap-6">
                              <img src={p.images[0]} className="w-16 h-16 rounded-xl object-cover" />
                              <h4 className="text-xl font-black text-white uppercase">{p.title.en}</h4>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => setEditingItem(p)} className="p-3 bg-white/5 text-slate-400 rounded-xl hover:text-white transition-all"><Edit3 className="w-4 h-4"/></button>
                              <button onClick={() => deletePortfolioItem(p.id, p.title.en)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-4 h-4"/></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                 )}
                 {activeTab === 'services' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                      <div className="glass-card p-12 rounded-[4rem] h-fit sticky top-12 border-t-8 border-emerald-500 space-y-8">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Define Service</h3>
                        <form onSubmit={saveServiceItem} className="space-y-6">
                          <input defaultValue={editingService?.image} name="image" placeholder="IMAGE LINK (HTTPS)" className="w-full bg-slate-900 border border-white/5 p-4 rounded-xl text-xs font-bold text-white" required />
                          <div className="space-y-4">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Title Protocol</label>
                            <input defaultValue={editingService?.title?.en} name="title_en" placeholder="Title (EN)" className="w-full bg-slate-900 p-4 rounded-xl border border-white/5 text-xs font-bold text-white" required />
                            <input defaultValue={editingService?.title?.ar} name="title_ar" dir="rtl" placeholder="العنوان (AR)" className="w-full bg-slate-900 p-4 rounded-xl border border-white/5 text-xs font-bold text-white" />
                            <input defaultValue={editingService?.title?.ku} name="title_ku" dir="rtl" placeholder="ناونیشان (KU)" className="w-full bg-slate-900 p-4 rounded-xl border border-white/5 text-xs font-bold text-white" />
                          </div>
                          <button type="submit" className="w-full bg-emerald-500 py-6 rounded-[2rem] font-black uppercase text-[11px] tracking-widest text-white shadow-xl hover:scale-105 transition-all">Engage Service</button>
                        </form>
                      </div>
                      <div className="lg:col-span-2 space-y-4">
                        {services.map(s => (
                          <div key={s.id} className="glass-card p-6 rounded-[2rem] flex items-center justify-between border-white/5">
                            <div className="flex items-center gap-6">
                              <img src={s.image} className="w-16 h-16 rounded-xl object-cover" />
                              <h4 className="text-xl font-black text-white uppercase">{s.title.en}</h4>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => setEditingService(s)} className="p-3 bg-white/5 text-slate-400 rounded-xl hover:text-white transition-all"><Edit3 className="w-4 h-4"/></button>
                              <button onClick={() => deleteServiceItem(s.id, s.title.en)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-4 h-4"/></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                 )}
                 {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="glass-card p-12 rounded-[3rem] border-l-4 border-blue-500"><h4 className="text-slate-500 font-bold uppercase text-[10px] mb-2">Portfolio</h4><p className="text-5xl font-black text-white">{portfolio.length}</p></div>
                      <div className="glass-card p-12 rounded-[3rem] border-l-4 border-green-500"><h4 className="text-slate-500 font-bold uppercase text-[10px] mb-2">Services</h4><p className="text-5xl font-black text-white">{services.length}</p></div>
                      <div className="glass-card p-12 rounded-[3rem] border-l-4 border-pink-500"><h4 className="text-slate-500 font-bold uppercase text-[10px] mb-2">Socials</h4><p className="text-5xl font-black text-white">{socials.length}</p></div>
                    </div>
                 )}
               </div>
            </div>
          ) : <Navigate to="/login" />} />
        </Routes>
      </main>

      {!isManagement && (
        <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <Printer className="w-8 h-8 text-[#6C63FF]" />
                <span className="text-2xl font-black text-white uppercase tracking-tighter">PRINTFUSION</span>
              </div>
              <p className="text-slate-500 leading-relaxed max-w-md">{t('footer_description')}</p>
              <div className="flex flex-wrap gap-4">
                {socials.map(s => (
                  <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="bg-slate-900 p-3 rounded-xl text-slate-400 hover:text-[#6C63FF] transition-all border border-white/5">
                    {getSocialIcon(s.platform, "w-6 h-6")}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-[0.4em] mb-6">{t('nav_services')}</h4>
              <ul className="space-y-3 text-slate-500 text-sm font-medium">
                {services.map(s => (
                  <li key={s.id}>{s.title[lang] || s.title.en}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-[0.4em] mb-6">{t('nav_contact')}</h4>
              <ul className="space-y-4 text-slate-500 text-sm font-medium">
                <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-[#6C63FF] shrink-0" /><span>{ADDRESS}</span></li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#6C63FF] shrink-0" /><span dir="ltr">{PHONE_NUMBER}</span></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-10 text-center">
            <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.5em]">© {new Date().getFullYear()} PrintFusion Studio. Engineering Physical Reality.</p>
          </div>
        </footer>
      )}
    </div>
  );
}
