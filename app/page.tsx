import {InteractiveHome} from "@/components/interactive-home";
import {getHomeData} from "@/lib/sanity";

export const revalidate = 60;

export default async function Home() {
  const data = await getHomeData();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: data.apps.map((app, index) => ({ "@type": "ListItem", position: index + 1, name: app.name })),
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}} /><InteractiveHome {...data} /></>;
}
