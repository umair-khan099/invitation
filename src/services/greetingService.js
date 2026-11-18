// Greeting Service abstraction
// Validates guest blessings and formats a direct WhatsApp link or dispatches to WhatsApp

import { weddingData } from '../data/weddingData.js';

/**
 * Builds the pre-filled WhatsApp message text according to user requirements:
 * Assalamu Alaikum,
 * Name: {cleanName}
 * Wishes & Du'a:
 * {cleanMessage}
 * 
 * From the Wedding Invitation
 */
export function formatWhatsAppMessage({ name, message }) {
  const cleanName = (name || '').trim();
  const cleanMessage = (message || '').trim();

  return [
    'Assalamu Alaikum,',
    `Name: ${cleanName}`,
    'Wishes & Du\'a:',
    cleanMessage,
    '',
    'From the Wedding Invitation'
  ].join('\n');
}

/**
 * Returns the configured WhatsApp destination number.
 */
export function getWhatsAppDestinationNumber() {
  return (
    weddingData.contact?.whatsapp ||
    weddingData.greetings?.whatsappNumber ||
    '919798116845'
  );
}

/**
 * Validates inputs and returns the complete wa.me click-to-chat URL with properly encoded message.
 */
export function getWhatsAppUrl({ name, message }) {
  const cleanName = (name || '').trim();
  const cleanMessage = (message || '').trim();

  if (!cleanName) {
    throw new Error('Please enter your name.');
  }
  if (!cleanMessage) {
    throw new Error('Please enter your wishes or du\'a message.');
  }

  const phone = getWhatsAppDestinationNumber();
  const text = formatWhatsAppMessage({ name: cleanName, message: cleanMessage });
  const encodedText = encodeURIComponent(text);

  return `https://wa.me/${phone}?text=${encodedText}`;
}

/**
 * Dispatches the blessing to WhatsApp synchronously to preserve transient user activation
 * and prevent browser popup blockers from suppressing the window.
 */
export function sendBlessing({ name, message }) {
  const waUrl = getWhatsAppUrl({ name, message });

  // On mobile browsers, assigning to window.location.href directly launches the native WhatsApp app.
  // On desktop, opening in a new tab opens WhatsApp Web cleanly.
  const isMobile =
    typeof navigator !== 'undefined' &&
    /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

  try {
    if (isMobile) {
      window.location.href = waUrl;
    } else {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }
  } catch (err) {
    console.warn('Could not auto-open WhatsApp URL:', err);
  }

  return {
    success: true,
    message: "Your Du'a is ready to send ❤️",
    whatsappUrl: waUrl
  };
}
