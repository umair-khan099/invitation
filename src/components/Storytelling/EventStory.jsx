import React from 'react';
import { Calendar } from 'lucide-react';
import { getAssetUrl } from '../../config/assetRegistry';

export default function EventStory({ event, index = 0, totalEvents = 2 }) {
  const dividerUrl = getAssetUrl('ornaments', 'dividerOrnament');

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center space-y-4 sm:space-y-5 px-4">
      {/* Event Index Tag */}
      <div className="story-elem">
        <span className="text-[10px] sm:text-xs font-sans tracking-[0.25em] uppercase font-bold text-[#C98F9D] border border-[#C98F9D]/40 px-3 py-1 rounded-full">
          Ceremony {index + 1} of {totalEvents}
        </span>
      </div>

      {/* Event Title */}
      <h2 className="story-elem font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-[#4B403B] tracking-tight">
        {event.title}
      </h2>

      {/* Divider */}
      {dividerUrl && (
        <div className="story-elem w-24 sm:w-36 opacity-70 py-0.5">
          <img src={dividerUrl} alt="" className="w-full h-auto" />
        </div>
      )}

      {/* Date */}
      <div className="story-elem flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg font-sans text-[#5E705B] font-semibold tracking-wide">
        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#C98F9D]" />
        <span>{event.date}</span>
      </div>
    </div>
  );
}
