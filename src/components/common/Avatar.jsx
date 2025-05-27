/**
 * AVATAR COMPONENT
 * Purpose: Display user avatar with fallback
 * Responsibilities:
 * - Show user profile image or fallback
 * - Handle different sizes
 * - Support click interactions
 * - Handle loading states
 */

import { useState } from 'react'
import './Avatar.css'

const Avatar = ({
                    src,
                    alt,
                    fallback,
                    size = 'medium',
                    onClick,
                    className = '',
                    ...props
                }) => {
    const [imageError, setImageError] = useState(false)
    const [imageLoading, setImageLoading] = useState(true)

    /**
     * Handle image load error
     */
    const handleImageError = () => {
        setImageError(true)
        setImageLoading(false)
    }

    /**
     * Handle image load success
     */
    const handleImageLoad = () => {
        setImageLoading(false)
        setImageError(false)
    }

    /**
     * Get size class
     */
    const getSizeClass = () => {
        const sizeClasses = {
            small: 'avatar-sm',
            medium: 'avatar-md',
            large: 'avatar-lg',
            xlarge: 'avatar-xl'
        }
        return sizeClasses[size] || sizeClasses.medium
    }

    /**
     * Generate fallback text
     */
    const getFallbackText = () => {
        if (fallback) return fallback
        if (alt) return alt.charAt(0).toUpperCase()
        return '?'
    }

    const handleClick = onClick ? { onClick } : {}
    const cursor = onClick ? 'pointer' : 'default'

    const avatarClasses = [
        'avatar',
        getSizeClass(),
        onClick ? 'avatar-clickable' : '',
        className
    ].filter(Boolean).join(' ')

    return (
        <div
            className={avatarClasses}
            style={{ cursor }}
            {...handleClick}
            {...props}
        >
            {src && !imageError ? (
                <>
                    {imageLoading && (
                        <div className="avatar-skeleton" />
                    )}
                    <img
                        src={src}
                        alt={alt || 'Avatar'}
                        className={`avatar-image ${imageLoading ? 'loading' : ''}`}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                    />
                </>
            ) : (
                <div className="avatar-fallback">
                    {getFallbackText()}
                </div>
            )}
        </div>
    )
}

export default Avatar