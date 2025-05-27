/**
 * PHOTO STATS COMPONENT
 * Purpose: Display photo engagement statistics
 * Responsibilities:
 * - Show likes count
 * - Handle likes modal opening
 * - Format numbers properly
 * - Handle click interactions
 */

import { formatNumber } from '../../utils/helpers'

const PhotoStats = ({
                        likesCount,
                        photoId
                    }) => {
    /**
     * Handle likes count click - show users who liked
     */
    const handleLikesClick = () => {
        // TODO: Open likes modal with list of users
        console.log('Show likes for photo:', photoId)
    }

    /**
     * Render likes count
     */
    const renderLikesCount = () => {
        if (likesCount === 0) {
            return null
        }

        const formattedCount = formatNumber(likesCount)
        const likesText = likesCount === 1 ? 'like' : 'likes'

        return (
            <button
                className="photo-stats-likes"
                onClick={handleLikesClick}
                aria-label={`View ${likesCount} ${likesText}`}
            >
                <strong>{formattedCount} {likesText}</strong>
            </button>
        )
    }

    return (
        <div className="photo-stats">
            {renderLikesCount()}
        </div>
    )
}

export default PhotoStats