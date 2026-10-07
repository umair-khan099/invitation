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
  const stageRef = useRef(null);
  const slideRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // List of all story slides in chronological narrative order
  const stories = useMemo(() => {
    const list = [
      { id: 'hero', key: 'hero', component: <HeroStory /> },
      { id: 'bride', key: 'bride', component: <BrideStory /> },
      { id: 'groom', key: 'groom', component: <GroomStory /> },
      { id: 'union', key: 'union', component: <UnionStory /> },
      { id: 'dua', key: 'dua', component: <DuaStory /> },
    ];

    // Events sequentially in the same pinned stage (Requirement 17)
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

  // Responsive, compact scroll distances per transition
  // Hero -> Bride and Bride -> Groom are deliberately tighter (360px each)
  // for immediate, energetic opening feedback (Requirements 1, 2, 3, 7)
  const stepDistances = useMemo(() => {
    return [
      360, // 0: Hero -> Bride (fast, responsive opening)
      360, // 1: Bride -> Groom (close, fluid transition)
      400, // 2: Groom -> Union
      400, // 3: Union -> Dua
      420, // 4: Dua -> Barat (Ceremony 1)
      380, // 5: Barat -> Nikah (Ceremony 2)
      380, // 6: Nikah -> Dinner (Ceremony 3)
      380, // 7: Dinner -> Return of Barat (Ceremony 4)
      420, // 8: Return of Barat -> Countdown
      420, // 9: Countdown -> Greetings
      400, // 10: Greetings -> Signoff
    ];
  }, []);

  // Total scroll distance and cumulative offsets
  const { totalScrollDistance, storyOffsets, storyProgresses } = useMemo(() => {
    const total = stepDistances.reduce((acc, d) => acc + d, 0);
    const offsets = [0];
    for (let i = 0; i < stepDistances.length; i++) {
      offsets.push(offsets[i] + stepDistances[i]);
    }
    const progs = offsets.map((off) => off / total);
    return { totalScrollDistance: total, storyOffsets: offsets, storyProgresses: progs };
  }, [stepDistances]);

  useEffect(() => {
    if (!isGateOpen) return;

    const ctx = gsap.context(() => {
      const slides = slideRefs.current;
      if (!slides || slides.length === 0) return;

      // Master scroll-driven timeline with overlapping transitions
      const tl = gsap.timeline({
        paused: true,
      });

      let currentTime = 0;

      for (let i = 0; i < stories.length - 1; i++) {
        const currentSlide = slides[i];
        const nextSlide = slides[i + 1];
        if (!currentSlide || !nextSlide) continue;

        // Proportional step duration in timeline time
        const stepDist = stepDistances[i];
        const stepDuration = stepDist / 380; // normalized unit ~1.0

        // In the very first transition (Hero -> Bride), respond almost immediately
        // In subsequent transitions, allow a brief reading hold window (~20% of step)
        const holdBeforeExit = i === 0 ? 0.05 * stepDuration : 0.20 * stepDuration;
        const exitStart = currentTime + holdBeforeExit;
        const exitDuration = 0.52 * stepDuration;

        // OVERLAPPING ENTRANCE: next slide starts entering while current slide is still fading!
        // No dead space, no empty delays (Requirement 8, 9)
        const enterStart = exitStart + 0.24 * stepDuration;
        const enterDuration = 0.50 * stepDuration;

        const currentElems = currentSlide.querySelectorAll('.story-elem');
        const nextElems = nextSlide.querySelectorAll('.story-elem');

        // 1. Current slide dissolves and floats upward
        if (currentElems.length > 0) {
          tl.to(
            currentElems,
            {
              y: -26,
              opacity: 0,
              filter: 'blur(4px)',
              stagger: 0.03,
              duration: exitDuration * 0.85,
              ease: 'power2.in',
            },
            exitStart
          );
        }

        tl.to(
          currentSlide,
          {
            opacity: 0,
            scale: 0.97,
            y: -30,
            filter: 'blur(5px)',
            duration: exitDuration,
            ease: 'power2.in',
          },
          exitStart
        );

        // 2. Next slide emerges at EXACT SAME POSITION with smooth text reveal
        tl.fromTo(
          nextSlide,
          {
            opacity: 0,
            scale: 0.98,
            y: 22,
            filter: 'blur(5px)',
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: enterDuration,
            ease: 'power2.out',
          },
          enterStart
        );

        if (nextElems.length > 0) {
          tl.fromTo(
            nextElems,
            {
              opacity: 0,
              y: 18,
              filter: 'blur(3px)',
            },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              stagger: 0.04,
              duration: enterDuration * 0.88,
              ease: 'power2.out',
            },
            enterStart + 0.04
          );
        }

        currentTime += stepDuration;
      }

      // ScrollTrigger pins stage and scrubs the responsive timeline
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: stageRef.current,
        pinSpacing: false,
        scrub: 0.5, // Responsive scrub with low latency (Requirement 11)
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: tl,
        onUpdate: (self) => {
          // Identify current active story based on scroll progress
          const currentScroll = self.progress * totalScrollDistance;
          let closestIdx = 0;
          let minDiff = 99999;
          storyOffsets.forEach((off, idx) => {
            const diff = Math.abs(currentScroll - off);
            if (diff < minDiff) {
              minDiff = diff;
              closestIdx = idx;
            }
          });
          closestIdx = Math.max(0, Math.min(closestIdx, stories.length - 1));
          setActiveIndex(closestIdx);
        },
      });

      // Expose navigation function for Navbar & Progress Dots
      window.__weddingScrollToStory = (targetIdOrIndex) => {
        let targetIndex = 0;
        if (typeof targetIdOrIndex === 'number') {
          targetIndex = targetIdOrIndex;
        } else {
          const cleanId = String(targetIdOrIndex).replace('#', '');
          const found = stories.findIndex((s) => s.id === cleanId);
          if (found !== -1) targetIndex = found;
        }

        if (containerRef.current) {
          const targetY = containerRef.current.offsetTop + (storyOffsets[targetIndex] || 0);
          if (window.__lenis) {
            window.__lenis.scrollTo(targetY, { duration: 1.0 });
          } else {
            window.scrollTo({ top: targetY, behavior: 'smooth' });
          }
        }
      };

      // Set initial styles: First slide visible, others hidden
      slides.forEach((slide, i) => {
        if (!slide) return;
        if (i === 0) {
          gsap.set(slide, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' });
        } else {
          gsap.set(slide, { opacity: 0, y: 22, scale: 0.98, filter: 'blur(5px)' });
        }
      });
    }, containerRef);

    return () => {
      delete window.__weddingScrollToStory;
      ctx.revert();
    };
  }, [isGateOpen, stories, stepDistances, totalScrollDistance, storyOffsets]);

  const handleDotClick = (index) => {
    if (window.__weddingScrollToStory) {
      window.__weddingScrollToStory(index);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{
        // Compact, responsive total scroll height (approx 360-420px per story transition)
        height: `calc(100vh + ${totalScrollDistance}px)`,
      }}
    >
      {/* Chapter side dots indicator */}
      <StoryProgressDots
        stories={stories}
        activeIndex={activeIndex}
        onDotClick={handleDotClick}
      />

      {/* Pinned Central Story Stage (Requirements 1, 2, 7) */}
      <div
        ref={stageRef}
        className="fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none overflow-hidden z-30"
      >
        {/* Subtle radial aura centered on the stage, completely shadow-free */}
        <div className="absolute inset-0 m-auto w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full bg-gradient-radial from-[#F4DCE2]/50 via-[#E9B8C4]/15 to-transparent blur-3xl pointer-events-none select-none" />

        {/* Stories Stack: All stories occupy the EXACT SAME CENTRAL POSITION */}
        <div className="relative w-full max-w-4xl h-full flex items-center justify-center px-4 sm:px-8 md:px-16 pointer-events-none">
          {stories.map((story, index) => {
            const isCurrent = activeIndex === index;
            return (
              <div
                key={story.key}
                id={story.id}
                ref={(el) => (slideRefs.current[index] = el)}
                className={`absolute inset-0 m-auto flex items-center justify-center transition-all duration-150 transform-gpu ${
                  isCurrent ? 'story-slide-active' : 'story-slide-inactive'
                }`}
                style={{
                  willChange: 'transform, opacity, filter',
                  zIndex: isCurrent ? 30 : 10,
                  pointerEvents: isCurrent ? 'auto' : 'none',
                }}
              >
                {story.component}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
