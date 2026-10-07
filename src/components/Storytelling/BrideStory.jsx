import React from 'react';
import { weddingData } from '../../data/weddingData';
import { getAssetUrl } from '../../config/assetRegistry';

export default function BrideStory() {
  const dividerUrl = getAssetUrl('ornaments', 'dividerOrnament');

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center space-y-4 sm:space-y-5 px-4">
      {/* Role Badge */}
      <div className="story-elem">
        <span className="text-[11px] sm:text-xs font-sans tracking-[0.3em] uppercase font-bold text-[#C98F9D]">
          — {weddingData.bride.role} —
        </span>
      </div>

      {/* Bride Name */}
      <h2 className="story-elem font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-[#4B403B] tracking-tight">
        {weddingData.bride.name}
      </h2>

      {/* Parentage */}
      <p className="story-elem font-editorial italic text-base sm:text-lg md:text-xl text-[#8B7668]">
        Daughter of <span className="font-semibold text-[#4B403B]">{weddingData.bride.fatherName}</span>
        {weddingData.bride.motherName && ` & ${weddingData.bride.motherName}`}
      </p>

      {/* Profession */}
      {/* <div className="story-elem inline-flex items-center gap-2 text-xs sm:text-sm font-sans tracking-widest text-[#5E705B] uppercase font-medium">
        <span>Profession:</span>
        <span className="font-semibold text-[#4B403B]">{weddingData.bride.profession}</span>
      </div> */}

      {/* Divider */}
      {dividerUrl && (
        <div className="story-elem w-28 sm:w-36 opacity-70 py-0.5">
          <img src={dividerUrl} alt="" className="w-full h-auto" />
        </div>
      )}

      {/* Personal Line */}
      <p className="story-elem font-sans text-xs sm:text-sm md:text-base text-[#4B403B]/90 leading-relaxed italic max-w-lg mx-auto">
        "{weddingData.bride.personalLine}"
      </p>

      {/* Sacred Quote */}
      {weddingData.bride.quote && (
        <p className="story-elem text-xs sm:text-sm font-editorial italic text-[#8B7668]/80 max-w-md mx-auto pt-1">
          "{weddingData.bride.quote}"
        </p>
      )}
    </div>
  );
}
