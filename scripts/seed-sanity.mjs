import {createClient} from "@sanity/client";
import {existsSync, readFileSync} from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

function loadEnvFile(filename) {
  const filePath = path.join(rootDir, filename);
  if (!existsSync(filePath)) return;

  const lines = readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;

    const [key, ...valueParts] = trimmed.split("=");
    const value = valueParts.join("=").trim().replace(/^['"]|['"]$/g, "");
    process.env[key.trim()] ||= value;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.");
  console.error("Add them to .env.local, then run: npm run sanity:seed");
  process.exit(1);
}

const fallbackData = JSON.parse(readFileSync(path.join(rootDir, "data", "fallback-data.json"), "utf8"));

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-01-01",
  useCdn: false,
});

function slugValue(slug) {
  return {_type: "slug", current: slug};
}

function idFor(prefix, slug) {
  return `${prefix}-${slug.replace(/[^a-z0-9-]/gi, "-").toLowerCase()}`;
}

async function seedCategories() {
  const existing = await client.fetch(`*[_type == "category"]{_id, "slug": slug.current}`);
  const categoryIds = new Map(existing.map(category => [category.slug, category._id]));
  let created = 0;

  for (const [index, category] of fallbackData.categories.entries()) {
    if (categoryIds.has(category.slug)) continue;

    const doc = {
      _id: idFor("category", category.slug),
      _type: "category",
      title: category.title,
      slug: slugValue(category.slug),
      order: index,
    };

    await client.createIfNotExists(doc);
    categoryIds.set(category.slug, doc._id);
    created += 1;
  }

  return {categoryIds, created};
}

async function seedSiteSettings() {
  const existingId = await client.fetch(`*[_type == "siteSettings"][0]._id`);
  if (existingId) return 0;

  await client.createIfNotExists({
    _id: "siteSettings",
    _type: "siteSettings",
    ...fallbackData.settings,
    seoTitle: fallbackData.settings.siteName,
    seoDescription: fallbackData.settings.heroText,
  });

  return 1;
}

async function seedApps(categoryIds) {
  const existing = await client.fetch(`*[_type == "app"]{_id, "slug": slug.current}`);
  const existingSlugs = new Set(existing.map(app => app.slug));
  let created = 0;
  let skippedMissingCategory = 0;

  for (const [index, app] of fallbackData.apps.entries()) {
    if (existingSlugs.has(app.slug)) continue;

    const categoryId = categoryIds.get(app.category);
    if (!categoryId) {
      skippedMissingCategory += 1;
      continue;
    }

    await client.createIfNotExists({
      _id: idFor("app", app.slug),
      _type: "app",
      name: app.name,
      slug: slugValue(app.slug),
      iconUrl: app.iconUrl,
      offer: app.offer,
      affiliateUrl: app.affiliateUrl,
      category: {_type: "reference", _ref: categoryId},
      order: index,
      active: true,
    });

    created += 1;
  }

  return {created, skippedMissingCategory};
}

const {categoryIds, created: categoriesCreated} = await seedCategories();
const settingsCreated = await seedSiteSettings();
const {created: appsCreated, skippedMissingCategory} = await seedApps(categoryIds);

console.log("Sanity seed complete.");
console.log(`Categories created: ${categoriesCreated}`);
console.log(`Site settings created: ${settingsCreated}`);
console.log(`Apps created: ${appsCreated}`);
if (skippedMissingCategory) {
  console.log(`Apps skipped because category was missing: ${skippedMissingCategory}`);
}
