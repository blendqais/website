
export type Language = 'en' | 'ar' | 'ku';

export interface MultiLangText {
  en: string;
  ar: string;
  ku: string;
}

export interface NavItem {
  key: string;
  path: string;
}

export interface PortfolioItem {
  id: string;
  category: MultiLangText; 
  images: string[];
  title: MultiLangText;
  description: MultiLangText;
  created_at?: string;
}

export interface ServiceItem {
  id: string;
  image: string;
  title: MultiLangText;
  description: MultiLangText;
  created_at?: string;
}

export interface BlogPost {
  id: string;
  title: MultiLangText;
  content: MultiLangText;
  status: 'published' | 'draft';
  date: string;
}

export interface AdminLog {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  status: 'success' | 'failure';
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  iconName: string;
}

export interface SiteStats {
  visitors: number;
  orders: number;
  lastLogin?: string;
}

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    ar: string;
    ku: string;
  };
}
