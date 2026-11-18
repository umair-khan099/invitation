import React from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import { weddingData } from '../../data/weddingData';
import { getAssetUrl } from '../../config/assetRegistry';

export default function CountdownStory() {
  const timeLeft = useCountdown(weddingData.countdown.targetDate);
  const dividerUrl = getAssetUrl('ornaments', 'dividerOrnament');

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center space-y-4 sm:space-y-6 px-4">
      {/* Chapter Tag */}
      <div className="story-elem">
        <span className="text-[11px] sm:text-xs font-sans tracking-[0.3em] uppercase font-bold text-[#C98F9D]">
          — THE SACRED UNION —
        </span>
      </div>

      {/* Main Title */}
      <h2 className="story-elem font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-[#4B403B] tracking-tight">
        The Big Day
      </h2>

      {/* Subtext */}
      <p className="story-elem font-sans text-xs sm:text-sm md:text-base text-[#8B7668] max-w-md mx-auto leading-relaxed">
        {weddingData.countdown.subtext}
      </p>

      {/* Divider */}
      {dividerUrl && (
        <div className="story-elem w-28 sm:w-36 opacity-70 py-0.5">
          <img src={dividerUrl} alt="" className="w-full h-auto" />
        </div>
      )}

      {/* Typographic Countdown Grid (Flat Printed Editorial, NO Cards, NO Shadows) */}
      <div className="story-elem w-full max-w-xl mx-auto pt-2">
        {timeLeft.isExpired ? (
          <div className="py-4 space-y-2">
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#C98F9D] font-bold">
              The Blessed Day Has Arrived!
            </h3>
            <p className="font-sans text-sm text-[#5E705B]">Alhamdulillah for this wonderful occasion.</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-6 py-2 border-y border-[#C98F9D]/25">
            {timeUnits.map((unit, idx) => (
              <div
                key={unit.label}
                className={`flex flex-col items-center justify-center py-2 ${
                  idx < timeUnits.length - 1 ? 'border-r border-[#C98F9D]/20' : ''
                }`}
              >
                <span className="font-editorial text-3xl sm:text-5xl md:text-6xl font-normal text-[#4B403B] tracking-tight">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-sans tracking-[0.25em] uppercase font-semibold text-[#C98F9D] mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Wedding Target Date Sign */}
      <div className="story-elem pt-1">
        <span className="text-xs sm:text-sm font-editorial italic text-[#5E705B]">
          28 October 2026 | 7:00 PM
        </span>
      </div>
    </div>
  );
}
