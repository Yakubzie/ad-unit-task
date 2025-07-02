// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

// Import styles
import '../scss/main.scss';

// Import classes and components
import SceneManager from './SceneManager.js';
import EventTracker from './utils/EventTracker.js';
import OrientationLock from './components/OrientationLock.js';

/**
 * Main application class
 */
class AdUnitApp {
    constructor() {
        this.eventTracker = null;
        this.sceneManager = null;
        this.orientationLock = null;
        
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        // Track page load event
        this.eventTracker = new EventTracker();
        this.eventTracker.track('ad_load');

        // Initialize components
        this.orientationLock = new OrientationLock();
        this.sceneManager = new SceneManager(this.eventTracker);

        // Setup event listeners
        this.setupEventListeners();

        // Check orientation on startup
        this.orientationLock.checkOrientation();
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Track window resize
        window.addEventListener('resize', () => {
            this.eventTracker.track('window_resize');
            this.orientationLock.checkOrientation();
        });

        // Track page visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.eventTracker.track('page_hide');
            }
        });

        // Alternative page hide tracking
        window.addEventListener('beforeunload', () => {
            this.eventTracker.track('page_hide');
        });

        // Track orientation changes
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.orientationLock.checkOrientation();
            }, 100);
        });
    }
}

// Initialize application after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdUnitApp();
}); 