# Affiliate App Directory

Next.js affiliate promotion website with an embedded Sanity Studio and native Sanity image uploads.

## Setup

1. Copy `.env.example` to `.env.local`.
2. Add your Sanity project ID, dataset, and write token.
3. Run `npm run sanity:seed` to add the fallback Categories, Apps, and Site Settings to Sanity.
4. Upload real app icons and the site logo directly in Sanity Studio at `/studio`.
5. Run `npm run dev`.

Without Sanity credentials, the website uses a built-in sample catalog.

The seed command is safe to rerun: it creates missing default documents and skips existing apps/categories/settings so your later edits are not overwritten.
