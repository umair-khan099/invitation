import React, { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { botanicalSceneConfig } from '../../config/botanicalConfig';
import { getAssetUrl } from '../../config/assetRegistry';

export default function BotanicalLayer() {
  const containerRef = useRef(null);

  // Retrieve all elements from the configuration
  const elements = useMemo(() => {
    return botanicalSceneConfig.allElements || [];
  }, []);

  useEffect(() => {
    if (!botanicalSceneConfig.enabled) return;

    const ctx = gsap.context(() => {
      elements.forEach((elConfig) => {
        const el = document.getElementById(elConfig.id);
        if (el && elConfig.sway) {
          gsap.to(el, {
            rotation: `+=${elConfig.sway.rotDeg || 0}`,
            x: `+=${elConfig.sway.xPx || 0}`,
            y: `+=${elConfig.sway.yPx || 0}`,
            duration: elConfig.sway.duration || 6,
            delay: elConfig.sway.delay || 0,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [elements]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none select-none overflow-hidden z-15"
      aria-hidden="true"
    >
      {elements.map((item) => {
        const url = getAssetUrl(item.assetCategory, item.assetKey);
        if (!url) return null;

        // Determine natural pivot origin based on corner if not explicitly specified
        const transformOrigin =
          item.transformOrigin ||
          (item.corner === 'topLeft'
            ? 'top left'
            : item.corner === 'topRight'
            ? 'top right'
            : item.corner === 'bottomLeft'
            ? 'bottom left'
            : item.corner === 'bottomRight'
            ? 'bottom right'
            : 'center center');

        const wrapperStyle = {
          position: 'absolute',
          top: item.top,
          bottom: item.bottom,
          left: item.left,
          right: item.right,
          width: item.width || 'auto',
          height: item.height || 'auto',
          opacity: item.opacity !== undefined ? item.opacity : 1,
          zIndex: item.zIndex || 1,
          transform: `rotate(${item.rotation || 0}deg)`,
          transformOrigin,
        };

        // Ignore any shadow category item
        if (item.assetCategory && item.assetCategory.startsWith('shadows')) return null;

        return (
          <div
            key={item.id}
            id={item.id}
            style={wrapperStyle}
            className="transform-gpu pointer-events-none"
          >
            <img
              src={url}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        );
      })}
    </div>
  );
}
