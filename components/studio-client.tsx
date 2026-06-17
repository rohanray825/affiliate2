"use client";

import {useEffect, useState} from "react";

type StudioModule = typeof import("next-sanity/studio");
type SanityConfig = typeof import("@/sanity.config").default;

export function StudioClient() {
  const [studio, setStudio] = useState<{
    NextStudio: StudioModule["NextStudio"];
    config: SanityConfig;
  } | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadStudio() {
      const [{NextStudio}, {default: config}] = await Promise.all([
        import("next-sanity/studio"),
        import("@/sanity.config"),
      ]);

      if (isMounted) setStudio({NextStudio, config});
    }

    loadStudio();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!studio) {
    return <main style={{padding: 40}}>Loading admin panel...</main>;
  }

  const {NextStudio, config} = studio;
  return <NextStudio config={config} />;
}
