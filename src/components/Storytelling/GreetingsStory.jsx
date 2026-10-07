import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { sendBlessing } from '../../services/greetingService';
import { weddingData } from '../../data/weddingData';
import { getAssetUrl } from '../../config/assetRegistry';

export default function GreetingsStory() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successRes, setSuccessRes] = useState(null);

  const dividerUrl = getAssetUrl('ornaments', 'dividerOrnament');

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

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center space-y-3 sm:space-y-4 px-4">
      {/* Chapter Tag */}
      <div className="story-elem">
        <span className="text-[11px] sm:text-xs font-sans tracking-[0.3em] uppercase font-bold text-[#5E705B]">
          — WARM WISHES & DU'AS —
        </span>
      </div>

      {/* Title */}
      <h2 className="story-elem font-editorial text-3xl sm:text-5xl md:text-6xl font-normal text-[#4B403B] tracking-tight">
        {weddingData.greetings.heading}
      </h2>

      {/* Subtext */}
      <p className="story-elem font-sans text-xs sm:text-sm text-[#8B7668] max-w-md mx-auto leading-relaxed">
        {weddingData.greetings.subtext}
      </p>

      {/* Divider */}
      {dividerUrl && (
        <div className="story-elem w-24 sm:w-32 opacity-70 py-0.5">
          <img src={dividerUrl} alt="" className="w-full h-auto" />
        </div>
      )}

      {/* Form Content / Success state */}
      <div className="story-elem w-full max-w-md mx-auto pt-1 pointer-events-auto">
        {successRes ? (
          <div className="border border-[#5E705B]/40 bg-[#F4DCE2]/20 rounded-2xl p-5 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-[#5E705B] mx-auto" />
            <h3 className="font-editorial text-xl font-bold text-[#4B403B]">
              {successRes.message}
            </h3>
            <p className="text-xs font-sans text-[#8B7668]">
              WhatsApp has opened with your message pre-filled. If it did not open automatically, tap below to open.
            </p>
            {successRes.whatsappUrl && (
              <a
                href={successRes.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5E705B] hover:bg-[#4B403B] text-[#FBF7F1] text-xs font-sans uppercase tracking-widest font-semibold transition-colors mt-1 active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Open in WhatsApp</span>
              </a>
            )}
            <button
              onClick={() => {
                setSuccessRes(null);
                setErrorMsg('');
              }}
              className="block mx-auto text-xs font-sans text-[#8B7668] underline pt-1 hover:text-[#4B403B] cursor-pointer"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {errorMsg && (
              <div className="border border-[#C98F9D] bg-[#F4DCE2]/50 rounded-lg p-2.5 flex items-center gap-2 text-xs text-[#4B403B]">
                <AlertCircle className="w-4 h-4 text-[#C98F9D] shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Guest Name Input */}
            <div className="space-y-1">
              <label htmlFor="story-guest-name" className="block text-[11px] font-sans uppercase tracking-widest font-semibold text-[#8B7668]">
                Your Name / Family Name <span className="text-[#C98F9D]">*</span>
              </label>
              <input
                id="story-guest-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="e.g. Mr. & Mrs. Tariq & Family"
                className="w-full px-3 py-2 border-b border-[#C98F9D]/50 focus:border-[#5E705B] bg-transparent text-sm text-[#4B403B] placeholder-[#8B7668]/40 outline-none transition-colors"
              />
            </div>

            {/* Guest Message Input */}
            <div className="space-y-1">
              <label htmlFor="story-guest-message" className="block text-[11px] font-sans uppercase tracking-widest font-semibold text-[#8B7668]">
                Your Wishes / Du'a <span className="text-[#C98F9D]">*</span>
              </label>
              <textarea
                id="story-guest-message"
                rows={3}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Write your prayers, warm wishes, and congratulations here..."
                className="w-full px-3 py-2 border-b border-[#C98F9D]/50 focus:border-[#5E705B] bg-transparent text-sm text-[#4B403B] placeholder-[#8B7668]/40 outline-none transition-colors resize-none"
              />
            </div>

            {/* Submit Button (Flat pill, elegant styling) */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-full bg-[#5E705B] hover:bg-[#4B403B] text-[#FBF7F1] font-sans text-xs uppercase tracking-[0.2em] font-semibold active:scale-95 transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-sm hover:shadow"
              >
                {loading ? (
                  <span>Preparing Message...</span>
                ) : (
                  <>
                    <span>Send Wishes</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
