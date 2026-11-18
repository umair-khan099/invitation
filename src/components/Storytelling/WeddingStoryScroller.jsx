import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroStory from './HeroStory';
import BrideStory from './BrideStory';
import GroomStory from './GroomStory';
import UnionStory from './UnionStory';
import DuaStory from './DuaStory';
import EventStory from './EventStory';
import CountdownStory from './CountdownStory';
import GreetingsStory from './GreetingsStory';
import SignoffStory from './SignoffStory';
import StoryProgressDots from './StoryProgressDots';

import { weddingData } from '../../data/weddingData';

gsap.registerPlugin(ScrollTrigger);

export default function WeddingStoryScroller({ isGateOpen = true }) {
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // List of all story sections in natural vertical narrative order
  const stories = useMemo(() => {
    const list = [
      { id: 'hero', key: 'hero', component: <HeroStory /> },
      { id: 'bride', key: 'bride', component: <BrideStory /> },
      { id: 'groom', key: 'groom', component: <GroomStory /> },
      { id: 'union', key: 'union', component: <UnionStory /> },
      { id: 'dua', key: 'dua', component: <DuaStory /> },
    ];

    // Events sequentially in natural vertical order
    weddingData.events.forEach((event, idx) => {
      list.push({
        id: idx === 0 ? 'events' : `event-${event.id}`,
        key: `event-${event.id}`,
        component: (
          <EventStory
            event={event}
            index={idx}
            totalEvents={weddingData.events.length}
          />
        ),
      });
    });

    list.push(
      { id: 'countdown', key: 'countdown', component: <CountdownStory /> },
      { id: 'greetings', key: 'greetings', component: <GreetingsStory /> },
      { id: 'footer', key: 'signoff', component: <SignoffStory /> }
    );

    return list;
  }, []);

  useEffect(() => {
    if (!isGateOpen) return;

    // Expose navigation function for Navbar & Progress Dots
    window.__weddingScrollToStory = (targetIdOrIndex) => {
      let targetEl = null;
      if (typeof targetIdOrIndex === 'number') {
        targetEl = sectionRefs.current[targetIdOrIndex];
      } else {
        const cleanId = String(targetIdOrIndex).replace('#', '');
        targetEl = document.getElementById(cleanId);
        if (!targetEl) {
          const foundIdx = stories.findIndex((s) => s.id === cleanId);
          if (foundIdx !== -1) {
            targetEl = sectionRefs.current[foundIdx];
          }
        }
      }

      if (targetEl) {
        if (window.__lenis) {
          window.__lenis.scrollTo(targetEl, { duration: 1.0, offset: -20 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    const ctx = gsap.context(() => {
      const sections = sectionRefs.current;
      if (!sections || sections.length === 0) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // 1. Entrance animation for the Hero section
      const heroSection = sections[0];
      if (heroSection && !prefersReducedMotion) {
        const heroElems = heroSection.querySelectorAll('.story-elem');
        gsap.fromTo(
          heroElems.length > 0 ? heroElems : heroSection,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.8,
            ease: 'power2.out',
            clearProps: 'all',
          }
        );
      }

      // 2. Entrance animations & section tracking for natural scrolling
      sections.forEach((section, index) => {
        if (!section) return;

        // Entrance animation triggered as each subsequent section enters view
        if (index > 0 && !prefersReducedMotion) {
          const elems = section.querySelectorAll('.story-elem');
          gsap.fromTo(
            elems.length > 0 ? elems : section,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.04,
              duration: 0.7,
              ease: 'power2.out',
              clearProps: 'all',
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }

        // Active section tracking for progress dots & navigation
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });
    }, containerRef);

    return () => {
      delete window.__weddingScrollToStory;
      ctx.revert();
    };
  }, [isGateOpen, stories]);

  const handleDotClick = (index) => {
    if (window.__weddingScrollToStory) {
      window.__weddingScrollToStory(index);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Chapter side dots indicator */}
      <StoryProgressDots
        stories={stories}
        activeIndex={activeIndex}
        onDotClick={handleDotClick}
      />

      {/* Natural Vertical Story Sections */}
      <div className="relative w-full flex flex-col">
        {stories.map((story, index) => {
          const isFooter = story.id === 'footer';
          return (
            <section
              key={story.key}
              id={story.id}
              ref={(el) => (sectionRefs.current[index] = el)}
              className={`story-section relative w-full flex items-center justify-center px-4 sm:px-8 md:px-16 ${
                isFooter
                  ? 'min-h-[60vh] sm:min-h-[70vh] py-16 sm:py-24'
                  : 'min-h-[85vh] sm:min-h-screen py-20 sm:py-28 md:py-32'
              }`}
            >
              {/* Subtle radial aura centered on the section */}
              <div className="absolute inset-0 m-auto w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full bg-gradient-radial from-[#F4DCE2]/40 via-[#E9B8C4]/10 to-transparent blur-3xl pointer-events-none select-none" />

              {/* Central section content */}
              <div className="relative w-full max-w-4xl flex items-center justify-center z-10">
                {story.component}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
