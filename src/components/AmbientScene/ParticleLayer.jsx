import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { botanicalSceneConfig } from '../../config/botanicalConfig';

export default function ParticleLayer() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const particles = containerRef.current.querySelectorAll('.ambient-particle');
      particles.forEach((p, idx) => {
        const randomX = (Math.random() - 0.5) * 80;
        const randomY = - (100 + Math.random() * 200);
        const duration = 12 + Math.random() * 15;
        const delay = Math.random() * 8;

        gsap.to(p, {
          y: randomY,
          x: `+=${randomX}`,
          opacity: 0,
          duration: duration,
          delay: delay,
          repeat: -1,
          ease: 'none',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const particlesArr = Array.from({ length: botanicalSceneConfig.particles.count });

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none select-none z-5 overflow-hidden" aria-hidden="true">
      {particlesArr.map((_, i) => {
        const left = `${Math.floor(Math.random() * 100)}%`;
        const top = `${80 + Math.floor(Math.random() * 20)}%`;
        const size = `${3 + Math.floor(Math.random() * 5)}px`;
        const opacity = 0.3 + Math.random() * 0.4;
        return (
          <div
            key={i}
            className="ambient-particle absolute rounded-full filter blur-[1px]"
            style={{
              left,
              top,
              width: size,
              height: size,
              backgroundColor: i % 2 === 0 ? botanicalSceneConfig.particles.glowColor : botanicalSceneConfig.particles.color,
              opacity,
            }}
          />
        );
      })}
    </div>
  );
}
