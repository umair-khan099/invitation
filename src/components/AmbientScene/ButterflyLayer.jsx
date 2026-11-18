import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { botanicalSceneConfig } from "../../config/botanicalConfig";
import { getAssetUrl } from "../../config/assetRegistry";

export default function ButterflyLayer() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!botanicalSceneConfig.enabled) return;
    const ctx = gsap.context(() => {
      botanicalSceneConfig.butterflies.forEach((bf) => {
        const el = document.getElementById(bf.id);
        if (!el) return;

        // Animate butterfly wings flutter
        const wingLeft = el.querySelector(".wing-flutter");
        if (wingLeft) {
          gsap.to(wingLeft, {
            scaleX: 0.3,
            duration: 0.18,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }

        // Animate curved butterfly flight trajectory
        const tl = gsap.timeline({
          repeat: -1,
          delay: bf.delay,
          repeatDelay: 6,
        });
        tl.set(el, {
          xPercent: bf.start.x * 10,
          yPercent: bf.start.y * 10,
          opacity: 0,
          scale: bf.scale * 0.8,
        })
          .to(el, {
            opacity: 0.9,
            duration: 2,
          })
          .to(
            el,
            {
              motionPath: {
                path: [
                  { x: bf.control1.x * 10, y: bf.control1.y * 8 },
                  { x: bf.control2.x * 10, y: bf.control2.y * 8 },
                  { x: bf.end.x * 10, y: bf.end.y * 8 },
                ],
                curviness: 1.5,
                autoRotate: true,
              },
              duration: bf.duration,
              ease: "power1.inOut",
            },
            0,
          )
          .to(
            el,
            {
              opacity: 0,
              duration: 3,
            },
            bf.duration - 3,
          );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none select-none z-15 overflow-hidden"
      aria-hidden="true"
    >
      {botanicalSceneConfig.butterflies.map((bf) => {
        const url = getAssetUrl(bf.assetCategory, bf.assetKey);
        if (!url) return null;

        return (
          <div
            key={bf.id}
            id={bf.id}
            className="absolute top-0 left-0 w-12 h-12 opacity-0 transform-gpu pointer-events-none select-none"
          >
            <img
              src={url}
              alt=""
              className="wing-flutter w-full h-full object-contain"
            />
          </div>
        );
      })}
    </div>
  );
}
