
import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
  Menu, X, Phone, MessageCircle, MapPin, 
  ChevronRight, ChevronLeft,
  Printer, 
  Truck, Settings, Trash2, Users, ShoppingCart, Lock, 
  LayoutGrid, List as ListIcon, Target, History, Edit3, Image as ImageIcon,
  Facebook, Instagram, Music2, ShieldCheck, Zap, Package,
  BarChart3, ShieldAlert, Globe
} from 'lucide-react';
import { translations } from './translations';
import { Language, NavItem, PortfolioItem, ServiceItem, SocialLink, SiteStats, MultiLangText, AdminLog } from './types';

const PHONE_NUMBER = "+9647704979127";
const ADDRESS = "Industrial Area, Koysinjaq (Koya), Erbil Governorate, Iraq";
const MAP_LINK = "https://www.google.com/maps/search/?api=1&query=PrintFusion+Studio+Koya+Iraq";
const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103323.238495572!2d44.57143445!3d36.0844781!2m3!1f0!2f0!3f0!3m2!i1024!2i768!4f13.1!3m3!1m2!1s0x40062327464d609f%3A0x6b498f3e2645e73e!2sKoya%2C%20Erbil%20Governorate!5e0!3m2!1sen!2siq!4v1700000000000!5m2!1sen!2siq";

const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 's_dtf',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
    title: { en: 'DTF Transfers', ar: 'نقل DTF', ku: 'چاپی DTF' },
    description: { en: 'Direct-to-Film printing for vibrant, durable designs on any fabric.', ar: 'طباعة مباشرة على الفيلم لتصاميم حيوية ومتينة على أي قماش.', ku: 'چاپکردنی ڕاستەوخۆ لەسەر فیلم بۆ دیزاینی گەشاوە و بەهێز لەسەر هەر جۆرە قوماشێک.' }
  },
  {
    id: 's_uv',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=1000',
    title: { en: 'UV Printing', ar: 'طباعة UV', ku: 'چاپی UV' },
    description: { en: 'Permanent printing on phone cases, pens, and more.', ar: 'طباعة دائمة على أغلفة الهواتف والأقلام.', ku: 'چاپکردنی هەمیشەیی لەسەر کەڤەری مۆبایل و قەڵەم.' }
  }
];

const INITIAL_PORTFOLIO: PortfolioItem[] = [
  { 
    id: 'p1', 
    category: 'Apparel', 
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1200'
    ], 
    title: { en: 'Signature Custom T-Shirt', ar: 'تيشيرت مخصص', ku: 'تیشێرتی تایبەت' },
    description: { en: 'High-quality cotton T-shirt with vivid DTF printing.', ar: 'تيشيرت قطني عالي الجودة مع طباعة DTF زاهية.', ku: 'تیشێرتی لۆکەی کوالێتی بەرز بە چاپی DTF.' }
  },
  { 
    id: 'p2', 
    category: 'Promotional', 
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200'
    ], 
    title: { en: 'Engraved Tech Set', ar: 'مجموعة تقنية منقوشة', ku: 'کۆمەڵە تەکنەلۆژیای هەڵکۆڵراو' },
    description: { en: 'UV printed gadgets with corporate branding.', ar: 'أجهزة مطبوعة بتقنية UV مع شعار الشركة.', ku: 'کەلوپەلی چاپکراو بە UV لەگەڵ براندی کۆمپانیا.' }
  }
];

const INITIAL_SOCIALS: SocialLink[] = [
  { id: 'soc1', platform: 'Instagram', url: 'https://instagram.com/printfusion', iconName: 'Instagram' },
  { id: 'soc2', platform: 'Facebook', url: 'https://facebook.com/printfusion', iconName: 'Facebook' },
];

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

const MultiLangInput = ({ label, values, onChange }: { label: string, values: MultiLangText, onChange: (v: MultiLangText) => void }) => (
  <div className="space-y-2 border-l-2 border-[#6C63FF]/30 pl-4 py-2 bg-white/5 rounded-r-xl">
    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{label}</label>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="space-y-1">
        <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest ml-1">English</span>
        <input placeholder="English" value={values.en} onChange={e => onChange({...values, en: e.target.value})} className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded-lg text-sm outline-none focus:border-[#6C63FF] transition-colors" />
      </div>
      <div className="space-y-1">
        <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest ml-1">Arabic</span>
        <input placeholder="Arabic" value={values.ar} onChange={e => onChange({...values, ar: e.target.value})} className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded-lg text-sm outline-none focus:border-[#6C63FF] transition-colors text-right" dir="rtl" />
      </div>
      <div className="space-y-1">
        <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest ml-1">Kurdish</span>
        <input placeholder="Kurdish" value={values.ku} onChange={e => onChange({...values, ku: e.target.value})} className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded-lg text-sm outline-none focus:border-[#6C63FF] transition-colors text-right" dir="rtl" />
      </div>
    </div>
  </div>
);

const SecureLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [step, setStep] = useState(1);
  const [pass, setPass] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockout, setLockout] = useState(false);
  const navigate = useNavigate();

  const handleInitialAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockout) return;
    if (pass === 'admin123') {
      setStep(2);
      setError('');
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 3) {
        setLockout(true);
        setError('Intrusion protocol active. 5-minute lockout.');
        setTimeout(() => setLockout(false), 300000);
      } else {
        setError(`Access denied. ${3 - newAttempts} attempts remaining.`);
      }
    }
  };

  const handle2FA = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '123456') {
      onLogin();
      navigate('/admin');
    } else {
      setError('Invalid sequence.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-slate-950">
      <div className="glass-card p-8 md:p-10 rounded-[2.5rem] w-full max-w-md space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#6C63FF] to-transparent"></div>
        <div className="text-center">
          <div className="w-16 h-16 bg-[#6C63FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-[#6C63FF]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">{step === 1 ? 'Admin Gateway' : 'Identity Verification'}</h2>
        </div>

        {step === 1 ? (
          <form onSubmit={handleInitialAuth} className="space-y-5">
            <input 
              type="password" 
              placeholder="MASTER_KEY" 
              value={pass} 
              disabled={lockout}
              onChange={(e) => setPass(e.target.value)} 
              className="w-full bg-slate-900/50 border border-slate-800 p-4 rounded-2xl outline-none focus:border-[#6C63FF] text-center tracking-[0.5em] text-lg font-mono text-white"
            />
            {error && <div className="text-red-500 text-xs font-black text-center uppercase tracking-widest animate-pulse">{error}</div>}
            <button type="submit" disabled={lockout} className="w-full bg-[#6C63FF] py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-[#6C63FF]/20 hover:scale-[1.02] transition-all">Engage</button>
          </form>
        ) : (
          <form onSubmit={handle2FA} className="space-y-5">
            <input 
              type="text" 
              placeholder="000 000" 
              maxLength={6}
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              className="w-full bg-slate-900/50 border border-slate-800 p-4 rounded-2xl outline-none focus:border-[#4ECDC4] text-center tracking-[1em] text-2xl font-black text-[#4ECDC4]"
            />
            {error && <p className="text-red-500 text-xs font-black text-center uppercase">{error}</p>}
            <button type="submit" className="w-full bg-[#4ECDC4] py-4 rounded-2xl font-black text-slate-900 uppercase tracking-widest text-xs shadow-xl shadow-[#4ECDC4]/20">Authorize</button>
            <button type="button" onClick={() => setStep(1)} className="w-full text-slate-600 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Abort Access</button>
          </form>
        )}
      </div>
    </div>
  );
};

const AdminDashboard = ({ 
  stats, portfolio, setPortfolio, services, setServices, 
  socialLinks, setSocialLinks, 
  logs, logAction, onLogout, maintenance, setMaintenance 
}: any) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'services' | 'socials' | 'hardening'>('overview');
  const [editingId, setEditingId] = useState<string | null>(null);

  const emptyText = { en: '', ar: '', ku: '' };
  
  const [pForm, setPForm] = useState<Omit<PortfolioItem, 'id'>>({ category: 'General', images: [], title: { ...emptyText }, description: { ...emptyText } });
  const [sForm, setSForm] = useState<Omit<ServiceItem, 'id'>>({ image: '', title: { ...emptyText }, description: { ...emptyText } });
  const [socForm, setSocForm] = useState<Omit<SocialLink, 'id'>>({ platform: 'Other', url: '', iconName: 'Link' });

  const commitAction = (type: string, id: string | null, action: () => void) => {
    action();
    logAction(`${id ? 'Modified' : 'Created'} ${type}: ${id || 'New Entity'}`, 'success');
    setEditingId(null);
    resetForms();
  };

  const resetForms = () => {
    setPForm({ category: 'General', images: [], title: { ...emptyText }, description: { ...emptyText } });
    setSForm({ image: '', title: { ...emptyText }, description: { ...emptyText } });
    setSocForm({ platform: 'Other', url: '', iconName: 'Link' });
    setEditingId(null);
  };

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-6 space-y-12 bg-slate-950 min-h-screen animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">Command Center</h2>
          <div className="flex items-center gap-3 mt-2">
            <span className={`w-2 h-2 rounded-full ${maintenance ? 'bg-amber-500' : 'bg-[#4ECDC4]'} animate-pulse`}></span>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Environment: <span className="text-white">{maintenance ? 'MAINTENANCE' : 'LIVE_PRODUCTION'}</span></p>
          </div>
        </div>
        <button onClick={onLogout} className="w-full md:w-auto px-8 py-3 bg-red-600/10 text-red-500 border border-red-500/20 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">Terminate Access</button>
      </div>

      <nav className="flex gap-2 bg-slate-900/30 p-2 rounded-2xl border border-white/5 w-full md:w-fit overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Dashboard', icon: BarChart3 },
          { id: 'portfolio', label: 'Inventory', icon: Package },
          { id: 'services', label: 'Services', icon: Zap },
          { id: 'socials', label: 'Ecosystem', icon: Globe },
          { id: 'hardening', label: 'Security', icon: ShieldCheck }
        ].map(tab => (
          <button 
            key={tab.id} 
            onClick={() => { setActiveTab(tab.id as any); resetForms(); }} 
            className={`px-4 md:px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id ? 'bg-[#6C63FF] text-white' : 'text-slate-500 hover:text-white'}`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </nav>

      <div className="grid grid-cols-1 gap-12">
        {activeTab === 'overview' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Visits', val: stats.visitors, color: '#6C63FF', icon: Users },
                { label: 'Total Intents', val: stats.orders, color: '#4ECDC4', icon: ShoppingCart },
                { label: 'Live Assets', val: portfolio.length, color: '#F7931E', icon: Package },
                { label: 'Auth Logs', val: logs.length, color: '#FF4F5B', icon: History }
              ].map(stat => (
                <div key={stat.label} className="glass-card p-8 rounded-[2rem] relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full" style={{ background: stat.color }}></div>
                  <stat.icon className="absolute top-6 right-6 w-12 h-12 opacity-5" />
                  <p className="text-3xl md:text-4xl font-black text-white mb-2">{stat.val}</p>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="glass-card p-8 md:p-10 rounded-[3rem] space-y-6">
              <h3 className="text-2xl font-black text-white uppercase">{editingId ? 'Modify Product' : 'Add New Product'}</h3>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Category</label>
                <input value={pForm.category} onChange={e => setPForm({...pForm, category: e.target.value})} className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-xs text-white" placeholder="e.g. Apparel, Promotional" />
              </div>
              <MultiLangInput label="Product Name" values={pForm.title} onChange={v => setPForm({...pForm, title: v})} />
              <MultiLangInput label="Description" values={pForm.description} onChange={v => setPForm({...pForm, description: v})} />
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Gallery Assets (One URL per line)</label>
                <textarea 
                  value={pForm.images.join('\n')} 
                  onChange={e => setPForm({...pForm, images: e.target.value.split('\n').map(s => s.trim()).filter(s => s)}) }
                  className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-xs font-mono min-h-[140px] text-[#4ECDC4] outline-none focus:border-[#6C63FF]"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => commitAction('Portfolio', editingId, () => {
                    if (editingId) setPortfolio(portfolio.map((p: any) => p.id === editingId ? { ...pForm, id: editingId } : p));
                    else setPortfolio([...portfolio, { ...pForm, id: Date.now().toString() }]);
                  })}
                  className="flex-1 bg-[#6C63FF] py-5 rounded-2xl font-black uppercase text-xs shadow-2xl shadow-[#6C63FF]/30 hover:bg-[#5a52e0] transition-colors text-white"
                >{editingId ? 'Update' : 'Add to Catalog'}</button>
                {editingId && (
                  <button onClick={resetForms} className="px-8 py-5 bg-slate-800 rounded-2xl font-black uppercase text-xs text-white">Cancel</button>
                )}
              </div>
            </div>
            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
               {portfolio.map((item: any) => (
                 <div key={item.id} className="glass-card p-6 rounded-3xl flex items-center justify-between border-white/5 hover:border-[#6C63FF]/50 transition-all group">
                   <div className="flex items-center gap-6">
                     <img src={item.images[0]} className="w-16 h-16 rounded-2xl object-cover shadow-2xl" alt={item.title.en} />
                     <div>
                       <p className="font-black text-white uppercase text-sm">{item.title.en}</p>
                       <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{item.category} • {item.images.length} Images</p>
                     </div>
                   </div>
                   <div className="flex gap-2">
                      <button onClick={() => { setEditingId(item.id); setPForm(item); }} className="p-3 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all"><Edit3 className="w-4 h-4"/></button>
                      <button onClick={() => commitAction('Portfolio Delete', item.id, () => setPortfolio(portfolio.filter((p:any) => p.id !== item.id)))} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-4 h-4"/></button>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {activeTab === 'hardening' && (
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="glass-card p-8 md:p-10 rounded-[3rem] space-y-8">
              <h3 className="text-2xl font-black text-white uppercase flex items-center gap-3"><ShieldAlert className="w-7 h-7 text-red-500" /> Operational Security</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-slate-900/50 rounded-3xl border border-white/5">
                   <div>
                     <p className="font-black text-white uppercase text-sm">Maintenance Mode</p>
                     <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Restrict public access</p>
                   </div>
                   <button 
                     onClick={() => { setMaintenance(!maintenance); logAction(`Maintenance Mode: ${!maintenance}`, 'success'); }}
                     className={`w-14 h-8 rounded-full relative transition-all ${maintenance ? 'bg-amber-500' : 'bg-slate-700'}`}
                   >
                     <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${maintenance ? 'right-1' : 'left-1'}`}></div>
                   </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('ku');
  const [isAdmin, setIsAdmin] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('is_admin') === 'true' : false));
  const [maintenance, setMaintenance] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('maintenance_mode') === 'true' : false));
  const location = useLocation();

  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    const s = typeof window !== 'undefined' ? localStorage.getItem('p_items') : null;
    return s ? JSON.parse(s) : INITIAL_PORTFOLIO;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const s = typeof window !== 'undefined' ? localStorage.getItem('s_items') : null;
    return s ? JSON.parse(s) : INITIAL_SERVICES;
  });

  const [adminLogs, setAdminLogs] = useState<AdminLog[]>(() => {
    const s = typeof window !== 'undefined' ? localStorage.getItem('a_logs') : null;
    return s ? JSON.parse(s) : [];
  });

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => {
    const s = typeof window !== 'undefined' ? localStorage.getItem('s_links') : null;
    return s ? JSON.parse(s) : INITIAL_SOCIALS;
  });

  const [selectedProduct, setSelectedProduct] = useState<PortfolioItem | null>(null);
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [stats, setStats] = useState<SiteStats>(() => {
    const s = typeof window !== 'undefined' ? localStorage.getItem('s_stats') : null;
    return s ? JSON.parse(s) : { visitors: 0, orders: 0 };
  });

  useEffect(() => { localStorage.setItem('p_items', JSON.stringify(portfolioItems)); }, [portfolioItems]);
  useEffect(() => { localStorage.setItem('s_items', JSON.stringify(services)); }, [services]);
  useEffect(() => { localStorage.setItem('a_logs', JSON.stringify(adminLogs)); }, [adminLogs]);
  useEffect(() => { localStorage.setItem('s_links', JSON.stringify(socialLinks)); }, [socialLinks]);
  useEffect(() => { localStorage.setItem('s_stats', JSON.stringify(stats)); }, [stats]);
  useEffect(() => { localStorage.setItem('maintenance_mode', maintenance.toString()); }, [maintenance]);

  useEffect(() => {
    if (!isAdmin && typeof window !== 'undefined' && !sessionStorage.getItem('v')) {
      setStats(p => ({ ...p, visitors: p.visitors + 1 }));
      sessionStorage.setItem('v', '1');
    }
  }, [isAdmin]);

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

  const logAdminAction = (action: string, status: 'success' | 'failure') => {
    const newLog: AdminLog = {
      id: Date.now().toString(),
      action,
      timestamp: new Date().toLocaleString(),
      status
    };
    setAdminLogs(prev => [...prev, newLog]);
  };

  const ProductModal = ({ product, onClose }: { product: PortfolioItem, onClose: () => void }) => {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
        <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose}></div>
        <div className="glass-card w-full max-w-4xl rounded-[2rem] md:rounded-[3rem] overflow-hidden relative z-10 flex flex-col md:flex-row shadow-2xl border-white/10 animate-in zoom-in-95 duration-500 max-h-[90vh] overflow-y-auto no-scrollbar">
          <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 z-20 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white backdrop-blur-md transition-all"><X className="w-5 h-5" /></button>
          <div className="w-full md:w-1/2 aspect-square relative bg-slate-900 border-r border-white/5">
            <ImageSlider images={product.images} />
          </div>
          <div className={`w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-[#030712] text-start`}>
            <span className="text-[#6C63FF] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 px-3 py-1 bg-[#6C63FF]/10 rounded-full w-fit">{product.category}</span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 tracking-tight leading-none text-white">{product.title[lang]}</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 md:mb-8 opacity-80">{product.description[lang]}</p>
            <a 
               onClick={() => { setStats(prev => ({...prev, orders: prev.orders + 1})); }}
               href={`https://wa.me/${PHONE_NUMBER.replace('+', '')}?text=Interest: ${product.title.en}`}
               target="_blank"
               rel="noopener noreferrer"
               className="w-full bg-[#6C63FF] py-4 rounded-[1.25rem] md:rounded-[1.5rem] font-bold flex items-center justify-center gap-3 hover:bg-[#5a52e0] transition-all transform active:scale-95 shadow-2xl shadow-[#6C63FF]/30 text-white"
            >
              <MessageCircle className="w-6 h-6" /> {t('request_this')}
            </a>
          </div>
        </div>
      </div>
    );
  };

  if (maintenance && !isManagementPage) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 text-center">
         <div className="w-20 h-20 md:w-24 md:h-24 bg-amber-500/10 rounded-[2rem] flex items-center justify-center mb-10 border border-amber-500/20">
            <Settings className="w-10 h-10 md:w-12 md:h-12 text-amber-500 animate-spin" />
         </div>
         <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">Precision Tuning</h1>
         <p className="text-slate-500 max-w-sm font-bold text-xs md:text-sm leading-relaxed uppercase tracking-widest">Our engineering sub-systems are currently undergoing synchronization.</p>
         <Link to="/login" className="mt-12 text-[10px] font-black uppercase text-slate-800 tracking-[0.5em] hover:text-white transition-colors">Admin Portal Override</Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen selection:bg-[#6C63FF]/30 ${lang === 'en' ? 'font-inter' : 'font-noto-arabic'}`}>
      {!isManagementPage && <Navbar lang={lang} setLang={setLang} isAdmin={isAdmin} />}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      <main className={isManagementPage ? "" : "pb-12"}>
        <Routes>
          <Route path="/" element={
            <div className="animate-in fade-in duration-700">
              <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-6">
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-[#6C63FF] rounded-full filter blur-[100px] opacity-[0.05] animate-pulse"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-[#4ECDC4] rounded-full filter blur-[100px] opacity-[0.05] animate-pulse delay-1000"></div>
                </div>
                <div className="max-w-5xl mx-auto text-center z-10 space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full animate-in slide-in-from-top-4 duration-1000 mb-6">
                    <Zap className="w-3.5 h-3.5 text-[#4ECDC4]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t('premium_studio_badge')}</span>
                  </div>
                  <h1 className="text-3xl md:text-8xl font-black mb-6 text-white uppercase tracking-tighter leading-[1.1] md:leading-[0.9] pt-4">{translations.hero_title[lang]}</h1>
                  <p className="text-slate-400 mb-10 text-sm md:text-xl font-medium max-w-2xl mx-auto leading-relaxed opacity-80">{translations.hero_subtitle[lang]}</p>
                  <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
                    <Link to="/contact" className="bg-[#6C63FF] px-8 md:px-10 py-4 rounded-[1.25rem] md:rounded-[1.5rem] font-bold flex items-center justify-center gap-3 hover:shadow-[0_0_40px_rgba(108,99,255,0.4)] transition-all transform hover:-translate-y-1 active:scale-95 text-white"><MessageCircle className="w-5 h-5" /> {translations.hero_cta_primary[lang]}</Link>
                    <Link to="/portfolio" className="border border-white/10 bg-white/5 backdrop-blur-md px-8 md:px-10 py-4 rounded-[1.25rem] md:rounded-[1.5rem] font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all transform hover:-translate-y-1 active:scale-95 text-white"><Printer className="w-5 h-5" /> {translations.hero_cta_secondary[lang]}</Link>
                  </div>
                </div>
              </section>

              {/* How it Works Section */}
              <section className="py-24 max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-16 tracking-tight uppercase text-white">How it Works</h2>
                <div className="grid md:grid-cols-3 gap-12">
                  <div className="text-center space-y-6 group">
                    <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center mx-auto group-hover:border-[#6C63FF]/50 group-hover:shadow-[0_0_30px_rgba(108,99,255,0.1)] transition-all duration-500 relative">
                      <span className="absolute -top-3 -right-3 w-8 h-8 bg-[#6C63FF] rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg">1</span>
                      <MessageCircle className="w-8 h-8 text-[#6C63FF]" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold tracking-tight uppercase text-white">{translations.step1_title[lang]}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed px-6">{translations.step1_desc[lang]}</p>
                    </div>
                  </div>
                  <div className="text-center space-y-6 group">
                    <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center mx-auto group-hover:border-[#6C63FF]/50 group-hover:shadow-[0_0_30px_rgba(108,99,255,0.1)] transition-all duration-500 relative">
                      <span className="absolute -top-3 -right-3 w-8 h-8 bg-[#6C63FF] rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg">2</span>
                      <Printer className="w-8 h-8 text-[#4ECDC4]" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold tracking-tight uppercase text-white">{translations.step2_title[lang]}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed px-6">{translations.step2_desc[lang]}</p>
                    </div>
                  </div>
                  <div className="text-center space-y-6 group">
                    <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center mx-auto group-hover:border-[#6C63FF]/50 group-hover:shadow-[0_0_30px_rgba(108,99,255,0.1)] transition-all duration-500 relative">
                      <span className="absolute -top-3 -right-3 w-8 h-8 bg-[#6C63FF] rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg">3</span>
                      <Truck className="w-8 h-8 text-[#6C63FF]" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold tracking-tight uppercase text-white">{translations.step3_title[lang]}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed px-6">{translations.step3_desc[lang]}</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="py-20 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-900/50">
                {['usp_no_min', 'usp_quality', 'usp_fast'].map((key) => (
                  <div key={key} className={`glass-card p-8 md:p-10 rounded-[2rem] hover:border-[#6C63FF]/40 transition-all duration-500 text-start group`}>
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#6C63FF]/10 transition-colors">
                       {key === 'usp_no_min' && <Package className="w-6 h-6 text-[#4ECDC4]" />}
                       {key === 'usp_quality' && <ShieldCheck className="w-6 h-6 text-[#6C63FF]" />}
                       {key === 'usp_fast' && <Zap className="w-6 h-6 text-[#4ECDC4]" />}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight leading-none uppercase text-white">{translations[key][lang]}</h3>
                    <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed opacity-70">Excellence for every production run in Kurdistan & Iraq.</p>
                  </div>
                ))}
              </section>
            </div>
          } />
          <Route path="/services" element={
            <div className="py-12 md:py-20 px-6 max-w-5xl mx-auto space-y-12 md:space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-gradient uppercase tracking-tight leading-none">{translations.services_title[lang]}</h2>
                <p className="text-slate-400 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">{translations.services_desc[lang]}</p>
              </div>
              <div className="grid gap-8 md:gap-12">
                {services.map((s, idx) => (
                  <div key={s.id} className={`flex flex-col md:flex-row gap-8 md:gap-10 items-center glass-card p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] group hover:border-[#6C63FF]/50 transition-all duration-500 shadow-xl ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="w-full md:w-1/2 aspect-[16/10] md:h-80 overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-2xl">
                      <img src={s.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={s.title.en} />
                    </div>
                    <div className={`flex-1 space-y-4 md:space-y-6 text-start`}>
                      <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-none">{s.title[lang]}</h3>
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed opacity-80">{s.description[lang]}</p>
                      <Link to="/contact" className="inline-flex items-center gap-3 text-[10px] md:text-xs font-bold text-[#4ECDC4] uppercase tracking-[0.2em] group/btn">
                        Get Estimate <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform rtl:rotate-180" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          } />
          <Route path="/portfolio" element={
            <div className="py-12 md:py-16 max-w-7xl mx-auto px-6 animate-in fade-in duration-700">
              <div className="text-center mb-12 md:mb-16 space-y-6">
                <h2 className="text-4xl md:text-5xl font-black text-gradient uppercase tracking-tight">{translations.portfolio_title[lang]}</h2>
                <div className="flex flex-col md:flex-row items-center justify-between gap-5 bg-slate-900/50 p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] border border-slate-800 backdrop-blur-xl shadow-2xl">
                  <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                    {categories.map(cat => (
                      <button key={cat} onClick={() => setFilter(cat)} className={`px-4 md:px-6 py-2 rounded-xl text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${filter === cat ? 'bg-[#6C63FF] text-white shadow-xl shadow-[#6C63FF]/30' : 'bg-slate-800 text-slate-500 hover:text-white hover:bg-slate-700'}`}>{cat === 'all' ? translations.all[lang] : cat}</button>
                    ))}
                  </div>
                  <div className="flex bg-slate-800/80 p-1.5 rounded-xl border border-white/5">
                    <button onClick={()=>setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[#6C63FF] text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}><LayoutGrid className="w-4 h-4" /></button>
                    <button onClick={()=>setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-[#6C63FF] text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}><ListIcon className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {filteredItems.map(i => (
                    <div key={i.id} onClick={() => setSelectedProduct(i)} className="glass-card rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group hover:border-[#6C63FF]/50 transition-all cursor-pointer aspect-[4/5] relative shadow-2xl">
                      <img src={i.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={i.title.en} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-10 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <span className="text-[10px] font-bold uppercase text-[#4ECDC4] mb-3 tracking-[0.3em]">{i.category}</span>
                        <h3 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase leading-none">{i.title[lang]}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 md:space-y-6">
                  {filteredItems.map(i => (
                    <div key={i.id} onClick={() => setSelectedProduct(i)} className="glass-card p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] flex items-center gap-6 md:gap-10 cursor-pointer hover:border-[#6C63FF]/50 transition-all group shadow-xl">
                      <div className="w-24 h-24 md:w-40 md:h-40 rounded-[1rem] md:rounded-[1.5rem] overflow-hidden flex-shrink-0 shadow-lg border border-white/5">
                        <img src={i.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={i.title.en} />
                      </div>
                      <div className={`flex-1 text-start`}>
                        <span className="text-[10px] text-[#6C63FF] font-bold uppercase mb-2 block tracking-widest">{i.category}</span>
                        <h3 className="font-black text-lg md:text-2xl tracking-tight uppercase leading-none mb-2 text-white">{i.title[lang]}</h3>
                        <p className="text-xs md:text-sm text-slate-500 line-clamp-2 opacity-70 leading-relaxed max-w-2xl">{i.description[lang]}</p>
                      </div>
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#6C63FF] transition-all">
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-slate-500 group-hover:text-white rtl:rotate-180" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          } />
          <Route path="/about" element={
            <div className="py-12 md:py-16 space-y-12 md:space-y-16 animate-in fade-in duration-700">
              <section className="px-6 text-center max-w-4xl mx-auto space-y-8">
                <h2 className="text-4xl md:text-5xl font-black text-gradient uppercase tracking-tight">{translations.nav_about[lang]}</h2>
                <p className="text-slate-400 text-lg md:text-xl leading-relaxed opacity-80">{translations.about_p1[lang]}</p>
              </section>
              <section className="bg-slate-900/30 py-16 md:py-24 border-y border-slate-900/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className={`space-y-8 text-start order-2 lg:order-1`}>
                    <div className="glass-card p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] space-y-6">
                      <h4 className="font-black text-xl md:text-2xl uppercase tracking-tight text-white">HQ Access</h4>
                      <div className="space-y-5">
                        <div className="flex items-center gap-5 text-slate-400 group hover:text-white transition-colors">
                           <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-[#4ECDC4]/20">
                             <Phone className="w-5 h-5 text-[#4ECDC4]" /> 
                           </div>
                           <a href={`tel:${PHONE_NUMBER}`} className="font-black text-base md:text-lg">{PHONE_NUMBER}</a>
                        </div>
                        <div className="flex items-start gap-5 text-slate-400 group hover:text-white transition-colors">
                           <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-[#6C63FF]/20 mt-1">
                             <MapPin className="w-5 h-5 text-[#6C63FF]" />
                           </div>
                           <p className="text-xs md:text-sm font-medium leading-relaxed max-w-[300px]">{ADDRESS}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="aspect-square lg:aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-slate-800 relative order-1 lg:order-2">
                    <iframe src={MAP_EMBED_URL} width="100%" height="100%" style={{ border: 0 }} loading="lazy" className="grayscale contrast-125 opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"></iframe>
                  </div>
                </div>
              </section>
            </div>
          } />
          <Route path="/contact" element={
            <div className="py-16 md:py-24 px-6 text-center space-y-12 md:space-y-16 animate-in fade-in duration-700">
              <h2 className="text-4xl md:text-8xl font-black text-gradient uppercase tracking-tighter">{translations.contact_title[lang]}</h2>
              <div className="flex flex-col gap-6 md:gap-8 max-w-md mx-auto">
                <a 
                  href={`https://wa.me/${PHONE_NUMBER.replace('+', '')}`} 
                  target="_blank"
                  className="bg-[#25D366] px-8 py-5 rounded-[1.5rem] md:rounded-[2rem] font-bold text-xl md:text-2xl flex items-center justify-center gap-5 shadow-2xl hover:-translate-y-2 transition-all active:scale-95 text-white"
                >
                  <MessageCircle className="w-7 h-7" /> WhatsApp Direct
                </a>
              </div>
            </div>
          } />
          <Route path="/login" element={<SecureLogin onLogin={() => { setIsAdmin(true); localStorage.setItem('is_admin', 'true'); logAdminAction('Portal Authentication', 'success'); }} />} />
          <Route path="/admin" element={isAdmin ? <AdminDashboard stats={stats} portfolio={portfolioItems} setPortfolio={setPortfolioItems} services={services} setServices={setServices} socialLinks={socialLinks} setSocialLinks={setSocialLinks} logs={adminLogs} logAction={logAdminAction} onLogout={() => { setIsAdmin(false); localStorage.removeItem('is_admin'); }} maintenance={maintenance} setMaintenance={setMaintenance} /> : <Navigate to="/login" />} />
        </Routes>
      </main>

      {!isManagementPage && (
        <footer className="bg-[#01030a] py-16 md:py-24 px-6 border-t border-slate-900/50 mt-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 md:gap-16 text-sm relative z-10">
            <div className="lg:col-span-2 space-y-8 order-1">
              <Link to="/" className="text-3xl md:text-4xl font-black text-gradient tracking-tighter uppercase leading-none">PrintFusion</Link>
              <div className="space-y-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-5 text-slate-400">
                  <Phone className="w-6 h-6 text-[#4ECDC4]" /> 
                  <a href={`tel:${PHONE_NUMBER}`} className="hover:text-white transition-colors text-lg md:text-xl font-black tracking-tight">{PHONE_NUMBER}</a>
                </div>
                <div className="flex items-start gap-5 text-slate-400">
                  <MapPin className="w-6 h-6 text-[#6C63FF] mt-1 flex-shrink-0" />
                  <p className="text-xs md:text-sm font-bold leading-relaxed max-w-[280px] opacity-80">{ADDRESS}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-8 order-2">
              <div>
                <h5 className="font-black text-white uppercase mb-6 tracking-[0.3em] text-[10px]">Architecture</h5>
                <ul className="space-y-4">
                  {['Home', 'Services', 'Portfolio', 'About'].map(l => (
                    <li key={l}><Link to={l === 'Home' ? '/' : `/${l.toLowerCase()}`} className="text-slate-500 hover:text-white transition-colors font-black text-xs uppercase tracking-widest">{t(`nav_${l.toLowerCase()}`)}</Link></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="lg:col-span-2 order-3">
              <h5 className="font-black text-white uppercase mb-6 tracking-[0.3em] text-[10px]">Social Ecosystem</h5>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map(s => (
                  <a key={s.id} href={s.url} target="_blank" className="w-12 h-12 bg-slate-900 rounded-[1rem] border border-white/5 flex items-center justify-center hover:bg-[#6C63FF] transition-all group shadow-lg">
                    <SocialIcon name={s.iconName} className="w-6 h-6 text-slate-500 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

const Navbar = ({ lang, setLang, isAdmin }: { lang: Language, setLang: (l: Language) => void, isAdmin: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const t = (key: string) => translations[key]?.[lang] || key;
  const items: NavItem[] = [{ key: 'nav_home', path: '/' }, { key: 'nav_services', path: '/services' }, { key: 'nav_portfolio', path: '/portfolio' }, { key: 'nav_about', path: '/about' }, { key: 'nav_contact', path: '/contact' }];

  return (
    <nav className="sticky top-0 z-[90] bg-[#030712]/80 backdrop-blur-3xl border-b border-white/5 px-6 h-20 md:h-24 flex items-center">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 md:gap-4 group shrink-0">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#6C63FF] rounded-xl flex items-center justify-center shadow-lg shadow-[#6C63FF]/20 group-hover:rotate-12 transition-all">
            <Printer className="text-white w-6 h-6" />
          </div>
          <span className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase group-hover:text-gradient">PrintFusion</span>
        </Link>

        {/* Desktop Navigation and Switcher Group */}
        <div className="hidden md:flex flex-1 items-center justify-between px-8">
          {/* Navigation Links - Centered */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center space-x-8 rtl:space-x-reverse">
              {items.map(item => (
                <Link key={item.key} to={item.path} className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all hover:text-[#4ECDC4] relative group/link ${pathname === item.path ? 'text-[#6C63FF]' : 'text-slate-400'}`}>
                  {t(item.key)}
                  <span className={`absolute -bottom-2 left-0 h-0.5 bg-[#6C63FF] transition-all ${pathname === item.path ? 'w-full' : 'w-0 group-hover/link:w-1/2'}`}></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Language Switcher - Far Left in RTL, Far Right in LTR */}
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/5 rtl:mr-0 ltr:ml-8 rtl:ml-auto">
            <div className="flex items-center gap-1.5">
              {['en', 'ar', 'ku'].map(l => (
                <button 
                  key={l} 
                  onClick={() => setLang(l as Language)} 
                  className={`text-[9px] px-3 py-1.5 rounded-lg font-black uppercase tracking-widest transition-all ${lang === l ? 'bg-[#6C63FF] text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {l}
                </button>
              ))}
            </div>
            {isAdmin && (
              <Link to="/admin" className="p-2 bg-slate-800 rounded-lg text-[#6C63FF] hover:bg-[#6C63FF] hover:text-white transition-all ml-1 rtl:ml-0 rtl:mr-1">
                <Settings className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-300 p-2 bg-white/5 rounded-xl border border-white/10 z-[110]">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer - Fixed Overlay for better visibility */}
      {isOpen && (
        <div className="fixed inset-0 top-20 left-0 w-full h-[calc(100vh-80px)] bg-[#030712] z-[100] md:hidden p-8 animate-in slide-in-from-top duration-500 border-t border-white/5 overflow-y-auto no-scrollbar">
          <div className="flex flex-col space-y-6">
            {items.map(item => (
              <Link 
                key={item.key} 
                to={item.path} 
                onClick={() => setIsOpen(false)} 
                className={`block text-xl font-black uppercase tracking-tighter ${pathname === item.path ? 'text-[#6C63FF]' : 'text-white'}`}
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="grid grid-cols-3 gap-3 pt-8 border-t border-white/10">
              {['en', 'ar', 'ku'].map(l => (
                <button 
                  key={l} 
                  onClick={() => { setLang(l as Language); setIsOpen(false); }} 
                  className={`py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${lang === l ? 'bg-[#6C63FF] text-white shadow-2xl shadow-[#6C63FF]/30' : 'bg-slate-900/50 text-slate-500'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
