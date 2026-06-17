import {StudioClient} from "@/components/studio-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Affiliate App Admin",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <main style={{padding: 40}}>
        <h1>Sanity Studio Setup Required</h1>
        <p>Add the Sanity project ID and dataset to your environment variables to activate the admin panel.</p>
      </main>
    );
  }

  return <StudioClient />;
}
