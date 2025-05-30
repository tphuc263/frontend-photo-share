/**
 * PHOTO IMAGE COMPONENT
 * Purpose: Display the main photo with optimizations
 * Responsibilities:
 * - Render photo with proper aspect ratio
 * - Handle image loading states
 * - Optimize image performance
 * - Handle image interactions
 */

import {useState} from 'react'

const PhotoImage = ({
                        imageURL,
                        caption,
                        username
                    }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    /**
     * Handle image load success
     */
    const handleImageLoad = () => {
        setIsLoading(false)
    }

    /**
     * Handle image load error
     */
    const handleImageError = () => {
        setIsLoading(false)
        setHasError(true)
    }

    /**
     * Handle image click (could open lightbox)
     */
    const handleImageClick = () => {
        // TODO: Implement image lightbox or detail view
        console.log('Image clicked - could open lightbox')
    }

    return (
        <div className="photo-image-container">
            {/* Loading skeleton */}
            {isLoading && (
                <div className="photo-image-skeleton">
                    <div className="skeleton-shimmer"></div>
                </div>
            )}

            {/* Error state */}
            {hasError && (
                <div className="photo-image-error">
                    <span>Failed to load image</span>
                </div>
            )}

            {/* Main image */}
            {!hasError && (
                <img
                    src={imageURL}
                    alt={caption || `Photo by ${username}`}
                    className={`photo-image ${isLoading ? 'loading' : ''}`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    onClick={handleImageClick}
                    loading="lazy"
                    decoding="async"
                />
            )}
        </div>
    )
}

export default PhotoImage