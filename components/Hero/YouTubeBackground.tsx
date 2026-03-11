'use client'

/**
 * Self-hosted video background for the hero section.
 * Uses a native <video> element for instant loading — no external API lag.
 */
export default function VideoBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
        src="/hero-bg.mp4"
      />
    </div>
  )
}
