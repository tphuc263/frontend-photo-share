/**
 * POST COMPONENT - SINGLE RESPONSIBILITY
 * Purpose: Display individual post with all interactions
 * Responsibilities:
 * - Render post UI (header, image, actions, comments)
 * - Handle post interactions (like, comment, share, save)
 * - Manage post-specific state
 * - No data fetching or global state management
 */

import { useState } from 'react'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react'

const Post = ({ post, onLike, onComment, onShare, onSave }) => {
    // Local state for this specific post
    const [showComments, setShowComments] = useState(false)
    const [commentText, setCommentText] = useState('')

    /**
     * Handle like button click
     */
    const handleLike = () => {
        onLike(post.id)
    }

    /**
     * Handle comment submission
     */
    const handleCommentSubmit = (e) => {
        e.preventDefault()
        if (commentText.trim()) {
            onComment(post.id, commentText.trim())
            setCommentText('')
        }
    }

    /**
     * Handle comment section toggle
     */
    const handleCommentToggle = () => {
        setShowComments(prev => !prev)
    }

    /**
     * Handle share functionality
     */
    const handleShare = () => {
        onShare(post.id)
    }

    /**
     * Handle save functionality
     */
    const handleSave = () => {
        onSave(post.id)
    }

    return (
        <article className="post-container">
            {/* Post Header - User info and menu */}
            <PostHeader
                user={post.user}
                timeAgo={post.timeAgo}
                onMenuClick={() => console.log('Menu clicked for post:', post.id)}
            />

            {/* Post Image */}
            <PostImage
                src={post.image}
                alt={`Post by ${post.user.username}`}
            />

            {/* Post Actions */}
            <PostActions
                isLiked={post.isLiked}
                onLike={handleLike}
                onComment={handleCommentToggle}
                onShare={handleShare}
                onSave={handleSave}
            />

            {/* Post Stats */}
            <PostStats
                likesCount={post.likes}
                onLikesClick={() => console.log('Show likes for:', post.id)}
            />

            {/* Post Caption */}
            <PostCaption
                username={post.user.username}
                caption={post.caption}
            />

            {/* Comments Section */}
            <CommentsSection
                comments={post.comments}
                showComments={showComments}
                onToggleComments={handleCommentToggle}
                commentText={commentText}
                onCommentTextChange={setCommentText}
                onCommentSubmit={handleCommentSubmit}
            />
        </article>
    )
}

/**
 * Post Header Sub-component
 */
const PostHeader = ({ user, timeAgo, onMenuClick }) => (
    <header className="post-header">
        <div className="post-avatar">
            {user.avatar}
        </div>
        <div className="post-user-info">
            <div className="post-username">{user.username}</div>
            <div className="post-time">{timeAgo}</div>
        </div>
        <button
            className="action-btn"
            onClick={onMenuClick}
            aria-label="More options"
        >
            <MoreHorizontal size={20} />
        </button>
    </header>
)

/**
 * Post Image Sub-component
 */
const PostImage = ({ src, alt }) => (
    <div className="post-image-container">
        <img
            src={src}
            alt={alt}
            className="post-image"
            loading="lazy"
        />
    </div>
)

/**
 * Post Actions Sub-component
 */
const PostActions = ({ isLiked, onLike, onComment, onShare, onSave }) => (
    <div className="post-actions">
        <div className="action-buttons">
            <button
                className={`action-btn ${isLiked ? 'liked' : ''}`}
                onClick={onLike}
                aria-label={isLiked ? 'Unlike' : 'Like'}
            >
                <Heart
                    size={24}
                    fill={isLiked ? 'currentColor' : 'none'}
                />
            </button>

            <button
                className="action-btn"
                onClick={onComment}
                aria-label="Comment"
            >
                <MessageCircle size={24} />
            </button>

            <button
                className="action-btn"
                onClick={onShare}
                aria-label="Share"
            >
                <Send size={24} />
            </button>

            <button
                className="action-btn"
                onClick={onSave}
                aria-label="Save"
                style={{ marginLeft: 'auto' }}
            >
                <Bookmark size={24} />
            </button>
        </div>
    </div>
)

/**
 * Post Stats Sub-component
 */
const PostStats = ({ likesCount, onLikesClick }) => (
    <div className="post-stats">
        <strong
            onClick={onLikesClick}
            style={{ cursor: 'pointer' }}
        >
            {likesCount.toLocaleString()} likes
        </strong>
    </div>
)

/**
 * Post Caption Sub-component
 */
const PostCaption = ({ username, caption }) => (
    <div className="post-caption">
        <span className="username">{username}</span>
        {caption}
    </div>
)

/**
 * Comments Section Sub-component
 */
const CommentsSection = ({
                             comments,
                             showComments,
                             onToggleComments,
                             commentText,
                             onCommentTextChange,
                             onCommentSubmit
                         }) => (
    <>
        {/* View Comments Button */}
        {comments > 0 && (
            <button
                className="view-comments-btn"
                onClick={onToggleComments}
            >
                View all {comments} comments
            </button>
        )}

        {/* Comments Container */}
        {showComments && (
            <div className="comments-section">
                {/* Mock comments - will be replaced with real data */}
                <div className="comment">
                    <span className="comment-username">john_doe</span>
                    <span className="comment-text">Amazing shot! 📸</span>
                </div>
                <div className="comment">
                    <span className="comment-username">photo_enthusiast</span>
                    <span className="comment-text">Love the composition and lighting!</span>
                </div>
            </div>
        )}

        {/* Add Comment Input */}
        <form onSubmit={onCommentSubmit} className="add-comment">
            <input
                type="text"
                placeholder="Add a comment..."
                className="comment-input"
                value={commentText}
                onChange={(e) => onCommentTextChange(e.target.value)}
            />
            <button
                type="submit"
                className="post-comment-btn"
                disabled={!commentText.trim()}
            >
                Post
            </button>
        </form>
    </>
)

export default Post