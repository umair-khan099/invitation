import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import SectionHeading from '../components/Common/SectionHeading';
import GlassPanel from '../components/Common/GlassPanel';
import { sendBlessing } from '../services/greetingService';
import { weddingData } from '../data/weddingData';

gsap.registerPlugin(ScrollTrigger);

export default function Greetings() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successRes, setSuccessRes] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      setErrorMsg('Please enter your name.');
      return;
    }

    if (!trimmedMessage) {
      setErrorMsg('Please enter your wishes or du\'a message.');
      return;
    }

    try {
      setLoading(true);
      const res = sendBlessing({ name: trimmedName, message: trimmedMessage });
      setLoading(false);
      setSuccessRes(res);
      // Clear form ONLY after successfully triggering the WhatsApp action
      setName('');
      setMessage('');
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || 'An error occurred while preparing your message.');
    }
  };

  if (!weddingData.greetings.enabled) return null;

  return (
    <section id="greetings" ref={sectionRef} className="relative py-24 px-4 z-10">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          title={weddingData.greetings.heading}
          subtitle="Warm Wishes"
        />

        <div ref={cardRef} className="opacity-0">
          <GlassPanel className="p-8 md:p-12 border border-[#E9B8C4]/40 shadow-2xl">
            <p className="font-sans text-sm md:text-base text-[#8B7668] text-center max-w-lg mx-auto mb-8">
              {weddingData.greetings.subtext}
            </p>

            {successRes ? (
              <div className="bg-[#A8B7A0]/20 border border-[#5E705B]/40 rounded-2xl p-6 text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-10 h-10 text-[#5E705B] mx-auto" />
                <h3 className="font-editorial text-2xl font-bold text-[#4B403B]">
                  {successRes.message}
                </h3>
                <p className="text-xs md:text-sm font-sans text-[#8B7668]">
                  WhatsApp has opened with your message pre-filled. If it did not open automatically, click the button below.
                </p>
                {successRes.whatsappUrl && (
                  <a
                    href={successRes.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#5E705B] text-[#FBF7F1] text-xs font-sans uppercase tracking-widest font-semibold hover:bg-[#4B403B] transition-colors mt-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open in WhatsApp</span>
                  </a>
                )}
                <button
                  onClick={() => setSuccessRes(null)}
                  className="block mx-auto text-xs font-sans text-[#8B7668] underline pt-2 hover:text-[#4B403B]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="bg-[#F4DCE2] border border-[#C98F9D] rounded-xl p-3 flex items-center gap-2 text-xs text-[#4B403B]">
                    <AlertCircle className="w-4 h-4 text-[#C98F9D] shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Name Input */}
                <div className="space-y-2">
                  <label htmlFor="guest-name" className="block text-xs font-sans uppercase tracking-widest font-semibold text-[#4B403B]">
                    Your Name / Family Name <span className="text-[#C98F9D]">*</span>
                  </label>
                  <input
                    id="guest-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Mr. & Mrs. Tariq & Family"
                    className="w-full px-4 py-3 rounded-xl bg-[#FBF7F1] border border-[#E9B8C4]/50 focus:outline-none focus:ring-2 focus:ring-[#C98F9D] text-sm text-[#4B403B] placeholder-[#8B7668]/50 transition-all"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label htmlFor="guest-message" className="block text-xs font-sans uppercase tracking-widest font-semibold text-[#4B403B]">
                    Your Blessing / Du'a <span className="text-[#C98F9D]">*</span>
                  </label>
                  <textarea
                    id="guest-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your prayers, warm wishes, and congratulations here..."
                    className="w-full px-4 py-3 rounded-xl bg-[#FBF7F1] border border-[#E9B8C4]/50 focus:outline-none focus:ring-2 focus:ring-[#C98F9D] text-sm text-[#4B403B] placeholder-[#8B7668]/50 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#C98F9D] via-[#C5A059] to-[#5E705B] text-[#FBF7F1] font-sans text-xs uppercase tracking-[0.2em] font-bold shadow-md hover:shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Preparing Message...</span>
                  ) : (
                    <>
                      <span>Send Wishes</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
