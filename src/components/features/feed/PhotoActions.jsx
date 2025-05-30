/**
 * PHOTO ACTIONS COMPONENT
 * Purpose: Handle photo interaction buttons
 * Responsibilities:
 * - Display like, comment, share, save buttons
 * - Handle button interactions
 * - Show proper visual states
 * - Optimize button performance
 */

import {Bookmark, Heart, MessageCircle, Send} from 'lucide-react'

const PhotoActions = ({
                          isLiked,
                          onLike,
                          onComment,
                          onShare,
                          onSave
                      }) => {
    /**
     * Handle like with animation
     */
    const handleLike = () => {
        onLike()

        // TODO: Add like animation
        // Could trigger CSS animation or React Spring
    }

    return (
        <div className="photo-actions">
            <div className="action-buttons">
                {/* Like Button */}
                <button
                    className={`action-btn like-btn ${isLiked ? 'liked' : ''}`}
                    onClick={handleLike}
                    aria-label={isLiked ? 'Unlike photo' : 'Like photo'}
                    aria-pressed={isLiked}
                >
                    <Heart
                        size={24}
                        fill={isLiked ? 'currentColor' : 'none'}
                        className="heart-icon"
                    />
                </button>

                {/* Comment Button */}
                <button
                    className="action-btn comment-btn"
                    onClick={onComment}
                    aria-label="View comments"
                >
                    <MessageCircle size={24}/>
                </button>

                {/* Share Button */}
                <button
                    className="action-btn share-btn"
                    onClick={onShare}
                    aria-label="Share photo"
                >
                    <Send size={24}/>
                </button>

                {/* Save Button */}
                <button
                    className="action-btn save-btn"
                    onClick={onSave}
                    aria-label="Save photo"
                >
                    <Bookmark size={24}/>
                </button>
            </div>
        </div>
    )
}

export default PhotoActions