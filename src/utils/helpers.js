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

export const validateCredentials = (credentials) => {
    const errors = {}

    if (!credentials.email?.trim()) {
        errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
        errors.email = 'Please enter a valid email address'
    }

    if (!credentials.password) {
        errors.password = 'Password is required'
    } else if (credentials.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long'
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}

export const validateRegistration = (userData) => {
    const errors = {}

    if (!userData.username?.trim()) {
        errors.username = 'Username is required'
    } else if (userData.username.length < 3) {
        errors.username = 'Username must be at least 3 characters long'
    } else if (!/^[a-zA-Z0-9._]+$/.test(userData.username)) {
        errors.username = 'Username can only contain letters, numbers, dots and underscores'
    }

    if (!userData.email?.trim()) {
        errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
        errors.email = 'Please enter a valid email address'
    }

    if (!userData.password) {
        errors.password = 'Password is required'
    } else if (userData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long'
    }

    if (!userData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password'
    } else if (userData.password !== userData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match'
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}
