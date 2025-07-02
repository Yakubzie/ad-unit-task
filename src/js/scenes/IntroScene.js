import { gsap } from 'gsap';

/**
 * Intro scene - displayed at the beginning for 8 seconds
 */
class IntroScene {
    constructor(eventTracker, sceneManager) {
        this.name = 'intro';
        this.eventTracker = eventTracker;
        this.sceneManager = sceneManager;
        this.element = document.getElementById('intro-scene');
        this.isVisible = false;
        this.autoTransitionTimer = null;
        
        this.init();
    }

    /**
     * Initialize the scene
     */
    init() {
        // Set initial element positions
        gsap.set(this.element, { 
            display: 'none',
            opacity: 0 
        });

        // Internal element animations
        const headline = this.element.querySelector('.headline');
        
        if (headline) {
            gsap.set(headline, { 
                opacity: 0, 
                y: 50,
                scale: 0.8
            });
        }
    }

    /**
     * Show scene with animation
     * @returns {Promise}
     */
    show() {
        return new Promise((resolve) => {
            this.isVisible = true;
            
            // Show scene container
            gsap.set(this.element, { display: 'block' });

            const headlineEl = this.element.querySelector('.headline');

            // Timeline only for the one-off intro animations
            const tl = gsap.timeline({
                onComplete: () => {
                    // When the intro animations have finished, start the timer that automatically
                    // moves to the gallery scene after 8 seconds and resolve the promise so that
                    // SceneManager knows the scene is ready.
                    this.startAutoTransition();
                    resolve();
                }
            });

            // Fade in the scene background
            tl.to(this.element, {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
            });

            // Headline entrance
            tl.to(headlineEl, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'back.out(1.7)'
            }, '-=0.3');

            // Subtle infinite pulsing on the headline (run **outside** the timeline so that
            // the timeline can finish and the `onComplete` callback will fire).
            gsap.to(headlineEl, {
                scale: 1.05,
                duration: 2,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut',
                delay: tl.duration() // start once the intro timeline has finished
            });
        });
    }

    /**
     * Hide scene with animation
     * @returns {Promise}
     */
    hide() {
        return new Promise((resolve) => {
            this.isVisible = false;
            
            // Stop automatic transition
            this.stopAutoTransition();

            // Exit animation with vertical slide
            gsap.to(this.element, {
                opacity: 0,
                y: -100,
                duration: 0.8,
                ease: 'power2.inOut',
                onComplete: () => {
                    gsap.set(this.element, { display: 'none' });
                    resolve();
                }
            });
        });
    }

    /**
     * Start automatic transition to next scene after 8 seconds
     */
    startAutoTransition() {
        this.autoTransitionTimer = setTimeout(() => {
            if (this.isVisible) {
                this.sceneManager.showScene('gallery');
            }
        }, 8000); // 8 seconds
    }

    /**
     * Stop automatic transition
     */
    stopAutoTransition() {
        if (this.autoTransitionTimer) {
            clearTimeout(this.autoTransitionTimer);
            this.autoTransitionTimer = null;
        }
    }

    /**
     * Check if scene is visible
     * @returns {boolean}
     */
    getIsVisible() {
        return this.isVisible;
    }
}

export default IntroScene; 