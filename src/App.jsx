import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from './components/Opening/Loader';
import InvitationGate from './components/Opening/InvitationGate';
import AmbientScene from './components/AmbientScene/AmbientScene';
import Navbar from './components/Navigation/Navbar';
import WeddingStoryScroller from './components/Storytelling/WeddingStoryScroller';
import { useLenis } from './hooks/useLenis';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isGateOpen, setIsGateOpen] = useState(false);

  // Enable Lenis smooth scrolling when the gate opens
  useLenis(isGateOpen);

  useEffect(() => {
    window.__openInvitationGate = () => {
      setIsLoading(false);
      setIsGateOpen(true);
    };
    return () => {
      delete window.__openInvitationGate;
    };
  }, []);

  useEffect(() => {
    if (isGateOpen) {
      const t1 = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      const t2 = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 600);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [isGateOpen]);

  return (
    <div className="relative min-h-screen bg-[#FBF7F1] bg-paper-texture text-[#4B403B] overflow-x-hidden selection:bg-[#E9B8C4]/30 selection:text-[#5E705B]">
      {/* LOADER */}
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      {/* INVITATION GATE */}
      {!isLoading && !isGateOpen && (
        <InvitationGate onGateOpen={() => setIsGateOpen(true)} />
      )}

      {/* MAIN WEBSITE CONTENT (Revealed after gate opens) */}
      {isGateOpen && (
        <div className="relative animate-fadeIn">
          {/* LAYER 1 & 3: PERSISTENT BOTANICAL ENVIRONMENT (Fixed Foreground Frame Z-40) */}
          <AmbientScene />

          {/* MINIMAL LUXURY NAVBAR (Z-50) */}
          <Navbar visible={isGateOpen} />

          {/* PINNED CINEMATIC SCROLLTELLING EXPERIENCE (Z-30) */}
          <main className="relative z-30">
            <WeddingStoryScroller isGateOpen={isGateOpen} />
          </main>
        </div>
      )}
    </div>
  );
}
