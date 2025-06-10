/**
 * IMAGE UPLOAD HOOK - ENHANCED
 * Purpose: Handle image selection, validation, and preview
 * Responsibilities:
 * - File validation and error handling
 * - Preview URL management
 * - Memory cleanup
 */

import { useState, useCallback, useEffect } from 'react'

export const useImageUpload = (options = {}) => {
    const {
        maxSize = 10 * 1024 * 1024, // 10MB default
        allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        onError,
        onSuccess,
        initialFile = null,
        initialPreview = null
    } = options

    const [selectedFile, setSelectedFile] = useState(initialFile)
    const [previewUrl, setPreviewUrl] = useState(initialPreview)
    const [isValidating, setIsValidating] = useState(false)

    /**
     * Cleanup preview URL on unmount
     */
    useEffect(() => {
        return () => {
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl)
            }
        }
    }, [])

    /**
     * Validate uploaded file
     */
    const validateFile = useCallback((file) => {
        if (!file) {
            return 'No file selected'
        }

        if (!allowedTypes.includes(file.type)) {
            return 'Invalid file type. Please select a valid image.'
        }

        if (file.size > maxSize) {
            const maxSizeMB = Math.round(maxSize / (1024 * 1024))
            return `File size must be less than ${maxSizeMB}MB`
        }

        // Additional validation for corrupted files
        if (file.size === 0) {
            return 'Selected file appears to be corrupted'
        }

        return null
    }, [maxSize, allowedTypes])

    /**
     * Handle file selection with validation
     */
    const handleFileSelect = useCallback(async (file) => {
        if (!file) return false

        setIsValidating(true)

        try {
            const validationError = validateFile(file)

            if (validationError) {
                if (onError) onError(validationError)
                return false
            }

            // Clean up previous preview
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl)
            }

            // Create new preview
            const newPreviewUrl = URL.createObjectURL(file)

            // Verify image can be loaded
            const img = new Image()
            img.onload = () => {
                setSelectedFile(file)
                setPreviewUrl(newPreviewUrl)
                if (onSuccess) onSuccess(file, newPreviewUrl)
            }
            img.onerror = () => {
                URL.revokeObjectURL(newPreviewUrl)
                if (onError) onError('Invalid or corrupted image file')
            }
            img.src = newPreviewUrl

            return true

        } catch (error) {
            console.error('File selection error:', error)
            if (onError) onError('Failed to process selected file')
            return false
        } finally {
            setIsValidating(false)
        }
    }, [validateFile, previewUrl, onError, onSuccess])

    /**
     * Clear selected file and preview
     */
    const clearFile = useCallback(() => {
        if (previewUrl && previewUrl.startsWith('blob:')) {
            URL.revokeObjectURL(previewUrl)
        }
        setSelectedFile(null)
        setPreviewUrl(null)
    }, [previewUrl])

    /**
     * Handle file input change
     */
    const handleInputChange = useCallback((event) => {
        const file = event.target.files[0]
        return handleFileSelect(file)
    }, [handleFileSelect])

    /**
     * Handle drag and drop
     */
    const handleDrop = useCallback((event) => {
        event.preventDefault()
        const file = event.dataTransfer.files[0]
        return handleFileSelect(file)
    }, [handleFileSelect])

    /**
     * Handle paste event (bonus feature)
     */
    const handlePaste = useCallback((event) => {
        const items = event.clipboardData?.items
        if (!items) return false

        for (const item of items) {
            if (item.type.startsWith('image/')) {
                const file = item.getAsFile()
                if (file) {
                    return handleFileSelect(file)
                }
            }
        }
        return false
    }, [handleFileSelect])

    return {
        selectedFile,
        previewUrl,
        isValidating,
        handleInputChange,
        handleDrop,
        handlePaste,
        handleFileSelect,
        clearFile,
        validateFile
    }
}