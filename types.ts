
export type Language = 'en' | 'ar' | 'ku';

export interface NavItem {
  key: string;
  path: string;
}

export interface Service {
  id: string;
  titleKey: string;
  descKey: string;
  icon: string;
}

export interface PortfolioItem {
  id: string | number;
  category: string;
  image: string;
  title: string;
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
}

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    ar: string;
    ku: string;
  };
}
