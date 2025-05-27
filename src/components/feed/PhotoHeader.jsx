/**
 * PHOTO HEADER COMPONENT
 * Purpose: Display photo owner info and timestamp
 * Responsibilities:
 * - Show user avatar, username, and post time
 * - Handle user profile navigation
 * - Display relative time format
 */

import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { formatRelativeTime } from '../../utils/helpers'
import Avatar from '../common/Avatar'

const PhotoHeader = ({
                         username,
                         userImageUrl,
                         createdAt,
                         userId
                     }) => {
    /**
     * Handle more options menu
     */
    const handleMenuClick = () => {
        // TODO: Implement photo options menu
        console.log('Photo options menu clicked')
    }

    return (
        <header className="photo-header">
            {/* User Avatar */}
            <Link to={`/profile/${userId}`} className="photo-header-link">
                <Avatar
                    src={userImageUrl}
                    alt={`${username}'s avatar`}
                    fallback={username?.charAt(0)?.toUpperCase()}
                    size="small"
                />
            </Link>

            {/* User Info */}
            <div className="photo-user-info">
                <Link
                    to={`/profile/${userId}`}
                    className="photo-username"
                >
                    {username}
                </Link>
                <div className="photo-time">
                    {formatRelativeTime(createdAt)}
                </div>
            </div>

            {/* More Options */}
            <button
                className="photo-menu-btn"
                onClick={handleMenuClick}
                aria-label="More options"
            >
                <MoreHorizontal size={20} />
            </button>
        </header>
    )
}

export default PhotoHeader