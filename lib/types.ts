export type Category = {title: string; slug: string};
export type AppItem = {
  name: string;
  slug: string;
  iconUrl: string;
  offer: string;
  affiliateUrl: string;
  category: string;
};
export type SiteSettings = {
  siteName: string;
  logoUrl: string;
  telegramUrl: string;
  heroTitle: string;
  heroText: string;
  collectionTitle: string;
};
export type HomeData = {
  settings: SiteSettings;
  categories: Category[];
  apps: AppItem[];
};
