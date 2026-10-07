import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { weddingData } from '../../data/weddingData';
import { getAssetUrl } from '../../config/assetRegistry';

export default function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const bismillahRef = useRef(null);
  const greetingRef = useRef(null);
  const ornamentRef = useRef(null);
  const progressRef = useRef(null);
  const [progressVal, setProgressVal] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onCompleteRef.current) onCompleteRef.current();
        }
      });

      // Step 1: Fade in elements staggered
      tl.to(bismillahRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
      })
      .to(greetingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      }, "-=0.4")
      .to(ornamentRef.current, {
        opacity: 0.8,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.4)',
      }, "-=0.6");

      // Progress counting animation
      gsap.to({ val: 0 }, {
        val: 100,
        duration: 2.5,
        ease: 'power1.inOut',
        onUpdate: function() {
          setProgressVal(Math.round(this.targets()[0].val));
        }
      });

      // Step 2: Exit loader into Gate
      tl.to(containerRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 1.0,
        delay: 1.2,
        ease: 'power2.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const bismillahUrl = getAssetUrl('islamic', 'bismillah');
  const dividerUrl = getAssetUrl('ornaments', 'dividerOrnament');

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#FBF7F1] bg-paper-texture px-6 text-center select-none"
    >
      {/* Subtle Background Glow Radial */}
      <div className="absolute inset-0 bg-radial from-[#F4DCE2]/40 via-transparent to-transparent pointer-events-none" />

      {/* Center Content */}
      <div className="relative max-w-lg w-full flex flex-col items-center space-y-6">
        {/* Bismillah Calligraphy */}
        <div ref={bismillahRef} className="opacity-0 translate-y-4 w-full flex justify-center">
          {bismillahUrl ? (
            <img src={bismillahUrl} alt="Bismillah" className="h-16 md:h-20 object-contain" />
          ) : (
            <h2 className="font-arabic text-2xl md:text-3xl text-[#8B7668]">
              {weddingData.hero.bismillah}
            </h2>
          )}
        </div>

        {/* Greeting Subtext */}
        <div ref={greetingRef} className="opacity-0 translate-y-4 space-y-2">
          <p className="font-editorial text-xl md:text-2xl italic text-[#5E705B]">
            {weddingData.hero.greeting}
          </p>
          <p className="text-xs md:text-sm font-sans tracking-widest uppercase text-[#8B7668]/80 font-medium">
            Wedding Invitation Experience
          </p>
        </div>

        {/* Decorative Ornament */}
        <div ref={ornamentRef} className="opacity-0 scale-75 w-48 md:w-64 my-2">
          {dividerUrl && <img src={dividerUrl} alt="" className="w-full h-auto" />}
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-44 md:w-56 space-y-2 pt-4">
          <div className="h-[2px] w-full bg-[#E9B8C4]/30 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-[#C98F9D] via-[#C5A059] to-[#5E705B] transition-all duration-100 ease-out"
              style={{ width: `${progressVal}%` }}
            />
          </div>
          <span className="text-[10px] font-sans tracking-widest text-[#8B7668] uppercase">
            Loading Details • {progressVal}%
          </span>
        </div>
      </div>
    </div>
  );
}
