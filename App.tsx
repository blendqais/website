
import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
  Menu, X, Phone, MessageCircle, MapPin, 
  Layers, ChevronRight, ChevronLeft,
  Send, Sparkles, Printer, CheckCircle2,
  Truck, Settings, Plus, Trash2, Users, ShoppingCart, Lock, Info, 
  LayoutGrid, List as ListIcon, Target, History, Award, Edit3, Image as ImageIcon,
  Instagram, Facebook, Twitter, Link as LinkIcon, Music2, ShieldCheck, Zap, Package,
  Eye, EyeOff, BarChart3, Clock, Terminal, AlertTriangle, FileText, ExternalLink,
  Globe, ShieldAlert, Activity, Save, Search, Filter
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { translations } from './translations';
import { Language, NavItem, PortfolioItem, ServiceItem, SocialLink, SiteStats, MultiLangText, BlogPost, AdminLog } from './types';

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
    case 'twitter': return <Twitter className={className} />;
    case 'tiktok': return <Music2 className={className} />;
    default: return <LinkIcon className={className} />;
  }
};

const ImageSlider = ({ images }: { images: string[] }) => {
  const [idx, setIdx] = useState(0);
  if (!images || images.length === 0) return <div className="w-full h-full bg-slate-800 flex items-center justify-center"><ImageIcon className="text-slate-600" /></div>;
  if (images.length === 1) return <img src={images[0]} className="w-full h-full object-cover" />;
  
  return (
    <div className="relative w-full h-full group overflow-hidden rounded-2xl">
      <img src={images[idx]} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" alt="Item Preview" />
      <button 
        onClick={(e) => { e.stopPropagation(); setIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1)); }} 
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-white/20"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); setIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1)); }} 
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-white/20"
      >
        <ChevronRight className="w-5 h-5" />
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
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-950">
      <div className="glass-card p-10 rounded-[2.5rem] w-full max-w-md space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#6C63FF] to-transparent"></div>
        <div className="text-center">
          <div className="w-16 h-16 bg-[#6C63FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-[#6C63FF]" />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white uppercase">{step === 1 ? 'Admin Gateway' : 'Identity Verification'}</h2>
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
  blogPosts, setBlogPosts, socialLinks, setSocialLinks, 
  logs, logAction, onLogout, maintenance, setMaintenance 
}: any) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'services' | 'socials' | 'hardening'>('overview');
  const [editingId, setEditingId] = useState<string | null>(null);

  const emptyText = { en: '', ar: '', ku: '' };
  
  // Entity states for forms
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
    <div className="py-12 max-w-7xl mx-auto px-4 space-y-12 bg-slate-950 min-h-screen animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-10">
        <div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Command Center</h2>
          <div className="flex items-center gap-3 mt-2">
            <span className={`w-2 h-2 rounded-full ${maintenance ? 'bg-amber-500' : 'bg-[#4ECDC4]'} animate-pulse`}></span>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Environment: <span className="text-white">{maintenance ? 'MAINTENANCE' : 'LIVE_PRODUCTION'}</span></p>
          </div>
        </div>
        <button onClick={onLogout} className="px-8 py-3 bg-red-600/10 text-red-500 border border-red-500/20 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">Terminate Access</button>
      </div>

      <nav className="flex gap-2 bg-slate-900/30 p-2 rounded-2xl border border-white/5 w-fit overflow-x-auto no-scrollbar">
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
            className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-[#6C63FF] text-white' : 'text-slate-500 hover:text-white'}`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </nav>

      <div className="grid grid-cols-1 gap-12">
        {activeTab === 'overview' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Visits', val: stats.visitors, color: '#6C63FF', icon: Users },
                { label: 'Total Intents', val: stats.orders, color: '#4ECDC4', icon: ShoppingCart },
                { label: 'Live Assets', val: portfolio.length, color: '#F7931E', icon: Package },
                { label: 'Auth Logs', val: logs.length, color: '#FF4F5B', icon: History }
              ].map(stat => (
                <div key={stat.label} className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full" style={{ background: stat.color }}></div>
                  <stat.icon className="absolute top-6 right-6 w-12 h-12 opacity-5" />
                  <p className="text-4xl font-black text-white mb-2">{stat.val}</p>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="glass-card p-10 rounded-[3rem] space-y-6">
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
              <div className="flex gap-4">
                <button 
                  onClick={() => commitAction('Portfolio', editingId, () => {
                    if (editingId) setPortfolio(portfolio.map((p: any) => p.id === editingId ? { ...pForm, id: editingId } : p));
                    else setPortfolio([...portfolio, { ...pForm, id: Date.now().toString() }]);
                  })}
                  className="flex-1 bg-[#6C63FF] py-5 rounded-2xl font-black uppercase text-xs shadow-2xl shadow-[#6C63FF]/30 hover:bg-[#5a52e0] transition-colors"
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
                     <img src={item.images[0]} className="w-16 h-16 rounded-2xl object-cover shadow-2xl" />
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

        {activeTab === 'services' && (
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="glass-card p-10 rounded-[3rem] space-y-6">
              <h3 className="text-2xl font-black text-white uppercase">{editingId ? 'Edit Service' : 'New Service'}</h3>
              <MultiLangInput label="Service Title" values={sForm.title} onChange={v => setSForm({...sForm, title: v})} />
              <MultiLangInput label="Detailed Description" values={sForm.description} onChange={v => setSForm({...sForm, description: v})} />
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Hero Image URL</label>
                <input value={sForm.image} onChange={e => setSForm({...sForm, image: e.target.value})} className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-xs text-[#4ECDC4]" />
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => commitAction('Service', editingId, () => {
                    if (editingId) setServices(services.map((s: any) => s.id === editingId ? { ...sForm, id: editingId } : s));
                    else setServices([...services, { ...sForm, id: Date.now().toString() }]);
                  })}
                  className="flex-1 bg-[#4ECDC4] text-slate-900 py-5 rounded-2xl font-black uppercase text-xs"
                >{editingId ? 'Update Service' : 'Deploy Service'}</button>
                {editingId && (
                  <button onClick={resetForms} className="px-8 py-5 bg-slate-800 rounded-2xl font-black uppercase text-xs text-white">Cancel</button>
                )}
              </div>
            </div>
            <div className="space-y-4">
               {services.map((service: any) => (
                 <div key={service.id} className="glass-card p-6 rounded-3xl flex items-center justify-between border-white/5">
                   <div className="flex items-center gap-6">
                     <img src={service.image} className="w-16 h-16 rounded-2xl object-cover" />
                     <p className="font-black text-white uppercase text-sm">{service.title.en}</p>
                   </div>
                   <div className="flex gap-2">
                      <button onClick={() => { setEditingId(service.id); setSForm(service); }} className="p-3 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white"><Edit3 className="w-4 h-4"/></button>
                      <button onClick={() => commitAction('Service Delete', service.id, () => setServices(services.filter((s:any) => s.id !== service.id)))} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white"><Trash2 className="w-4 h-4"/></button>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {activeTab === 'socials' && (
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="glass-card p-10 rounded-[3rem] space-y-6">
              <h3 className="text-2xl font-black text-white uppercase">Link Management</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Platform</label>
                  <select 
                    value={socForm.platform} 
                    onChange={e => setSocForm({...socForm, platform: e.target.value, iconName: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-xs text-white"
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="TikTok">TikTok</option>
                    <option value="Snapchat">Snapchat</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Icon Profile</label>
                  <input value={socForm.iconName} onChange={e => setSocForm({...socForm, iconName: e.target.value})} className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-xs text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Public Endpoint URL</label>
                <input value={socForm.url} onChange={e => setSocForm({...socForm, url: e.target.value})} className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-xs text-[#4ECDC4]" placeholder="https://..." />
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => commitAction('Social', editingId, () => {
                    if (editingId) setSocialLinks(socialLinks.map((s: any) => s.id === editingId ? { ...socForm, id: editingId } : s));
                    else setSocialLinks([...socialLinks, { ...socForm, id: Date.now().toString() }]);
                  })}
                  className="flex-1 bg-white text-black py-5 rounded-2xl font-black uppercase text-xs"
                >{editingId ? 'Save Changes' : 'Publish Link'}</button>
                {editingId && (
                  <button onClick={resetForms} className="px-8 py-5 bg-slate-800 rounded-2xl font-black uppercase text-xs text-white">Cancel</button>
                )}
              </div>
            </div>
            <div className="space-y-4">
               {socialLinks.map((link: any) => (
                 <div key={link.id} className="glass-card p-6 rounded-3xl flex items-center justify-between border-white/5">
                   <div className="flex items-center gap-6">
                     <div className="p-4 bg-white/5 rounded-2xl"><SocialIcon name={link.iconName} className="w-6 h-6 text-[#6C63FF]" /></div>
                     <div>
                       <p className="font-black text-white uppercase text-sm">{link.platform}</p>
                       <p className="text-[10px] text-slate-600 font-mono truncate max-w-[200px]">{link.url}</p>
                     </div>
                   </div>
                   <div className="flex gap-2">
                      <button onClick={() => { setEditingId(link.id); setSocForm(link); }} className="p-3 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white"><Edit3 className="w-4 h-4"/></button>
                      <button onClick={() => commitAction('Social Delete', link.id, () => setSocialLinks(socialLinks.filter((s:any) => s.id !== link.id)))} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white"><Trash2 className="w-4 h-4"/></button>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {activeTab === 'hardening' && (
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="glass-card p-10 rounded-[3rem] space-y-8">
              <h3 className="text-2xl font-black text-white uppercase flex items-center gap-3"><ShieldAlert className="w-7 h-7 text-red-500" /> Operational Security</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-slate-900/50 rounded-3xl border border-white/5">
                   <div>
                     <p className="font-black text-white uppercase text-sm">Maintenance Mode</p>
                     <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Restrict public access to maintenance splash</p>
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
            <div className="glass-card p-10 rounded-[3rem] border-white/10 space-y-6">
              <h3 className="text-2xl font-black text-white uppercase">System Audit Logs</h3>
              <div className="space-y-3 font-mono text-[10px] max-h-[500px] overflow-y-auto custom-scrollbar">
                {logs.slice().reverse().map((log: any) => (
                  <div key={log.id} className="p-4 bg-slate-900/50 rounded-xl border border-white/5 flex flex-col gap-1">
                    <span className="text-[#6C63FF]">{log.timestamp}</span>
                    <span className="text-slate-200">{log.action}</span>
                  </div>
                ))}
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

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const s = typeof window !== 'undefined' ? localStorage.getItem('b_posts') : null;
    return s ? JSON.parse(s) : [];
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
  useEffect(() => { localStorage.setItem('b_posts', JSON.stringify(blogPosts)); }, [blogPosts]);
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
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose}></div>
        <div className="glass-card w-full max-w-4xl rounded-[3rem] overflow-hidden relative z-10 flex flex-col md:flex-row shadow-2xl border-white/10 animate-in zoom-in-95 duration-500">
          <button onClick={onClose} className="absolute top-6 right-6 z-20 bg-white/10 hover:bg-white/20 p-2.5 rounded-full text-white backdrop-blur-md transition-all"><X className="w-5 h-5" /></button>
          <div className="w-full md:w-1/2 aspect-square relative bg-slate-900 border-r border-white/5">
            <ImageSlider images={product.images} />
          </div>
          <div className={`w-full md:w-1/2 p-10 flex flex-col justify-center bg-[#030712] ${lang !== 'en' ? 'text-right' : ''}`}>
            <span className="text-[#6C63FF] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 px-3 py-1 bg-[#6C63FF]/10 rounded-full w-fit">{product.category}</span>
            <h2 className="text-3xl font-bold mb-6 tracking-tight leading-none text-white">{product.title[lang]}</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 opacity-80">{product.description[lang]}</p>
            <button 
               onClick={() => { setStats(prev => ({...prev, orders: prev.orders + 1})); window.open(`https://wa.me/${PHONE_NUMBER.replace('+', '')}?text=Interest: ${product.title[lang]}`, '_blank'); }}
               className="w-full bg-[#6C63FF] py-4 rounded-[1.5rem] font-bold flex items-center justify-center gap-3 hover:bg-[#5a52e0] transition-all transform active:scale-95 shadow-2xl shadow-[#6C63FF]/30 text-white"
            >
              <MessageCircle className="w-6 h-6" /> {t('request_this')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (maintenance && !isManagementPage) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
         <div className="w-24 h-24 bg-amber-500/10 rounded-[2rem] flex items-center justify-center mb-10 border border-amber-500/20">
            <Settings className="w-12 h-12 text-amber-500 animate-spin-slow" />
         </div>
         <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">Precision Tuning</h1>
         <p className="text-slate-500 max-w-sm font-bold text-sm leading-relaxed uppercase tracking-widest">Our engineering sub-systems are currently undergoing synchronization. We will be back online momentarily.</p>
         <Link to="/login" className="mt-12 text-[10px] font-black uppercase text-slate-800 tracking-[0.5em] hover:text-white transition-colors">Admin Portal Override</Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen selection:bg-[#6C63FF]/30 ${lang === 'en' ? 'font-inter' : 'font-noto-arabic'}`}>
      {!isManagementPage && <Navbar lang={lang} setLang={setLang} isAdmin={isAdmin} />}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      <main className={isManagementPage ? "" : "pb-20"}>
        <Routes>
          <Route path="/" element={
            <div className="animate-in fade-in duration-700">
              <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4">
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#6C63FF] rounded-full filter blur-[120px] opacity-[0.07] animate-pulse"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#4ECDC4] rounded-full filter blur-[120px] opacity-[0.07] animate-pulse delay-1000"></div>
                </div>
                <div className="max-w-5xl mx-auto text-center z-10 space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full animate-in slide-in-from-top-4 duration-1000 mb-10">
                    <Zap className="w-3.5 h-3.5 text-[#4ECDC4]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t('premium_studio_badge')}</span>
                  </div>
                  <h1 className="text-5xl md:text-8xl font-black mb-6 text-white uppercase tracking-tighter leading-[0.9] pt-4">{translations.hero_title[lang]}</h1>
                  <p className="text-slate-400 mb-10 text-base md:text-xl font-medium max-w-2xl mx-auto leading-relaxed opacity-80">{translations.hero_subtitle[lang]}</p>
                  <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
                    <Link to="/contact" className="bg-[#6C63FF] px-10 py-4 rounded-[1.5rem] font-bold flex items-center justify-center gap-3 hover:shadow-[0_0_40px_rgba(108,99,255,0.4)] transition-all transform hover:-translate-y-1 active:scale-95 text-white"><MessageCircle className="w-6 h-6" /> {translations.hero_cta_primary[lang]}</Link>
                    <Link to="/portfolio" className="border border-white/10 bg-white/5 backdrop-blur-md px-10 py-4 rounded-[1.5rem] font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all transform hover:-translate-y-1 active:scale-95 text-white"><Printer className="w-6 h-6" /> {translations.hero_cta_secondary[lang]}</Link>
                  </div>
                </div>
              </section>

              <section className="py-24 max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-16 tracking-tight uppercase text-white">{translations.process_title[lang]}</h2>
                <div className="grid md:grid-cols-3 gap-12">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="text-center space-y-6 group">
                      <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center mx-auto group-hover:border-[#6C63FF]/50 group-hover:shadow-[0_0_30px_rgba(108,99,255,0.1)] transition-all duration-500 relative">
                        <span className="absolute -top-3 -right-3 w-8 h-8 bg-[#6C63FF] rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg">{step}</span>
                        {step === 1 && <MessageCircle className="w-8 h-8 text-[#6C63FF]" />}
                        {step === 2 && <Printer className="w-8 h-8 text-[#4ECDC4]" />}
                        {step === 3 && <Truck className="w-8 h-8 text-[#6C63FF]" />}
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xl font-bold tracking-tight uppercase text-white">{translations[`step${step}_title` as any][lang]}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed px-6">{translations[`step${step}_desc` as any][lang]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="py-20 max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 border-t border-slate-900/50">
                {['usp_no_min', 'usp_quality', 'usp_fast'].map((key) => (
                  <div key={key} className={`glass-card p-10 rounded-[2rem] hover:border-[#6C63FF]/40 transition-all duration-500 ${lang !== 'en' ? 'text-right' : ''} group`}>
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#6C63FF]/10 transition-colors">
                       {key === 'usp_no_min' && <Package className="w-6 h-6 text-[#4ECDC4]" />}
                       {key === 'usp_quality' && <ShieldCheck className="w-6 h-6 text-[#6C63FF]" />}
                       {key === 'usp_fast' && <Zap className="w-6 h-6 text-[#4ECDC4]" />}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 tracking-tight leading-none uppercase text-white">{translations[key][lang]}</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed opacity-70">Excellence and precision for every production run in Kurdistan & Iraq.</p>
                  </div>
                ))}
              </section>
            </div>
          } />
          <Route path="/services" element={
            <div className="py-20 px-4 max-w-5xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="text-center space-y-4">
                <div className="inline-block px-3 py-1 bg-[#6C63FF]/10 rounded-full mb-2">
                  <span className="text-[10px] font-bold text-[#6C63FF] uppercase tracking-widest">Capabilities</span>
                </div>
                <h2 className="text-5xl font-black text-gradient uppercase tracking-tight leading-none">{translations.services_title[lang]}</h2>
                <p className="text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">{translations.services_desc[lang]}</p>
              </div>
              <div className="grid gap-12">
                {services.map((s, idx) => (
                  <div key={s.id} className={`flex flex-col md:flex-row gap-10 items-center glass-card p-8 rounded-[2.5rem] group hover:border-[#6C63FF]/50 transition-all duration-500 shadow-xl ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="w-full md:w-1/2 h-80 overflow-hidden rounded-[2rem] shadow-2xl">
                      <img src={s.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={s.title.en} />
                    </div>
                    <div className={`flex-1 space-y-6 ${lang !== 'en' ? 'text-right' : ''}`}>
                      <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none">{s.title[lang]}</h3>
                      <p className="text-slate-400 text-base leading-relaxed opacity-80">{s.description[lang]}</p>
                      <Link to="/contact" className="inline-flex items-center gap-3 text-xs font-bold text-[#4ECDC4] uppercase tracking-[0.2em] group/btn">
                        Get Estimate <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          } />
          <Route path="/portfolio" element={
            <div className="py-16 max-w-7xl mx-auto px-4 animate-in fade-in duration-700">
              <div className="text-center mb-16 space-y-6">
                <h2 className="text-5xl font-black text-gradient uppercase tracking-tight">{translations.portfolio_title[lang]}</h2>
                <div className="flex flex-col md:flex-row items-center justify-between gap-5 bg-slate-900/50 p-5 rounded-[2rem] border border-slate-800 backdrop-blur-xl shadow-2xl">
                  <div className="flex flex-wrap justify-center gap-3">
                    {categories.map(cat => (
                      <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${filter === cat ? 'bg-[#6C63FF] text-white shadow-xl shadow-[#6C63FF]/30' : 'bg-slate-800 text-slate-500 hover:text-white hover:bg-slate-700'}`}>{cat === 'all' ? translations.all[lang] : cat}</button>
                    ))}
                  </div>
                  <div className="flex bg-slate-800/80 p-1.5 rounded-xl border border-white/5">
                    <button onClick={()=>setViewMode('grid')} className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[#6C63FF] text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`} title="Grid View"><LayoutGrid className="w-4 h-4" /></button>
                    <button onClick={()=>setViewMode('list')} className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-[#6C63FF] text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`} title="List View"><ListIcon className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredItems.map(i => (
                    <div key={i.id} onClick={() => setSelectedProduct(i)} className="glass-card rounded-[2.5rem] overflow-hidden group hover:border-[#6C63FF]/50 transition-all cursor-pointer aspect-[4/5] relative shadow-2xl">
                      <img src={i.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={i.title.en} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-10 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <span className="text-[10px] font-bold uppercase text-[#4ECDC4] mb-3 tracking-[0.3em]">{i.category}</span>
                        <h3 className="text-2xl font-black text-white tracking-tight uppercase leading-none">{i.title[lang]}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredItems.map(i => (
                    <div key={i.id} onClick={() => setSelectedProduct(i)} className="glass-card p-6 rounded-[2rem] flex items-center gap-10 cursor-pointer hover:border-[#6C63FF]/50 transition-all group shadow-xl">
                      <div className="w-40 h-40 rounded-[1.5rem] overflow-hidden flex-shrink-0 shadow-lg border border-white/5">
                        <img src={i.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={i.title.en} />
                      </div>
                      <div className={`flex-1 ${lang !== 'en' ? 'text-right' : ''}`}>
                        <span className="text-[10px] text-[#6C63FF] font-bold uppercase mb-2 block tracking-widest">{i.category}</span>
                        <h3 className="font-black text-2xl tracking-tight uppercase leading-none mb-2 text-white">{i.title[lang]}</h3>
                        <p className="text-sm text-slate-500 line-clamp-2 opacity-70 leading-relaxed max-w-2xl">{i.description[lang]}</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#6C63FF] transition-all">
                        <ChevronRight className="w-6 h-6 text-slate-500 group-hover:text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {filteredItems.length === 0 && (
                <div className="text-center py-20 bg-white/5 rounded-[3rem] border border-dashed border-white/10">
                   <p className="text-slate-500 font-bold uppercase tracking-widest">No items found in this category.</p>
                </div>
              )}
            </div>
          } />
          <Route path="/about" element={
            <div className="py-16 space-y-16 animate-in fade-in duration-700">
              <section className="px-4 text-center max-w-4xl mx-auto space-y-8">
                <h2 className="text-5xl font-black text-gradient uppercase tracking-tight">{translations.nav_about[lang]}</h2>
                <p className="text-slate-400 text-xl leading-relaxed opacity-80">{translations.about_p1[lang]}</p>
              </section>
              <section className="bg-slate-900/30 py-24 border-y border-slate-900/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">
                  <div className={`space-y-8 ${lang !== 'en' ? 'text-right' : ''}`}>
                    <div className="glass-card p-10 rounded-[2.5rem] space-y-4 group">
                      <div className="p-3 bg-[#6C63FF]/10 rounded-2xl w-fit group-hover:bg-[#6C63FF]/20 transition-colors">
                        <Target className="w-8 h-8 text-[#6C63FF]" />
                      </div>
                      <h4 className="font-black text-2xl uppercase tracking-tight text-white">{translations.about_mission_title[lang]}</h4>
                      <p className="text-base text-slate-500 leading-relaxed opacity-80">{translations.about_mission_text[lang]}</p>
                    </div>
                    <div className="glass-card p-10 rounded-[2.5rem] space-y-6">
                      <h4 className="font-black text-2xl uppercase tracking-tight text-white">Access Points</h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-5 text-slate-400 group hover:text-white transition-colors">
                           <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-[#4ECDC4]/20">
                             <Phone className="w-5 h-5 text-[#4ECDC4]" /> 
                           </div>
                           <a href={`tel:${PHONE_NUMBER}`} className="font-black text-lg">{PHONE_NUMBER}</a>
                        </div>
                        <div className="flex items-start gap-5 text-slate-400 group hover:text-white transition-colors">
                           <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-[#6C63FF]/20 mt-1">
                             <MapPin className="w-5 h-5 text-[#6C63FF]" />
                           </div>
                           <a href={MAP_LINK} target="_blank" className="text-sm font-medium leading-relaxed max-w-[300px]">{ADDRESS}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="aspect-square lg:aspect-video rounded-[3rem] overflow-hidden border border-slate-800 shadow-[0_0_100px_rgba(0,0,0,0.5)] relative group">
                    <iframe src={MAP_EMBED_URL} width="100%" height="100%" style={{ border: 0 }} loading="lazy" className="grayscale contrast-125 opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" title="Location Map"></iframe>
                    <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-[3rem]"></div>
                  </div>
                </div>
              </section>
            </div>
          } />
          <Route path="/contact" element={
            <div className="py-24 px-4 text-center space-y-16 animate-in fade-in duration-700">
              <div className="space-y-6">
                <h2 className="text-6xl md:text-8xl font-black text-gradient uppercase tracking-tighter leading-[0.85]">{translations.contact_title[lang]}</h2>
                <p className="text-slate-400 max-w-xl mx-auto font-medium text-lg leading-relaxed opacity-80">{translations.contact_subtitle[lang]}</p>
              </div>
              <div className="flex flex-col gap-8 max-w-md mx-auto">
                <button 
                  onClick={() => { setStats(prev => ({...prev, orders: prev.orders + 1})); window.open(`https://wa.me/${PHONE_NUMBER.replace('+', '')}`, '_blank'); }}
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
                   <a href={MAP_LINK} target="_blank" className="glass-card p-8 rounded-[2rem] flex flex-col items-center gap-4 hover:border-[#6C63FF] transition-all group">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#6C63FF]/10 transition-colors">
                        <MapPin className="w-7 h-7 text-[#6C63FF] group-hover:-translate-y-1 transition-transform" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Directions</span>
                   </a>
                </div>
              </div>
            </div>
          } />
          <Route path="/login" element={<SecureLogin onLogin={() => { setIsAdmin(true); localStorage.setItem('is_admin', 'true'); localStorage.setItem('last_login', new Date().toLocaleString()); logAdminAction('Portal Authentication', 'success'); }} />} />
          <Route path="/admin" element={isAdmin ? <AdminDashboard stats={stats} portfolio={portfolioItems} setPortfolio={setPortfolioItems} services={services} setServices={setServices} blogPosts={blogPosts} setBlogPosts={setBlogPosts} socialLinks={socialLinks} setSocialLinks={setSocialLinks} logs={adminLogs} logAction={logAdminAction} onLogout={() => { setIsAdmin(false); localStorage.removeItem('is_admin'); logAdminAction('Session Termination', 'success'); }} maintenance={maintenance} setMaintenance={setMaintenance} /> : <Navigate to="/login" />} />
        </Routes>
      </main>

      {!isManagementPage && (
        <footer className="bg-[#01030a] py-24 px-6 border-t border-slate-900/50 mt-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6C63FF]/[0.02] rounded-full filter blur-[100px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-16 text-sm relative z-10">
            <div className="lg:col-span-2 space-y-8">
              <Link to="/" className="text-4xl font-black text-gradient tracking-tighter uppercase leading-none">PrintFusion</Link>
              <p className="text-slate-500 max-w-sm leading-relaxed text-base font-medium opacity-70">{t('footer_description')}</p>
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-5 text-slate-400 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#4ECDC4]/10 transition-colors border border-white/5">
                    <Phone className="w-6 h-6 text-[#4ECDC4]" /> 
                  </div>
                  <a href={`tel:${PHONE_NUMBER}`} className="hover:text-white transition-colors text-xl font-black tracking-tight">{PHONE_NUMBER}</a>
                </div>
                <div className="flex items-start gap-5 text-slate-400 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#6C63FF]/10 transition-colors border border-white/5 mt-1 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#6C63FF]" />
                  </div>
                  <a href={MAP_LINK} target="_blank" className="hover:text-white transition-colors text-sm font-bold leading-relaxed max-w-[280px] opacity-80">{ADDRESS}</a>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-black text-white uppercase mb-8 tracking-[0.3em] text-[10px]">Architecture</h5>
              <ul className="space-y-4">
                {['Home', 'Services', 'Portfolio', 'About'].map(l => (
                  <li key={l}><Link to={l === 'Home' ? '/' : `/${l.toLowerCase()}`} className="text-slate-500 hover:text-white transition-colors font-black text-xs uppercase tracking-widest">{translations[`nav_${l.toLowerCase()}`]?.[lang] || l}</Link></li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h5 className="font-black text-white uppercase mb-8 tracking-[0.3em] text-[10px]">Global Ecosystem</h5>
              <div className="flex flex-wrap gap-5">
                {socialLinks.map(s => (
                  <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-slate-900 rounded-[1.25rem] border border-white/5 flex items-center justify-center hover:bg-[#6C63FF] hover:text-white transition-all transform hover:-translate-y-2 group shadow-lg">
                    <SocialIcon name={s.iconName} className="w-7 h-7 text-slate-500 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-slate-700 text-[10px] font-black uppercase tracking-[0.4em] gap-6">
            <span className="opacity-40">&copy; {new Date().getFullYear()} PrintFusion Studio. Engineering Excellence.</span>
            {!isAdmin && <Link to="/login" className="px-4 py-2 border border-slate-900 rounded-lg hover:text-slate-500 hover:border-slate-800 transition-all opacity-40 hover:opacity-100">Portal</Link>}
          </div>
        </footer>
      )}
      <AIAssistant lang={lang} />
      <a 
        onClick={() => setStats(prev => ({...prev, orders: prev.orders + 1}))} 
        href={`https://wa.me/${PHONE_NUMBER.replace('+', '')}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-10 right-10 bg-[#25D366] text-white p-5 rounded-[1.5rem] shadow-[0_20px_50px_rgba(255,255,255,0.4)] z-[80] transform hover:scale-110 hover:-translate-y-2 transition-all active:scale-95 group"
      >
        <MessageCircle className="w-8 h-8 group-hover:rotate-6 transition-transform" />
      </a>
    </div>
  );
}

const Navbar = ({ lang, setLang, isAdmin }: { lang: Language, setLang: (l: Language) => void, isAdmin: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const t = (key: string) => translations[key]?.[lang] || key;
  const items: NavItem[] = [{ key: 'nav_home', path: '/' }, { key: 'nav_services', path: '/services' }, { key: 'nav_portfolio', path: '/portfolio' }, { key: 'nav_about', path: '/about' }, { key: 'nav_contact', path: '/contact' }];

  return (
    <nav className="sticky top-0 z-[90] glass-card backdrop-blur-3xl border-b border-white/5 px-4 h-24 flex items-center">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12 bg-[#6C63FF] rounded-2xl flex items-center justify-center shadow-lg shadow-[#6C63FF]/20 group-hover:rotate-12 transition-all duration-500">
            <Printer className="text-white w-7 h-7" />
          </div>
          <span className="text-2xl font-black text-white tracking-tighter uppercase leading-none group-hover:text-gradient transition-all">PrintFusion</span>
        </Link>
        <div className="hidden md:flex items-center space-x-12">
          <div className={`flex items-center space-x-10 ${lang !== 'en' ? 'space-x-reverse' : ''}`}>
            {items.map(item => (
              <Link key={item.key} to={item.path} className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all hover:text-[#4ECDC4] relative group/link ${pathname === item.path ? 'text-[#6C63FF]' : 'text-slate-400'}`}>
                {t(item.key)}
                <span className={`absolute -bottom-2 left-0 h-0.5 bg-[#6C63FF] transition-all duration-300 ${pathname === item.path ? 'w-full' : 'w-0 group-hover/link:w-1/2'}`}></span>
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4 bg-white/5 p-1.5 rounded-2xl border border-white/5 ml-12 rtl:ml-0 rtl:mr-12">
            {['en', 'ar', 'ku'].map(l => (
              <button key={l} onClick={() => setLang(l as Language)} className={`text-[9px] px-3 py-2 rounded-xl font-black uppercase tracking-widest transition-all ${lang === l ? 'bg-[#6C63FF] text-white shadow-xl shadow-[#6C63FF]/30' : 'text-slate-500 hover:text-slate-300'}`}>
                {l}
              </button>
            ))}
            {isAdmin && (<Link to="/admin" className="p-2.5 bg-slate-800 rounded-xl text-[#6C63FF] hover:bg-[#6C63FF] hover:text-white transition-all transform active:scale-95 shadow-md ml-2 rtl:ml-0 rtl:mr-2"><Settings className="w-5 h-5" /></Link>)}
          </div>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-300 p-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
      </div>
      {isOpen && (
        <div className="md:hidden glass-card absolute top-24 left-0 w-full p-10 space-y-8 animate-in slide-in-from-top duration-500 border-b border-white/5 shadow-2xl backdrop-blur-3xl z-[100]">
          {items.map(item => (<Link key={item.key} to={item.path} onClick={() => setIsOpen(false)} className={`block text-3xl font-black uppercase tracking-tighter ${lang !== 'en' ? 'text-right' : ''} transition-all active:text-[#6C63FF] ${pathname === item.path ? 'text-[#6C63FF]' : 'text-white'}`}>{t(item.key)}</Link>))}
          <div className="grid grid-cols-3 gap-4 pt-10 border-t border-white/10">
             {['en', 'ar', 'ku'].map(l => (<button key={l} onClick={() => { setLang(l as Language); setIsOpen(false); }} className={`py-4 rounded-[1.25rem] font-black uppercase tracking-widest text-[10px] transition-all ${lang === l ? 'bg-[#6C63FF] text-white shadow-2xl shadow-[#6C63FF]/40' : 'bg-slate-900/50 text-slate-500 border border-white/5'}`}>{l}</button>))}
          </div>
        </div>
      )}
    </nav>
  );
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
        config: { systemInstruction: `You are an expert printing consultant for PrintFusion Studio. Answer in ${lang === 'en' ? 'English' : lang === 'ar' ? 'Arabic' : 'Kurdish'}. Keep advice technical yet accessible. Mention UV, DTF, and high-quality apparel. Be the ultimate professional.` }
      });
      setResponse(result.text || 'Synthesis failure. Please rephrase your query.');
      setPrompt('');
    } catch (e) { setResponse('Network latency detected. Assistance currently unavailable.'); } finally { setLoading(false); }
  };

  return (
    <div className="fixed bottom-10 left-10 z-[100]">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="bg-white text-[#030712] p-5 rounded-[1.5rem] shadow-[0_20px_50px_rgba(255,255,255,0.4)] transform hover:scale-110 hover:-translate-y-2 transition-all active:scale-95 group">
          <Sparkles className="w-7 h-7 group-hover:rotate-12 transition-transform" />
        </button>
      ) : (
        <div className="glass-card w-[22rem] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom duration-500 border border-white/10 backdrop-blur-3xl">
          <div className="bg-white p-5 flex justify-between items-center text-[#030712]">
             <span className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2"><Sparkles className="w-3.5 h-3.5" /> AI Consultant</span>
             <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-black/10 rounded-xl transition-colors"><X className="w-5 h-5" /></button>
          </div>
          <div className="p-8 bg-slate-900/95 max-h-[400px] overflow-y-auto text-sm leading-relaxed custom-scrollbar selection:bg-[#6C63FF]/30">
            {response ? (<div className={`${lang !== 'en' ? 'text-right' : ''} text-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500 whitespace-pre-wrap`}>{response}</div>) : null}
            {loading && <div className="flex items-center gap-2 text-[#4ECDC4] font-bold text-[10px] uppercase tracking-widest"><span className="animate-pulse">Thinking</span><span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span></div>}
            {!response && !loading && <div className="text-slate-600 text-[10px] font-bold uppercase tracking-widest text-center opacity-40">{t('ai_assistant_placeholder')}</div>}
          </div>
          <form onSubmit={handleAsk} className="p-5 border-t border-white/5 flex gap-4 bg-[#030712]/50">
            <input 
              value={prompt} 
              onChange={e => setPrompt(e.target.value)} 
              className={`flex-1 bg-slate-800/50 border border-white/5 text-xs p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#6C63FF] transition-all placeholder:text-slate-600 text-white ${lang !== 'en' ? 'text-right' : ''}`} 
              placeholder="Ask anything..." 
            />
            <button className="bg-white text-black p-4 rounded-2xl hover:bg-slate-200 transition-colors shadow-lg shadow-white/10 transform active:scale-95"><Send className="w-5 h-5" /></button>
          </form>
        </div>
      )}
    </div>
  );
};
