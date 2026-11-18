/**
 * Utility helpers for event location, clean display text, and Google Maps navigation.
 */

/**
 * Checks if a string is an HTTP/HTTPS URL.
 */
export function isUrl(str) {
  if (!str || typeof str !== 'string') return false;
  return /^https?:\/\//i.test(str.trim());
}

/**
 * Returns a clean, human-readable address for display (never a raw URL).
 */
export function getDisplayAddress(event) {
  if (!event || !event.address) return '';
  if (isUrl(event.address)) return '';
  return event.address.trim();
}

/**
 * Returns a clean, human-readable venue name for display (never a raw URL).
 */
export function getDisplayVenue(event) {
  if (!event || !event.venue) return '';
  if (isUrl(event.venue)) return '';
  return event.venue.trim();
}

/**
 * Generates a robust Google Maps directions URL for an event.
 * Format: https://www.google.com/maps/dir/?api=1&destination=DESTINATION
 * 
 * - Google Maps uses the device's live/current location as starting point when allowed.
 * - On mobile, triggers the native Google Maps app when supported; otherwise browser.
 * - On desktop, opens Google Maps directions tab.
 * - Prefers exact coordinates if available, followed by clean textual address/venue.
 */
export function getDirectionsUrl(event) {
  if (!event) return '';

  // 1. If explicit latitude & longitude are available, coordinates are most reliable
  if (event.latitude && event.longitude) {
    const coords = `${event.latitude},${event.longitude}`.trim();
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(coords)}`;
  }

  // 2. If a clean text address / venue is available
  const cleanVenue = getDisplayVenue(event);
  const cleanAddress = getDisplayAddress(event);

  const destinationParts = [];
  if (cleanVenue) destinationParts.push(cleanVenue);
  if (cleanAddress && cleanAddress !== cleanVenue) destinationParts.push(cleanAddress);

  if (destinationParts.length > 0) {
    const destination = destinationParts.join(', ');
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
  }

  // 3. Fallback: Parse or use existing mapsUrl / gmapUrl / url in address
  const rawUrl =
    (isUrl(event.address) ? event.address.trim() : '') ||
    event.mapsUrl?.trim() ||
    event.gmapUrl?.trim();

  if (rawUrl) {
    // If it's already a directions URL with destination
    if (rawUrl.includes('/dir/')) {
      return rawUrl;
    }

    // Try extracting coordinates from URL if present (e.g. @lat,lng or ?q=lat,lng)
    const coordMatch =
      rawUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/) ||
      rawUrl.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch) {
      return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        `${coordMatch[1]},${coordMatch[2]}`
      )}`;
    }

    // Try extracting existing destination query param
    const destMatch = rawUrl.match(/[?&]destination=([^&]+)/);
    if (destMatch) {
      return `https://www.google.com/maps/dir/?api=1&destination=${destMatch[1]}`;
    }

    // If it's a shortened link (e.g. https://maps.app.goo.gl/...), use it directly
    return rawUrl;
  }

  return '';
}
