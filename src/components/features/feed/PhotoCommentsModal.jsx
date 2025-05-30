/**
 * PHOTO COMMENTS MODAL COMPONENT
 * Purpose: Full-screen modal showing photo with comments (Instagram-style)
 * Responsibilities:
 * - Display photo on left, comments on right
 * - Handle comment interactions
 * - Manage modal open/close state
 * - Load and display all comments
 */

import { useState, useEffect, useRef } from 'react'
import { X, Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react'
import Avatar from '../../common/Avatar.jsx'
import { commentService } from '../../../services/commentService.js'
import { photoService } from '../../../services/photoService.js'
import { formatRelativeTime, formatNumber } from '../../../utils/helpers.js'
import '../../../styles/components/PhotoCommentsModal.css'

const PhotoCommentsModal = ({
                                photo,
                                isOpen,
                                onClose,
                                onLike,
                                currentUser
                            }) => {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    const [commentText, setCommentText] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const commentsEndRef = useRef(null)

    /**
     * Load comments when modal opens
     */
    useEffect(() => {
        if (isOpen && photo) {
            loadComments()
        }
    }, [isOpen, photo?.id])

    /**
     * Scroll to bottom when new comment added
     */
    useEffect(() => {
        if (comments.length > 0) {
            scrollToBottom()
        }
    }, [comments])

    /**
     * Handle escape key to close modal
     */
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    /**
     * Load all comments for the photo
     */
    const loadComments = async () => {
        try {
            setLoading(true)
            const response = await commentService.getPhotoComments(photo.id)
            if (response.success) {
                setComments(response.data || [])
            }
        } catch (error) {
            console.error('Failed to load comments:', error)
        } finally {
            setLoading(false)
        }
    }

    /**
     * Handle comment submission
     */
    const handleCommentSubmit = async (e) => {
        e.preventDefault()

        if (!commentText.trim() || submitting) return

        try {
            setSubmitting(true)
            const response = await commentService.createComment(photo.id, {
                text: commentText.trim()
            })

            if (response.success) {
                setComments(prev => [...prev, response.data])
                setCommentText('')
            }
        } catch (error) {
            console.error('Failed to add comment:', error)
        } finally {
            setSubmitting(false)
        }
    }

    /**
     * Handle like toggle
     */
    const handleLike = () => {
        onLike(photo.id)
    }

    /**
     * Scroll to bottom of comments
     */
    const scrollToBottom = () => {
        commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    /**
     * Handle overlay click to close modal
     */
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    if (!isOpen || !photo) return null

    return (
        <div className="comments-modal-overlay" onClick={handleOverlayClick}>
            <div className="comments-modal">
                {/* Close Button */}
                <button
                    className="comments-modal-close"
                    onClick={onClose}
                    aria-label="Close comments"
                >
                    <X size={24} />
                </button>

                {/* Left Side - Photo */}
                <div className="comments-modal-image-section">
                    <img
                        src={photo.imageURL}
                        alt={photo.caption || `Photo by ${photo.username}`}
                        className="comments-modal-image"
                    />
                </div>

                {/* Right Side - Comments Section */}
                <div className="comments-modal-content">
                    {/* Header with user info */}
                    <div className="comments-modal-header">
                        <Avatar
                            src={photo.userImageUrl}
                            alt={`${photo.username}'s avatar`}
                            fallback={photo.username?.charAt(0)?.toUpperCase()}
                            size="medium"
                        />
                        <div className="comments-modal-user-info">
                            <span className="comments-modal-username">
                                {photo.username}
                            </span>
                            <span className="comments-modal-time">
                                {formatRelativeTime(photo.createdAt)}
                            </span>
                        </div>
                        <button className="comments-modal-menu">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>

                    {/* Caption as first comment */}
                    {photo.caption && (
                        <div className="comments-modal-caption">
                            <Avatar
                                src={photo.userImageUrl}
                                alt={`${photo.username}'s avatar`}
                                fallback={photo.username?.charAt(0)?.toUpperCase()}
                                size="small"
                            />
                            <div className="comment-content">
                                <div className="comment-text">
                                    <span className="comment-username">{photo.username}</span>
                                    <span className="comment-message">{photo.caption}</span>
                                </div>
                                <div className="comment-meta">
                                    <span className="comment-time">
                                        {formatRelativeTime(photo.createdAt)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Comments List */}
                    <div className="comments-modal-list">
                        {loading ? (
                            <div className="comments-loading">
                                <div className="loading-spinner">Loading comments...</div>
                            </div>
                        ) : (
                            <>
                                {comments.map(comment => (
                                    <CommentItem
                                        key={comment.id}
                                        comment={comment}
                                        currentUserId={currentUser?.id}
                                    />
                                ))}
                                <div ref={commentsEndRef} />
                            </>
                        )}
                    </div>

                    {/* Actions and Stats */}
                    <div className="comments-modal-actions">
                        <div className="action-buttons">
                            <button
                                className={`action-btn like-btn ${photo.isLikedByCurrentUser ? 'liked' : ''}`}
                                onClick={handleLike}
                                aria-label={photo.isLikedByCurrentUser ? 'Unlike' : 'Like'}
                            >
                                <Heart
                                    size={24}
                                    fill={photo.isLikedByCurrentUser ? 'currentColor' : 'none'}
                                />
                            </button>
                            <button className="action-btn">
                                <MessageCircle size={24} />
                            </button>
                            <button className="action-btn">
                                <Send size={24} />
                            </button>
                            <button className="action-btn save-btn">
                                <Bookmark size={24} />
                            </button>
                        </div>

                        {/* Likes count */}
                        {photo.likesCount > 0 && (
                            <div className="likes-count">
                                <strong>{formatNumber(photo.likesCount)} likes</strong>
                            </div>
                        )}
                    </div>

                    {/* Add Comment Form */}
                    <form onSubmit={handleCommentSubmit} className="comments-modal-form">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="comment-input-modal"
                            disabled={submitting}
                            maxLength={500}
                        />
                        <button
                            type="submit"
                            className="post-comment-btn-modal"
                            disabled={!commentText.trim() || submitting}
                        >
                            {submitting ? 'Posting...' : 'Post'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

/**
 * Individual Comment Item for Modal
 */
const CommentItem = ({ comment, currentUserId }) => {
    const [showOptions, setShowOptions] = useState(false)
    const [liked, setLiked] = useState(false)
    const isOwner = comment.userId === currentUserId

    /**
     * Handle comment like
     */
    const handleLike = () => {
        setLiked(prev => !prev)
        // TODO: API call to like comment
    }

    /**
     * Handle comment delete
     */
    const handleDelete = async () => {
        try {
            await commentService.deleteComment(comment.id)
            // TODO: Remove from comments list
        } catch (error) {
            console.error('Failed to delete comment:', error)
        }
    }

    return (
        <div className="comment-item-modal">
            <Avatar
                src={comment.userImageUrl}
                alt={`${comment.username}'s avatar`}
                fallback={comment.username?.charAt(0)?.toUpperCase()}
                size="small"
            />
            <div className="comment-content">
                <div className="comment-text">
                    <span className="comment-username">{comment.username}</span>
                    <span className="comment-message">{comment.text}</span>
                </div>
                <div className="comment-meta">
                    <span className="comment-time">
                        {formatRelativeTime(comment.createdAt)}
                    </span>
                    <button
                        className="comment-reply"
                        onClick={() => console.log('Reply to comment')}
                    >
                        Reply
                    </button>
                    {isOwner && (
                        <button
                            className="comment-delete"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>
            <button
                className={`comment-like-btn ${liked ? 'liked' : ''}`}
                onClick={handleLike}
                aria-label={liked ? 'Unlike comment' : 'Like comment'}
            >
                <Heart size={12} fill={liked ? 'currentColor' : 'none'} />
            </button>
        </div>
    )
}

export default PhotoCommentsModal