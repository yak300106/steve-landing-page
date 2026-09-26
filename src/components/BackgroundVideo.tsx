import { useEffect, useRef } from 'react';

// Shared Google Flow video (https://flow.google.com/shared/video/e6f7db26-afdd-4a06-b7e4-1c2f2c99872b)
const VIDEO_URL = '/video.mp4';
const FALLBACK_VIDEO_URL =
  'https://flow-content.google/video/a6580068-1ac9-4095-838a-8ae0fc35137c?Expires=1790437475&KeyName=labs-flow-prod-cdn-key&Signature=AbvaC0rH1ZDLMVNTR-UP6Y_LqqA';
const SENSITIVITY = 1.25;

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const pendingSeekRef = useRef<boolean>(false);
  const isInitializedRef = useRef<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const performSeek = () => {
      if (!video) return;
      if (isSeekingRef.current) {
        pendingSeekRef.current = true;
        return;
      }
      isSeekingRef.current = true;
      try {
        video.currentTime = targetTimeRef.current;
      } catch {
        isSeekingRef.current = false;
      }
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (!video) return;

      if (
        pendingSeekRef.current ||
        Math.abs(video.currentTime - targetTimeRef.current) > 0.02
      ) {
        pendingSeekRef.current = false;
        performSeek();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!video.duration || isNaN(video.duration)) return;

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        if (!isInitializedRef.current) {
          isInitializedRef.current = true;
          // Map initial cursor entry position to head gaze
          const ratio = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
          targetTimeRef.current = ratio * video.duration;
          performSeek();
        }
        return;
      }

      const currentX = e.clientX;
      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      // Moving right (delta > 0) advances time towards right-facing gaze
      const timeOffset =
        (delta / window.innerWidth) * SENSITIVITY * video.duration;

      targetTimeRef.current = Math.min(
        Math.max(0, targetTimeRef.current + timeOffset),
        video.duration
      );

      performSeek();
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    // Touch support for mobile devices
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        prevXRef.current = e.touches[0].clientX;
        if (!isInitializedRef.current && video.duration && !isNaN(video.duration)) {
          isInitializedRef.current = true;
          const ratio = Math.max(0, Math.min(1, e.touches[0].clientX / window.innerWidth));
          targetTimeRef.current = ratio * video.duration;
          performSeek();
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const currentX = e.touches[0].clientX;

      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      if (!video.duration || isNaN(video.duration)) return;

      const timeOffset =
        (delta / window.innerWidth) * SENSITIVITY * video.duration;

      targetTimeRef.current = Math.min(
        Math.max(0, targetTimeRef.current + timeOffset),
        video.duration
      );

      performSeek();
    };

    const handleTouchEnd = () => {
      prevXRef.current = null;
    };

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        // Initialize at center gaze (around 50% of duration)
        if (targetTimeRef.current === 0 && !isInitializedRef.current) {
          targetTimeRef.current = video.duration * 0.5;
          performSeek();
        }
      }
    };

    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 w-full h-[100vh] min-h-[100vh] overflow-hidden pointer-events-none select-none bg-[#053e7a]"
      style={{
        width: '100%',
        height: '100vh',
        minHeight: '100vh',
        backgroundColor: '#053e7a',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <video
        ref={videoRef}
        src={VIDEO_URL}
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src !== FALLBACK_VIDEO_URL) {
            target.src = FALLBACK_VIDEO_URL;
            target.load();
          }
        }}
        muted
        playsInline
        preload="auto"
        className="hero-video-element pointer-events-none select-none"
      />
    </div>
  );
}
