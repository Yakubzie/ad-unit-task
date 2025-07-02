import { gsap } from 'gsap';
import VideoPlayer from '../components/VideoPlayer.js';

/**
 * Video scene - contains video player positioned in different corners
 */
class VideoScene {
    constructor(eventTracker, sceneManager) {
        this.name = 'video';
        this.eventTracker = eventTracker;
        this.sceneManager = sceneManager;
        this.element = document.getElementById('video-scene');
        this.isVisible = false;
        this.videoPlayer = null;
        this.currentSlideIndex = 1;
        
        this.init();
    }

    /**
     * Initialize the scene
     */
    init() {
        // Set initial position
        gsap.set(this.element, { 
            display: 'none',
            opacity: 0 
        });

        // Initialize video player
        this.videoPlayer = new VideoPlayer(this.eventTracker);
    }

    /**
     * Show scene with animation
     * @param {Object} options - Display options (clickedSlide)
     * @returns {Promise}
     */
    show(options = {}) {
        return new Promise((resolve) => {
            this.isVisible = true;
            this.currentSlideIndex = options.clickedSlide || 1;
            
            // Set initial position for slide-in effect
            gsap.set(this.element, { 
                display: 'block',
                y: 100,
                opacity: 0
            });
            
            // Entry animation timeline with vertical slide
            const tl = gsap.timeline({
                onComplete: () => {
                    resolve();
                }
            });

            // Background animation with slide
            tl.to(this.element, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out'
            });

            // Show video player with appropriate position
            tl.add(() => {
                this.videoPlayer.show(this.currentSlideIndex);
            }, '-=0.3');
        });
    }

    /**
     * Hide scene with animation
     * @returns {Promise}
     */
    hide() {
        return new Promise((resolve) => {
            this.isVisible = false;
            
            // Hide video player
            this.videoPlayer.hide().then(() => {
                // Background hide animation with slide
                gsap.to(this.element, {
                    opacity: 0,
                    y: -100,
                    duration: 0.6,
                    ease: 'power2.in',
                    onComplete: () => {
                        gsap.set(this.element, { display: 'none' });
                        resolve();
                    }
                });
            });
        });
    }

    /**
     * Change video position based on slide index
     * @param {number} slideIndex - Slide index (1-4)
     */
    changeVideoPosition(slideIndex) {
        this.currentSlideIndex = slideIndex;
        if (this.videoPlayer) {
            this.videoPlayer.positionVideo(slideIndex);
        }
    }

    /**
     * Start video playback
     */
    playVideo() {
        if (this.videoPlayer) {
            this.videoPlayer.play();
        }
    }

    /**
     * Pause video playback
     */
    pauseVideo() {
        if (this.videoPlayer) {
            this.videoPlayer.pause();
        }
    }

    /**
     * Get video player instance
     * @returns {VideoPlayer}
     */
    getVideoPlayer() {
        return this.videoPlayer;
    }

    /**
     * Get current slide index
     * @returns {number}
     */
    getCurrentSlideIndex() {
        return this.currentSlideIndex;
    }

    /**
     * Check if scene is visible
     * @returns {boolean}
     */
    getIsVisible() {
        return this.isVisible;
    }
}

export default VideoScene; 