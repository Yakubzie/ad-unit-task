/**
 * Class for tracking and logging application events
 */
class EventTracker {
    constructor() {
        this.events = [];
    }

    /**
     * Track an event and log it to console
     * @param {string} eventName - Event name
     * @param {Object} eventData - Additional event data
     */
    track(eventName, eventData = null) {
        const timestamp = new Date().toISOString();
        const event = {
            name: eventName,
            timestamp,
            data: eventData
        };

        this.events.push(event);
        
        // Log to console
        if (eventData) {
            console.log(`[${timestamp}] ${eventName}:`, eventData);
        } else {
            console.log(`[${timestamp}] ${eventName}`);
        }
    }

    /**
     * Get history of all events
     * @returns {Array} List of events
     */
    getEventHistory() {
        return [...this.events];
    }

    /**
     * Get events of specific type
     * @param {string} eventName - Event name
     * @returns {Array} List of events of given type
     */
    getEventsByType(eventName) {
        return this.events.filter(event => event.name === eventName);
    }

    /**
     * Clear event history
     */
    clearHistory() {
        this.events = [];
    }
}

export default EventTracker; 