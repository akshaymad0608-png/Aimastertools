import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const CLIENT_ID = 'ca-pub-4380996737976478';

export interface AdSlotProps {
  /** The ad unit id from the AdSense dashboard (data-ad-slot). */
  slot: string;
  /** AdSense format. 'auto' is responsive and the right default. */
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  /** Set false for a fixed-size unit; true lets the unit reflow with the column. */
  responsive?: boolean;
  /**
   * Height reserved before the ad loads, in px. Match this to the unit's real
   * height where you can — too small reintroduces the layout shift this exists
   * to prevent.
   */
  minHeight?: number;
  className?: string;
  /** Marks the unit as advertising for screen readers and for honest labelling. */
  label?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  slot,
  format = 'auto',
  responsive = true,
  minHeight = 280,
  className = '',
  label = 'Advertisement',
}) => {
  const insRef = useRef<HTMLModElement | null>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    if (!insRef.current) return;

    // Already filled by a previous mount of this same element.
    if (insRef.current.getAttribute('data-adsbygoogle-status')) {
      pushed.current = true;
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // Blocked, offline, or the script never arrived. Nothing to do — the
      // page is fully usable without the ad.
    }
  }, []);

  return (
    <div
      className={className}
      style={{ minHeight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      aria-label={label}
      role="complementary"
    >
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

export default AdSlot;
