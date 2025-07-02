import { Swiper } from 'swiper';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';

/**
 * Class for managing product gallery using Swiper.js
 */
class Gallery {
    constructor(eventTracker, sceneManager) {
        this.eventTracker = eventTracker;
        this.sceneManager = sceneManager;
        this.swiper = null;
        this.swiperContainer = document.querySelector('.gallery-swiper');
        
        this.init();
    }

    /**
     * Initialize gallery
     */
    init() {
        if (!this.swiperContainer) {
            console.error('Gallery container not found');
            return;
        }

        // Swiper configuration
        this.swiper = new Swiper(this.swiperContainer, {
            modules: [Navigation, Pagination, EffectCoverflow, Autoplay],
            
            // Coverflow effect for better appearance
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 30,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            
            // Basic settings
            slidesPerView: 1.5,
            spaceBetween: 20,
            centeredSlides: true,
            loop: true,
            
            // Autoplay settings
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                waitForTransition: true,
            },
            
            // Smooth transition settings
            speed: 600,
            
            // Smoother scrolling and animations
            touchRatio: 1.2, // more sensitive
            touchAngle: 60, // larger angle
            grabCursor: true, // grab cursor effect on desktop
            
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
            // Pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            
            // Responsive settings
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                480: {
                    slidesPerView: 1.2,
                    spaceBetween: 15
                },
                768: {
                    slidesPerView: 1.5,
                    spaceBetween: 20
                }
            },

            // Callback events
            on: {
                init: () => {
                    this.onSwiperInit();
                },
                slideChange: () => {
                    this.onSlideChange();
                },
                tap: (swiper, event) => {
                    this.onSlideClick(swiper, event);
                }
            }
        });
    }

    /**
     * Callback called after Swiper initialization
     */
    onSwiperInit() {
        // Add event listeners to slides
        this.addSlideClickListeners();
    }

    /**
     * Callback called on slide change
     */
    onSlideChange() {
        if (this.swiper) {
            const activeIndex = this.swiper.realIndex;
            // We can add additional actions on slide change
        }
    }

    /**
     * Add event listeners for slide clicks
     */
    addSlideClickListeners() {
        const slides = this.swiperContainer.querySelectorAll('.swiper-slide');
        
        slides.forEach((slide, index) => {
            slide.addEventListener('click', (event) => {
                const slideIndex = parseInt(slide.getAttribute('data-slide'));
                this.handleSlideClick(slideIndex, event);
            });
        });
    }

    /**
     * Handle slide click
     * @param {number} slideIndex - Index of clicked slide
     * @param {Event} event - Click event
     */
    handleSlideClick(slideIndex, event) {
        // Track event
        this.eventTracker.track(`user_interaction:slide_click:${slideIndex}`);
        
        // Transition to video scene with clicked slide info
        this.sceneManager.showScene('video', { 
            clickedSlide: slideIndex 
        });
    }

    /**
     * Handle slide click (alternative method)
     * @param {Object} swiper - Swiper instance
     * @param {Event} event - Tap event
     */
    onSlideClick(swiper, event) {
        const clickedSlide = event.target.closest('.swiper-slide');
        if (clickedSlide) {
            const slideIndex = parseInt(clickedSlide.getAttribute('data-slide'));
            if (slideIndex) {
                this.handleSlideClick(slideIndex, event);
            }
        }
    }

    /**
     * Go to specific slide
     * @param {number} index - Slide index
     */
    slideTo(index) {
        if (this.swiper) {
            this.swiper.slideTo(index);
        }
    }

    /**
     * Get current slide index
     * @returns {number}
     */
    getActiveIndex() {
        return this.swiper ? this.swiper.realIndex : 0;
    }

    /**
     * Destroy Swiper instance
     */
    destroy() {
        if (this.swiper) {
            this.swiper.destroy(true, true);
            this.swiper = null;
        }
    }

    /**
     * Update Swiper (useful for DOM changes)
     */
    update() {
        if (this.swiper) {
            this.swiper.update();
        }
    }
}

export default Gallery; 