/**
 * Class for managing landscape orientation lock
 */
class OrientationLock {
    constructor() {
        this.orientationLockElement = document.getElementById('orientation-lock');
        this.appElement = document.getElementById('app');
        this.isLocked = false;
    }

    /**
     * Check device orientation and show message if needed
     */
    checkOrientation() {
        if (this.isMobileDevice() && this.isLandscapeOrientation()) {
            this.showOrientationLock();
        } else {
            this.hideOrientationLock();
        }
    }

    /**
     * Check if device is mobile
     * @returns {boolean}
     */
    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               window.innerWidth <= 768;
    }

    /**
     * Check if orientation is landscape
     * @returns {boolean}
     */
    isLandscapeOrientation() {
        // Check by screen dimensions
        const isLandscapeByDimensions = window.innerWidth > window.innerHeight;
        
        // Check by orientation API (if available)
        let isLandscapeByAPI = false;
        if (screen.orientation) {
            isLandscapeByAPI = screen.orientation.angle === 90 || screen.orientation.angle === -90;
        } else if (window.orientation !== undefined) {
            isLandscapeByAPI = Math.abs(window.orientation) === 90;
        }

        // Prioritize orientation API if available
        return screen.orientation || window.orientation !== undefined ? 
               isLandscapeByAPI : isLandscapeByDimensions;
    }

    /**
     * Show orientation change message
     */
    showOrientationLock() {
        if (!this.isLocked) {
            this.isLocked = true;
            this.orientationLockElement.style.display = 'flex';
            this.appElement.style.display = 'none';
            
            // Add animation class
            this.orientationLockElement.classList.add('active');
        }
    }

    /**
     * Hide orientation change message
     */
    hideOrientationLock() {
        if (this.isLocked) {
            this.isLocked = false;
            this.orientationLockElement.style.display = 'none';
            this.appElement.style.display = 'block';
            
            // Remove animation class
            this.orientationLockElement.classList.remove('active');
        }
    }

    /**
     * Get current lock state
     * @returns {boolean}
     */
    getIsLocked() {
        return this.isLocked;
    }
}

export default OrientationLock; 