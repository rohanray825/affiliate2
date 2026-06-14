import Link from "next/link";

export function StaticPage({title, children}: {title: string; children: React.ReactNode}) {
  return <><header className="topbar"><Link className="brand" href="/"><strong>All App Rewards</strong></Link></header><main className="seo-content"><h1>{title}</h1>{children}<p><Link href="/">← Back to Home</Link></p></main></>;
}
