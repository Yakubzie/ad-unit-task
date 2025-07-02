import { gsap } from 'gsap';
import Gallery from '../components/Gallery.js';

/**
 * Gallery scene - main scene with product gallery and CTA button
 */
class GalleryScene {
    constructor(eventTracker, sceneManager) {
        this.name = 'gallery';
        this.eventTracker = eventTracker;
        this.sceneManager = sceneManager;
        this.element = document.getElementById('gallery-scene');
        this.isVisible = false;
        this.gallery = null;
        this.ctaButton = null;
        this.ctaPulseAnimation = null;
        
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

        // Initialize gallery
        this.gallery = new Gallery(this.eventTracker, this.sceneManager);

        // Find CTA button
        this.ctaButton = this.element.querySelector('.cta-button');
        
        if (this.ctaButton) {
            // Set initial CTA position
            gsap.set(this.ctaButton, { 
                opacity: 0, 
                scale: 1,
                y: 50 
            });

            // Add event listener to CTA
            this.ctaButton.addEventListener('click', () => {
                this.handleCtaClick();
            });
            
            // Add hover effects via GSAP - only Y position
            this.ctaButton.addEventListener('mouseenter', () => {
                gsap.to(this.ctaButton, {
                    y: -5,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });
            
            this.ctaButton.addEventListener('mouseleave', () => {
                gsap.to(this.ctaButton, {
                    y: 0,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });
        }

        // Set initial positions of gallery elements
        const galleryContainer = this.element.querySelector('.gallery-container');
        if (galleryContainer) {
            gsap.set(galleryContainer, { 
                opacity: 0, 
                y: 30 
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
            
            // Set initial position for slide-in effect
            gsap.set(this.element, { 
                display: 'block',
                y: 100,
                opacity: 0
            });
            
            // Entry animation timeline with vertical slide
            const tl = gsap.timeline({
                onComplete: () => {
                    this.startCtaPulse();
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

            // Gallery animation
            tl.to(this.element.querySelector('.gallery-container'), {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out'
            }, '-=0.4');

            // CTA animation
            tl.to(this.ctaButton, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5,
                ease: 'back.out(1.7)'
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
            
            // Stop CTA animation
            this.stopCtaPulse();

            // Exit animation with vertical slide
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set(this.element, { display: 'none' });
                    resolve();
                }
            });

            // Hide elements animation
            tl.to([this.element.querySelector('.gallery-container'), this.ctaButton], {
                opacity: 0,
                y: -30,
                duration: 0.4,
                ease: 'power2.in'
            });

            // Background hide animation with slide
            tl.to(this.element, {
                opacity: 0,
                y: -100,
                duration: 0.6,
                ease: 'power2.in'
            }, '-=0.2');
        });
    }

    /**
     * Start CTA pulsing animation
     */
    startCtaPulse() {
        if (this.ctaButton && !this.ctaPulseAnimation) {
            // Very subtle pulsing
            this.ctaPulseAnimation = gsap.to(this.ctaButton, {
                scale: 1.08,
                duration: 1.5,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut',
                transformOrigin: 'center center'
            });
        }
    }

    /**
     * Stop CTA pulsing animation
     */
    stopCtaPulse() {
        if (this.ctaPulseAnimation) {
            this.ctaPulseAnimation.kill();
            this.ctaPulseAnimation = null;
            
            // Reset only scale - Y position can be controlled by hover
            gsap.set(this.ctaButton, { 
                scale: 1
            });
        }
    }

    /**
     * Handle CTA button click
     */
    handleCtaClick() {
        // Track event
        this.eventTracker.track('user_interaction:cta_click');

        // Click animation
        gsap.to(this.ctaButton, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });

        // Transition to video scene
        setTimeout(() => {
            this.sceneManager.showScene('video');
        }, 200);
    }

    /**
     * Get gallery instance
     * @returns {Gallery}
     */
    getGallery() {
        return this.gallery;
    }

    /**
     * Check if scene is visible
     * @returns {boolean}
     */
    getIsVisible() {
        return this.isVisible;
    }
}

export default GalleryScene; 