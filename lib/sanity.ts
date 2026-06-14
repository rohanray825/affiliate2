import {createClient} from "next-sanity";
import {fallbackData} from "./fallback-data";
import {HomeData} from "./types";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const hasSanity = Boolean(projectId);

export const client = createClient({
  projectId: projectId || "demo",
  dataset,
  apiVersion: "2026-01-01",
  useCdn: true,
});

export async function getHomeData(): Promise<HomeData> {
  if (!hasSanity) return fallbackData;
  try {
    const [settings, categories, apps] = await Promise.all([
      client.fetch(`*[_type == "siteSettings"][0]{
        siteName, logoUrl, telegramUrl, heroTitle, heroText, collectionTitle
      }`),
      client.fetch(`*[_type == "category"] | order(order asc){title, "slug": slug.current}`),
      client.fetch(`*[_type == "app" && active == true] | order(order asc){
        name, "slug": slug.current, iconUrl, offer, affiliateUrl, "category": category->slug.current
      }`),
    ]);
    return {
      settings: {...fallbackData.settings, ...settings},
      categories: categories.length ? categories : fallbackData.categories,
      apps: apps.length ? apps : fallbackData.apps,
    };
  } catch {
    return fallbackData;
  }
}
