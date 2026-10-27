/** Shared SVG symbols (acacia silhouette, icons), referenced with <use href="#id" />. */
export function Sprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <symbol id="acacia" viewBox="0 0 400 140" preserveAspectRatio="xMidYMax slice">
        <path fill="currentColor" d="M0 128 Q100 118 200 124 T400 120 V140 H0Z" />
        <path fill="currentColor" d="M228 44 Q262 24 300 28 Q338 20 372 40 Q350 50 302 48 Q262 54 228 44Z" />
        <path fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" d="M300 124 L298 48 M299 82 L268 47 M300 72 L334 46" />
        <path fill="currentColor" d="M40 92 Q58 82 78 85 Q96 80 112 92 Q96 98 76 96 Q56 99 40 92Z" />
        <path fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" d="M76 126 L76 96 M76 108 L62 94" />
      </symbol>
      <symbol id="sun" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="4.2" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
        </g>
      </symbol>
      <symbol id="moon" viewBox="0 0 24 24">
        <path fill="currentColor" d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1Z" />
      </symbol>
      <symbol id="chev-l" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M15 5l-7 7 7 7" />
      </symbol>
      <symbol id="chev-r" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </symbol>
      <symbol id="plane" viewBox="0 0 24 24">
        <path fill="currentColor" d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z" />
      </symbol>
      <symbol id="whatsapp" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3 1 2.5c.1.2 1.7 2.6 4.1 3.6 1.5.7 2.1.7 2.9.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z" />
      </symbol>
    </svg>
  );
}
