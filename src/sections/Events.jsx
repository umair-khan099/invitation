import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import SectionHeading from '../components/Common/SectionHeading';
import GlassPanel from '../components/Common/GlassPanel';
import { weddingData } from '../data/weddingData';
import { getDirectionsUrl, getDisplayAddress, getDisplayVenue } from '../utils/locationHelper';

gsap.registerPlugin(ScrollTrigger);

export default function Events() {
  const sectionRef = useRef(null);
  const timelineLineRef = useRef(null);
  const eventItemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Growing vertical timeline line animation
      gsap.fromTo(
        timelineLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: true,
          },
        }
      );

      // 2. Reveal each timeline item individually
      eventItemsRef.current.forEach((item, index) => {
        if (!item) return;

        gsap.fromTo(
          item,
          { opacity: 0, y: 50, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="events" ref={sectionRef} className="relative py-24 px-4 z-10">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="Wedding Ceremonies & Events"
          subtitle="Celebration Timeline"
        />

        {/* Timeline Container */}
        <div className="relative pt-4">
          {/* Vertical Center Line Stem */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-1 bg-[#E9B8C4]/40 rounded-full overflow-hidden">
            <div
              ref={timelineLineRef}
              className="w-full h-full bg-gradient-to-b from-[#C98F9D] via-[#C5A059] to-[#5E705B] origin-top"
            />
          </div>

          {/* Event Cards Array */}
          <div className="space-y-12 md:space-y-16">
            {weddingData.events.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={event.id}
                  ref={(el) => (eventItemsRef.current[index] = el)}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot Marker */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FBF7F1] border-4 border-[#C98F9D] shadow-md z-20 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-[#5E705B]" />
                  </div>

                  {/* Spacer for 2-column alternating desktop grid */}
                  <div className="hidden md:block w-1/2" />

                  {/* Event Card Content Box */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <GlassPanel className="relative space-y-4 hover:border-[#5E705B]/40 transition-colors">
                      {/* Event Color Tag Badge */}
                      {event.colorTag && (
                        <span className="inline-block text-[11px] font-sans tracking-widest uppercase font-bold text-[#5E705B] bg-[#A8B7A0]/30 px-3 py-1 rounded-full">
                          {event.colorTag}
                        </span>
                      )}

                      <h3 className="font-editorial text-2xl md:text-3xl font-normal text-[#4B403B]">
                        {event.title}
                      </h3>

                      <p className="font-sans text-xs md:text-sm text-[#8B7668] leading-relaxed">
                        {event.description}
                      </p>

                      {/* Date & Time Details */}
                      <div className="space-y-2 pt-2 border-t border-[#E9B8C4]/30 text-xs md:text-sm">
                        <div className="flex items-center gap-2 text-[#4B403B] font-medium">
                          <Calendar className="w-4 h-4 text-[#C98F9D]" />
                          <span>{event.date}</span>
                        </div>

                        <div className="flex items-center gap-2 text-[#4B403B] font-medium">
                          <Clock className="w-4 h-4 text-[#5E705B]" />
                          <span>{event.time}</span>
                        </div>

                        {(() => {
                          const displayVenue = getDisplayVenue(event);
                          const displayAddress = getDisplayAddress(event);
                          if (!displayVenue && !displayAddress) return null;

                          return (
                            <div className="flex items-start gap-2 text-[#8B7668]">
                              <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                              <div>
                                {displayVenue && (
                                  <span className="font-semibold text-[#4B403B] block">{displayVenue}</span>
                                )}
                                {displayAddress && <span>{displayAddress}</span>}
                              </div>
                            </div>
                          );
                        })()}
                      </div>

                      {/* Google Maps Directions Action CTA */}
                      {(() => {
                        const directionsUrl = getDirectionsUrl(event);
                        if (!directionsUrl) return null;

                        return (
                          <div className="pt-2">
                            <a
                              href={directionsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C98F9D]/60 bg-[#FBF7F1]/80 hover:bg-[#F4DCE2]/40 text-xs font-sans tracking-wider uppercase font-semibold text-[#4B403B] hover:text-[#5E705B] hover:border-[#5E705B] active:scale-95 transition-all duration-300 shadow-sm"
                            >
                              <MapPin className="w-3.5 h-3.5 text-[#C98F9D]" />
                              <span>Get Directions</span>
                            </a>
                          </div>
                        );
                      })()}
                    </GlassPanel>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
