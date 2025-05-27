/**
 * UTILITY FUNCTIONS
 * Purpose: Provide reusable helper functions
 * Responsibilities:
 * - Date/time formatting
 * - Number formatting
 * - Text processing
 * - Data validation
 * - No business logic or API calls
 */

/**
 * Format relative time (e.g., "2h ago", "3 days ago")
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted relative time
 */
export const formatRelativeTime = (date) => {
    try {
        const now = new Date()
        const targetDate = new Date(date)
        const diffInSeconds = Math.floor((now - targetDate) / 1000)

        // Less than a minute
        if (diffInSeconds < 60) {
            return 'now'
        }

        // Less than an hour
        if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60)
            return `${minutes}m`
        }

        // Less than a day
        if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600)
            return `${hours}h`
        }

        // Less than a week
        if (diffInSeconds < 604800) {
            const days = Math.floor(diffInSeconds / 86400)
            return `${days}d`
        }

        // Less than a month
        if (diffInSeconds < 2592000) {
            const weeks = Math.floor(diffInSeconds / 604800)
            return `${weeks}w`
        }

        // Format as date
        return targetDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        })

    } catch (error) {
        console.error('Error formatting relative time:', error)
        return 'unknown'
    }
}

/**
 * Format large numbers (e.g., 1.2K, 1.5M)
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
    if (typeof num !== 'number' || isNaN(num)) {
        return '0'
    }

    if (num < 1000) {
        return num.toString()
    }

    if (num < 1000000) {
        const formatted = (num / 1000).toFixed(1)
        return formatted.endsWith('.0')
            ? `${Math.floor(num / 1000)}K`
            : `${formatted}K`
    }

    if (num < 1000000000) {
        const formatted = (num / 1000000).toFixed(1)
        return formatted.endsWith('.0')
            ? `${Math.floor(num / 1000000)}M`
            : `${formatted}M`
    }

    const formatted = (num / 1000000000).toFixed(1)
    return formatted.endsWith('.0')
        ? `${Math.floor(num / 1000000000)}B`
        : `${formatted}B`
}

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
    if (!text || typeof text !== 'string') {
        return ''
    }

    if (text.length <= maxLength) {
        return text
    }

    return text.substring(0, maxLength).trim() + '...'
}

/**
 * Parse hashtags from text
 * @param {string} text - Text to parse
 * @returns {string[]} Array of hashtags
 */
export const parseHashtags = (text) => {
    if (!text || typeof text !== 'string') {
        return []
    }

    const hashtags = text.match(/#\w+/g) || []
    return hashtags.map(tag => tag.substring(1).toLowerCase())
}

/**
 * Parse user mentions from text
 * @param {string} text - Text to parse
 * @returns {string[]} Array of usernames
 */
export const parseMentions = (text) => {
    if (!text || typeof text !== 'string') {
        return []
    }

    const mentions = text.match(/@\w+/g) || []
    return mentions.map(mention => mention.substring(1).toLowerCase())
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
    if (!email || typeof email !== 'string') {
        return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

/**
 * Validate username format
 * @param {string} username - Username to validate
 * @returns {boolean} True if valid
 */
export const isValidUsername = (username) => {
    if (!username || typeof username !== 'string') {
        return false
    }

    // 3-30 characters, letters, numbers, dots, underscores
    const usernameRegex = /^[a-zA-Z0-9._]{3,30}$/
    return usernameRegex.test(username)
}

/**
 * Generate random ID
 * @returns {string} Random ID
 */
export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

/**
 * Throttle function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit) => {
    let inThrottle
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args)
            inThrottle = true
            setTimeout(() => inThrottle = false, limit)
        }
    }
}

/**
 * Check if value is empty
 * @param {any} value - Value to check
 * @returns {boolean} True if empty
 */
export const isEmpty = (value) => {
    if (value === null || value === undefined) return true
    if (typeof value === 'string') return value.trim() === ''
    if (Array.isArray(value)) return value.length === 0
    if (typeof value === 'object') return Object.keys(value).length === 0
    return false
}

/**
 * Deep clone object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export const deepClone = (obj) => {
    if (obj === null || typeof obj !== 'object') return obj
    if (obj instanceof Date) return new Date(obj.getTime())
    if (obj instanceof Array) return obj.map(item => deepClone(item))
    if (typeof obj === 'object') {
        const clonedObj = {}
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key])
            }
        }
        return clonedObj
    }
}