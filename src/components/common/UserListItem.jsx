// src/components/common/UserListItem.jsx
import { Link } from 'react-router-dom'
import Avatar from './Avatar.jsx'
import { formatNumber } from '../../utils/helpers.js'
import '../../styles/components/UserListItem.css'

const UserListItem = ({
                          user,
                          onClick,
                          showFollowersCount = true,
                          showFollowingBadge = true,
                          showBio = false,
                          size = 'medium'
                      }) => {
    const handleClick = () => {
        if (onClick) onClick(user)
    }

    const content = (
        <div className={`user-list-item user-list-item-${size}`} onClick={handleClick}>
            <Avatar
                src={user.imageUrl}
                alt={`${user.username}'s avatar`}
                fallback={user.username?.charAt(0)?.toUpperCase()}
                size={size === 'large' ? 'large' : 'medium'}
            />

            <div className="user-info">
                <div className="username">{user.username}</div>

                {(user.firstName || user.lastName) && (
                    <div className="fullname">
                        {user.firstName} {user.lastName}
                    </div>
                )}

                {showBio && user.bio && (
                    <div className="bio">{user.bio}</div>
                )}

                {showFollowersCount && user.followersCount > 0 && (
                    <div className="followers">
                        {formatNumber(user.followersCount)} followers
                    </div>
                )}
            </div>

            {showFollowingBadge && user.isFollowedByCurrentUser && (
                <div className="following-badge">Following</div>
            )}
        </div>
    )

    // If no onClick handler, wrap with Link for navigation
    if (!onClick) {
        return (
            <Link to={`/profile/${user.id}`} className="user-list-item-link">
                {content}
            </Link>
        )
    }

    return content
}

export default UserListItem