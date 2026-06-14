"use client";
import {NextStudio} from "next-sanity/studio";
import config from "@/sanity.config";

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return <main style={{padding: 40}}><h1>Sanity Studio Setup Required</h1><p>Add the Sanity project ID and dataset to your environment variables to activate the admin panel.</p></main>;
  return <NextStudio config={config} />;
}
