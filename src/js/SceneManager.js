import { gsap } from 'gsap';
import IntroScene from './scenes/IntroScene.js';
import GalleryScene from './scenes/GalleryScene.js';
import VideoScene from './scenes/VideoScene.js';

/**
 * Class for managing application scenes
 */
class SceneManager {
    constructor(eventTracker) {
        this.eventTracker = eventTracker;
        this.currentScene = null;
        this.scenes = {};
        
        this.init();
    }

    /**
     * Initialize the scene manager
     */
    init() {
        // Initialize scenes
        this.scenes = {
            intro: new IntroScene(this.eventTracker, this),
            gallery: new GalleryScene(this.eventTracker, this),
            video: new VideoScene(this.eventTracker, this)
        };

        // Set the first scene
        this.showScene('intro');
    }

    /**
     * Show a specific scene
     * @param {string} sceneName - Name of the scene to show
     * @param {Object} options - Additional transition options
     */
    showScene(sceneName, options = {}) {
        if (!this.scenes[sceneName]) {
            console.error(`Scene ${sceneName} does not exist`);
            return;
        }

        const previousScene = this.currentScene;
        const newScene = this.scenes[sceneName];

        // Track scene change
        this.eventTracker.track(`scene_change:${sceneName}`);

        // Hide previous scene
        if (previousScene) {
            previousScene.hide().then(() => {
                // Show new scene
                this.currentScene = newScene;
                newScene.show(options);
            });
        } else {
            // First scene - show immediately
            this.currentScene = newScene;
            newScene.show(options);
        }
    }

    /**
     * Get current scene
     * @returns {Object} Current scene
     */
    getCurrentScene() {
        return this.currentScene;
    }

    /**
     * Get scene by name
     * @param {string} sceneName - Scene name
     * @returns {Object} Scene
     */
    getScene(sceneName) {
        return this.scenes[sceneName];
    }

    /**
     * Go to next scene in order
     */
    nextScene() {
        const sceneOrder = ['intro', 'gallery', 'video'];
        const currentIndex = sceneOrder.indexOf(this.currentScene?.name);
        
        if (currentIndex !== -1 && currentIndex < sceneOrder.length - 1) {
            this.showScene(sceneOrder[currentIndex + 1]);
        }
    }

    /**
     * Go to previous scene in order
     */
    previousScene() {
        const sceneOrder = ['intro', 'gallery', 'video'];
        const currentIndex = sceneOrder.indexOf(this.currentScene?.name);
        
        if (currentIndex > 0) {
            this.showScene(sceneOrder[currentIndex - 1]);
        }
    }
}

export default SceneManager; 