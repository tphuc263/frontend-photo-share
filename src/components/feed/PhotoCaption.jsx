/**
 * PHOTO CAPTION COMPONENT
 * Purpose: Display photo caption with hashtags
 * Responsibilities:
 * - Render caption text
 * - Handle hashtag links
 * - Support text expansion/collapse
 * - Handle user mention links
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'

const PhotoCaption = ({
                          username,
                          caption,
                          tags,
                          userId
                      }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const MAX_CAPTION_LENGTH = 100

    /**
     * Check if caption needs truncation
     */
    const needsTruncation = caption && caption.length > MAX_CAPTION_LENGTH

    /**
     * Get display caption based on expansion state
     */
    const getDisplayCaption = () => {
        if (!caption) return ''

        if (needsTruncation && !isExpanded) {
            return caption.substring(0, MAX_CAPTION_LENGTH) + '...'
        }

        return caption
    }

    /**
     * Parse caption text and convert hashtags/mentions to links
     */
    const parseCaption = (text) => {
        if (!text) return text

        // Split by hashtags and mentions
        const parts = text.split(/(\#\w+|\@\w+)/g)

        return parts.map((part, index) => {
            if (part.startsWith('#')) {
                // Hashtag link
                const tag = part.substring(1)
                return (
                    <Link
                        key={index}
                        to={`/explore/tags/${tag}`}
                        className="caption-hashtag"
                    >
                        {part}
                    </Link>
                )
            } else if (part.startsWith('@')) {
                // User mention link
                const username = part.substring(1)
                return (
                    <Link
                        key={index}
                        to={`/profile/${username}`}
                        className="caption-mention"
                    >
                        {part}
                    </Link>
                )
            } else {
                return part
            }
        })
    }

    /**
     * Handle see more/less toggle
     */
    const handleToggleExpand = () => {
        setIsExpanded(prev => !prev)
    }

    return (
        <div className="photo-caption">
            {/* Caption text */}
            <div className="caption-content">
                <Link
                    to={`/profile/${userId}`}
                    className="caption-username"
                >
                    {username}
                </Link>
                <span className="caption-text">
                    {parseCaption(getDisplayCaption())}
                </span>

                {/* See more/less button */}
                {needsTruncation && (
                    <button
                        className="caption-toggle"
                        onClick={handleToggleExpand}
                    >
                        {isExpanded ? 'less' : 'more'}
                    </button>
                )}
            </div>

            {/* Tags from backend */}
            {tags && tags.length > 0 && (
                <div className="caption-tags">
                    {tags.map((tag, index) => (
                        <Link
                            key={index}
                            to={`/explore/tags/${tag}`}
                            className="caption-tag"
                        >
                            #{tag}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default PhotoCaption