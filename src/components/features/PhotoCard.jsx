import { useState } from 'react';
import './PhotoCard.css';

/**
 * PhotoCard component displays a photo with user info, caption, and interaction options
 * @param {Object} props - Component props
 * @param {Object} props.photo - Photo data object
 * @param {string} props.photo.id - Unique photo ID
 * @param {string} props.photo.imageUrl - URL of the photo
 * @param {string} props.photo.caption - Photo caption
 * @param {Array} props.photo.hashtags - Array of hashtags
 * @param {Object} props.photo.user - User who posted the photo
 * @param {number} props.photo.likes - Number of likes
 * @param {Array} props.photo.comments - Array of comments
 */
function PhotoCard({ photo }) {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(photo.likes || 0);
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState('');

    const handleLike = () => {
        // Toggle like state
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);

        // API call would go here in a real app
    };

    const handleComment = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        // Add comment logic would go here
        console.log('New comment:', comment);
        setComment('');

        // API call would go here in a real app
    };

    return (
        <div className="photo-card">
            {/* Card header with user info */}
            <div className="photo-card-header">
                <img
                    src={photo.user.avatar || '/default-avatar.png'}
                    alt={photo.user.username}
                    className="user-avatar"
                />
                <span className="username">{photo.user.username}</span>
                <button className="more-options">•••</button>
            </div>

            {/* Photo */}
            <div className="photo-container">
                <img src={photo.imageUrl} alt={photo.caption} className="photo-image" />
            </div>

            {/* Action buttons */}
            <div className="photo-actions">
                <button
                    className={`action-button ${isLiked ? 'liked' : ''}`}
                    onClick={handleLike}
                >
                    {isLiked ? '❤️' : '🤍'}
                </button>
                <button
                    className="action-button"
                    onClick={() => setShowComments(!showComments)}
                >
                    💬
                </button>
                <button className="action-button">🔗</button>
                <button className="action-button save">🔖</button>
            </div>

            {/* Likes count */}
            <div className="likes-count">
                {likes} likes
            </div>

            {/* Caption and hashtags */}
            <div className="photo-caption">
                <span className="caption-username">{photo.user.username}</span> {photo.caption}
                <div className="hashtags">
                    {photo.hashtags.map((tag, index) => (
                        <span key={index} className="hashtag">#{tag}</span>
                    ))}
                </div>
            </div>

            {/* Comments section */}
            {showComments && (
                <div className="comments-section">
                    <div className="comments-list">
                        {photo.comments && photo.comments.length > 0 ? (
                            photo.comments.map((comment, index) => (
                                <div key={index} className="comment">
                                    <span className="comment-username">{comment.username}</span>
                                    <span className="comment-text">{comment.text}</span>
                                </div>
                            ))
                        ) : (
                            <p className="no-comments">No comments yet.</p>
                        )}
                    </div>

                    <form onSubmit={handleComment} className="comment-form">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="comment-input"
                        />
                        <button
                            type="submit"
                            className="post-comment-btn"
                            disabled={!comment.trim()}
                        >
                            Post
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default PhotoCard;