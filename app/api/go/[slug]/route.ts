import {NextResponse} from "next/server";
import {client, hasSanity} from "@/lib/sanity";
import {apps} from "@/lib/fallback-data";

export async function GET(_: Request, {params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  let url: string | undefined;
  let id: string | undefined;
  if (hasSanity) {
    const app = await client.fetch(`*[_type == "app" && slug.current == $slug && active == true][0]{_id, affiliateUrl}`, {slug});
    url = app?.affiliateUrl;
    id = app?._id;
    if (id && process.env.SANITY_API_WRITE_TOKEN) {
      createClickEvent(id).catch(() => undefined);
    }
  } else {
    url = apps.find(app => app.slug === slug)?.affiliateUrl;
  }
  if (!url) return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
  return NextResponse.redirect(url);
}

async function createClickEvent(appId: string) {
  const writeClient = client.withConfig({token: process.env.SANITY_API_WRITE_TOKEN, useCdn: false});
  await writeClient.create({_type: "clickEvent", app: {_type: "reference", _ref: appId}, clickedAt: new Date().toISOString()});
}
