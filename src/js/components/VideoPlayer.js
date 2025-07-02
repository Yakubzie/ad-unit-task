import { gsap } from 'gsap';

/**
 * Class for managing video player
 */
class VideoPlayer {
    constructor(eventTracker) {
        this.eventTracker = eventTracker;
        this.videoElement = document.getElementById('product-video');
        this.videoContainer = document.querySelector('.video-container');
        this.currentPosition = null;
        this.isPlaying = false;
        
        this.init();
    }

    /**
     * Initialize the player
     */
    init() {
        if (!this.videoElement || !this.videoContainer) {
            console.error('Video elements not found');
            return;
        }

        // Set initial position
        gsap.set(this.videoContainer, {
            opacity: 0,
            scale: 0.8
        });

        // Add event listeners
        this.setupEventListeners();
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        this.videoElement.addEventListener('play', () => {
            this.isPlaying = true;
        });

        this.videoElement.addEventListener('pause', () => {
            this.isPlaying = false;
        });

        // Update position when screen size changes
        window.addEventListener('resize', () => {
            if (this.currentPosition) {
                this.positionVideo(this.currentPosition, false);
            }
        });
    }

    /**
     * Position video container on the screen.
     *
     * @param {number} slideIndex - Slide index (1-4).
     * @param {boolean} [animate=true] - Whether to animate the movement (true) or set instantly (false).
     */
    positionVideo(slideIndex, animate = true) {
        this.currentPosition = slideIndex;

        // Determine target CSS properties based on slide index
        let position = {};

        // Responsive margins - smaller margins on mobile for better visibility
        const isMobile = window.innerWidth <= 768;
        const margin = isMobile ? '8%' : '10%';

        switch (slideIndex) {
            case 1: // Top-left
                position = { top: margin, left: margin, right: 'auto', bottom: 'auto', transform: 'translate(0, 0)' };
                break;
            case 2: // Top-right
                position = { top: margin, right: margin, left: 'auto', bottom: 'auto', transform: 'translate(0, 0)' };
                break;
            case 3: // Bottom-left
                position = { bottom: margin, left: margin, top: 'auto', right: 'auto', transform: 'translate(0, 0)' };
                break;
            case 4: // Bottom-right
                position = { bottom: margin, right: margin, top: 'auto', left: 'auto', transform: 'translate(0, 0)' };
                break;
            default: // Center (fallback)
                position = { top: '50%', left: '50%', right: 'auto', bottom: 'auto', transform: 'translate(-50%, -50%)' };
        }

        if (animate) {
            // Smooth transition to the new position
            gsap.to(this.videoContainer, {
                ...position,
                duration: 0.8,
                ease: 'power2.out'
            });
        } else {
            // Instantly place the video container (no sliding)
            gsap.set(this.videoContainer, position);
        }
    }

    /**
     * Reveal the player (fade/scale) without sliding it across the screen.
     *
     * @param {number} [slideIndex=1] - Target position reference (1-4).
     * @returns {Promise<void>}
     */
    show(slideIndex = 1) {
        return new Promise((resolve) => {
            // Place the container instantly at the desired location
            this.positionVideo(slideIndex, /* animate */ false);

            // Fade/scale in
            gsap.to(this.videoContainer, {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: 'back.out(1.7)',
                onComplete: () => {
                    this.play();
                    resolve();
                }
            });
        });
    }

    /**
     * Hide player with animation
     * @returns {Promise}
     */
    hide() {
        return new Promise((resolve) => {
            this.pause();
            
            gsap.to(this.videoContainer, {
                opacity: 0,
                scale: 0.8,
                duration: 0.4,
                ease: 'power2.in',
                onComplete: resolve
            });
        });
    }

    /**
     * Start video playback
     */
    play() {
        if (this.videoElement) {
            this.videoElement.play().catch(console.error);
        }
    }

    /**
     * Pause video playback
     */
    pause() {
        if (this.videoElement) {
            this.videoElement.pause();
        }
    }

    getCurrentPosition() {
        return this.currentPosition;
    }

    getIsPlaying() {
        return this.isPlaying;
    }
}

export default VideoPlayer; 