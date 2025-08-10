
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
    } else if (!/^[a-zA-Z0-9._ ]+$/.test(userData.username)) {
        errors.username = 'Username can only contain letters, numbers, dots, underscores and white space'
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
