import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Statischer Export: das Ergebnis in `out/` läuft auf jedem Webspace ohne Node-Server
  output: "export",
  images: {
    // Remote-Bilder (Unsplash) ohne Next-Bildoptimierung ausliefern — nötig für den statischen Export
    unoptimized: true,
  },
};

export default nextConfig;
