'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    YT: typeof YT
    onYouTubeIframeAPIReady: () => void
  }
}

interface YouTubeBackgroundProps {
  videoId: string
}

/**
 * YouTube background video component for fullscreen hero section.
 * Loads YouTube IFrame API dynamically and creates a muted, looping, autoplaying video
 * that covers the entire container without letterboxing.
 */
export default function YouTubeBackground({ videoId }: YouTubeBackgroundProps) {
  const playerRef = useRef<YT.Player | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Resize handler for cover behavior (video fills container, no letterboxing)
    const resizePlayer = () => {
      const container = containerRef.current
      if (!container || !playerRef.current?.getIframe) return

      const containerWidth = container.offsetWidth
      const containerHeight = container.offsetHeight
      const aspectRatio = 16 / 9

      let width: number
      let height: number

      // Calculate dimensions to cover container while maintaining 16:9 aspect ratio
      if (containerWidth / containerHeight > aspectRatio) {
        // Container is wider than video aspect ratio
        width = containerWidth
        height = containerWidth / aspectRatio
      } else {
        // Container is taller than video aspect ratio
        width = containerHeight * aspectRatio
        height = containerHeight
      }

      const iframe = playerRef.current.getIframe()
      iframe.style.width = `${width}px`
      iframe.style.height = `${height}px`
    }

    // Initialize player when YouTube API is ready
    const initPlayer = () => {
      playerRef.current = new window.YT.Player('youtube-background', {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          mute: 1,
          loop: 1,
          playlist: videoId, // Required for loop to work
          rel: 0,
          disablekb: 1,
          iv_load_policy: 3, // Hide annotations
          playsinline: 1, // Inline on iOS
          enablejsapi: 1,
          origin: typeof window !== 'undefined' ? window.location.origin : ''
        },
        events: {
          onReady: (event) => {
            event.target.playVideo()
            resizePlayer()
          },
          onStateChange: (event) => {
            // Restart if ended (backup for loop)
            if (event.data === window.YT.PlayerState.ENDED) {
              playerRef.current?.playVideo()
            }
          }
        }
      })
    }

    // Load YouTube IFrame API script if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

      // Set callback for when API is ready
      window.onYouTubeIframeAPIReady = initPlayer
    } else if (window.YT?.Player) {
      // API already loaded, initialize player directly
      initPlayer()
    }

    // Add resize listener
    window.addEventListener('resize', resizePlayer)

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizePlayer)
      // Note: Don't destroy player here as it causes issues with strict mode double-mount
    }
  }, [videoId])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div
        id="youtube-background"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />
    </div>
  )
}
