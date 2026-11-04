'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function GlobeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeInstanceRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function initGlobe() {
      if (!containerRef.current) return;

      try {
        const GlobeModule = await import('globe.gl');
        const Globe = GlobeModule.default;

        if (!isMounted || !containerRef.current) return;

        // Clean any existing canvas if re-running
        containerRef.current.innerHTML = '';

        const width = containerRef.current.clientWidth || 550;
        const height = containerRef.current.clientHeight || 550;

        const globe = new Globe(containerRef.current)
          .width(width)
          .height(height)
          .backgroundColor('rgba(0,0,0,0)')
          .globeImageUrl('/datasets/earth-dark.jpg')
          .showAtmosphere(true)
          .atmosphereColor('#6366f1')
          .atmosphereAltitude(0.2)
          .pointOfView({ lat: 20, lng: 75, altitude: 2.2 }, 3000)
          // Indigo, cyan, purple palette matching portfolio theme
          .polygonCapColor((feat: any) => {
            const pop = feat?.properties?.POP_EST || 0;
            if (pop > 1e8) return 'rgba(99, 102, 241, 0.75)'; // Indigo
            if (pop > 3e7) return 'rgba(168, 85, 247, 0.65)'; // Purple
            if (pop > 1e7) return 'rgba(6, 182, 212, 0.6)'; // Cyan
            return 'rgba(59, 130, 246, 0.45)'; // Sky blue
          })
          .polygonSideColor(() => 'rgba(129, 140, 248, 0.25)')
          .polygonStrokeColor(() => 'rgba(199, 210, 254, 0.4)')
          .polygonLabel(({ properties: d }: any) => `
            <div style="background: rgba(15, 23, 42, 0.9); padding: 6px 12px; border-radius: 8px; border: 1px solid rgba(99,102,241,0.5); color: #fff; font-family: monospace; font-size: 11px; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
              <b style="color: #818cf8;">${d.ADMIN} (${d.ISO_A2})</b><br/>
              <span style="color: #94a3b8;">Population: </span><span style="color: #38bdf8;">${Math.round(+d.POP_EST / 1e4) / 1e2}M</span>
            </div>
          `);

        // Controls: enable auto-rotate, allow smooth interaction
        const controls = globe.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.9;
          controls.enableZoom = false; // keep hero section scroll smooth
        }

        globeInstanceRef.current = globe;

        // Fetch geojson dataset
        const res = await fetch('/datasets/ne_110m_admin_0_countries.geojson');
        const countries = await res.json();

        if (isMounted && globe) {
          globe.polygonsData(countries.features.filter((d: any) => d.properties?.ISO_A2 !== 'AQ'));

          // Transition to 3D extruded population heights like the globe.gl demo
          setTimeout(() => {
            if (isMounted && globe) {
              globe
                .polygonsTransitionDuration(3500)
                .polygonAltitude((feat: any) => {
                  const pop = feat?.properties?.POP_EST || 0;
                  return Math.max(0.04, Math.sqrt(+pop) * 5e-5);
                });
            }
          }, 1800);

          setLoaded(true);
        }
      } catch (err) {
        console.error('Failed to initialize Globe.GL:', err);
      }
    }

    initGlobe();

    const handleResize = () => {
      if (containerRef.current && globeInstanceRef.current) {
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        globeInstanceRef.current.width(w).height(h);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);
      if (globeInstanceRef.current?._destructor) {
        globeInstanceRef.current._destructor();
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-auto overflow-hidden">
      {/* Visual atmospheric background glow ring */}
      <div className="absolute w-[450px] h-[450px] sm:w-[580px] sm:h-[580px] rounded-full bg-indigo-500/15 dark:bg-indigo-600/25 blur-3xl pointer-events-none animate-pulse-slow"></div>

      <div
        ref={containerRef}
        className={`w-full h-full flex items-center justify-center transition-opacity duration-1000 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
