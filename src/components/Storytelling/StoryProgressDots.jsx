import React from 'react';

export default function StoryProgressDots({ stories, activeIndex, onDotClick }) {
  // Only display key chapter markers to keep UI clean and editorial
  const keyMarkers = [
    { index: 0, label: 'Welcome' },
    { index: 1, label: 'Bride' },
    { index: 2, label: 'Groom' },
    { index: 3, label: 'Union' },
    { index: 4, label: "Du'a" },
    { index: 5, label: 'Ceremonies' },
    { index: 9, label: 'Countdown' },
    { index: 10, label: 'Blessings' },
  ];

  return (
    <nav
      aria-label="Story Progress"
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-45 flex-col items-end space-y-3 pointer-events-auto select-none"
    >
      {keyMarkers.map((marker) => {
        const isActive =
          marker.index === 5
            ? activeIndex >= 5 && activeIndex <= 8
            : activeIndex === marker.index;

        return (
          <button
            key={marker.index}
            onClick={() => onDotClick(marker.index)}
            className="group flex items-center gap-2 cursor-pointer focus:outline-none"
            title={marker.label}
          >
            <span
              className={`text-[10px] font-sans tracking-widest uppercase transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                isActive ? 'text-[#C98F9D] font-bold opacity-100' : 'text-[#8B7668]'
              }`}
            >
              {marker.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-2.5 h-2.5 bg-[#C98F9D] scale-110'
                  : 'w-1.5 h-1.5 bg-[#8B7668]/40 group-hover:bg-[#8B7668]'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
