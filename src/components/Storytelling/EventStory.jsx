import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { getAssetUrl } from '../../config/assetRegistry';
import { getDirectionsUrl, getDisplayAddress, getDisplayVenue } from '../../utils/locationHelper';

export default function EventStory({ event, index = 0, totalEvents = 5 }) {
  const dividerUrl = getAssetUrl('ornaments', 'dividerOrnament');
  const displayVenue = getDisplayVenue(event);
  const displayAddress = getDisplayAddress(event);
  const directionsUrl = getDirectionsUrl(event);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center space-y-3 sm:space-y-4 px-4">
      {/* Event Index Tag */}
      <div className="story-elem">
        <span className="text-[10px] sm:text-xs font-sans tracking-[0.25em] uppercase font-bold text-[#C98F9D] border border-[#C98F9D]/40 px-3 py-1 rounded-full">
          Ceremony {index + 1} of {totalEvents}
        </span>
      </div>

      {/* Event Title */}
      <h2 className="story-elem font-editorial text-3xl sm:text-5xl md:text-6xl font-normal text-[#4B403B] tracking-tight">
        {event.title}
      </h2>

      {/* Date & Time */}
      <div className="story-elem flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-sans text-[#5E705B] font-medium">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#C98F9D]" />
          <span>{event.date}</span>
        </span>
        <span className="text-[#C98F9D]/50">•</span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#5E705B]" />
          <span>{event.time}</span>
        </span>
      </div>

      {/* Venue & Clean Text Address (never raw URL) */}
      {(displayVenue || displayAddress) && (
        <div className="story-elem inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-sans text-[#8B7668]">
          <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
          <span>
            {displayVenue && <strong className="text-[#4B403B]">{displayVenue}</strong>}
            {displayVenue && displayAddress && ', '}
            {displayAddress && <span>{displayAddress}</span>}
          </span>
        </div>
      )}

      {/* Color / Dress Theme */}
      {/* {event.colorTag && (
        <div className="story-elem text-[11px] sm:text-xs font-sans tracking-wider uppercase text-[#8B7668]/80 italic">
          Theme: <span className="font-semibold text-[#5E705B]">{event.colorTag}</span>
        </div>
      )} */}

      {/* Divider */}
      {dividerUrl && (
        <div className="story-elem w-24 sm:w-36 opacity-70 py-0.5">
          <img src={dividerUrl} alt="" className="w-full h-auto" />
        </div>
      )}

      {/* Description */}
      <p className="story-elem font-sans text-xs sm:text-sm md:text-base text-[#4B403B]/90 max-w-lg mx-auto leading-relaxed italic">
        "{event.description}"
      </p>

      {/* Location / Google Maps Navigation CTA Button */}
      {directionsUrl && (
        <div className="story-elem pt-2 pointer-events-auto">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C98F9D]/60 bg-[#FBF7F1]/90 hover:bg-[#F4DCE2]/60 text-xs font-sans tracking-widest uppercase font-semibold text-[#4B403B] hover:text-[#5E705B] hover:border-[#5E705B] shadow-sm hover:shadow active:scale-95 transition-all duration-300 pointer-events-auto cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-[#C98F9D]" />
            <span>Get Directions</span>
          </a>
        </div>
      )}
    </div>
  );
}
