/**
 * PHOTO COMMENTS COMPONENT
 * Purpose: Handle comments display and input
 * Responsibilities:
 * - Show comments count and toggle
 * - Display recent comments
 * - Handle comment input and submission
 * - Manage comments loading state
 */

import { useState, useEffect } from 'react'
import { commentService } from '../../services/commentService'
import Avatar from '../common/Avatar'
import {LoadingSpinner} from '../common/LoadingSpinner'
import { formatRelativeTime } from '../../utils/helpers'

const PhotoComments = ({
                           photoId,
                           commentsCount,
                           showComments,
                           onToggleComments,
                           commentText,
                           onCommentTextChange,
                           onCommentSubmit,
                           currentUser
                       }) => {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    /**
     * Load comments when section is expanded
     */
    useEffect(() => {
        if (showComments && comments.length === 0) {
            loadComments()
        }
    }, [showComments, photoId])

    /**
     * Load comments from API
     */
    const loadComments = async () => {
        try {
            setLoading(true)
            const response = await commentService.getPhotoComments(photoId)
            setComments(response.data || [])
        } catch (error) {
            console.error('Failed to load comments:', error)
        } finally {
            setLoading(false)
        }
    }

    /**
     * Handle comment submission with API call
     */
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!commentText.trim() || submitting) return

        try {
            setSubmitting(true)
            const response = await commentService.createComment(photoId, {
                text: commentText.trim()
            })

            if (response.success) {
                // Add new comment to local state
                setComments(prev => [...prev, response.data])
                await onCommentSubmit(e)
            }
        } catch (error) {
            console.error('Failed to submit comment:', error)
        } finally {
            setSubmitting(false)
        }
    }

    /**
     * Render comments count button
     */
    const renderCommentsCount = () => {
        if (commentsCount === 0) return null

        return (
            <button
                className="view-comments-btn"
                onClick={onToggleComments}
                aria-expanded={showComments}
            >
                {showComments
                    ? 'Hide comments'
                    : `View all ${commentsCount} comments`
                }
            </button>
        )
    }

    /**
     * Render comments list
     */
    const renderCommentsList = () => {
        if (!showComments) return null

        return (
            <div className="comments-section">
                {loading ? (
                    <div className="comments-loading">
                        <LoadingSpinner size="small" message="Loading comments..." />
                    </div>
                ) : (
                    <div className="comments-list">
                        {comments.map(comment => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                currentUserId={currentUser?.id}
                            />
                        ))}
                    </div>
                )}
            </div>
        )
    }

    /**
     * Render comment input form
     */
    const renderCommentInput = () => {
        return (
            <form onSubmit={handleSubmit} className="add-comment">
                <Avatar
                    src={currentUser?.imageUrl}
                    alt="Your avatar"
                    fallback={currentUser?.username?.charAt(0)?.toUpperCase()}
                    size="small"
                />

                <input
                    type="text"
                    placeholder="Add a comment..."
                    className="comment-input"
                    value={commentText}
                    onChange={(e) => onCommentTextChange(e.target.value)}
                    disabled={submitting}
                    maxLength={500}
                />

                <button
                    type="submit"
                    className="post-comment-btn"
                    disabled={!commentText.trim() || submitting}
                >
                    {submitting ? 'Posting...' : 'Post'}
                </button>
            </form>
        )
    }

    return (
        <div className="photo-comments">
            {renderCommentsCount()}
            {renderCommentsList()}
            {renderCommentInput()}
        </div>
    )
}

/**
 * Individual Comment Item Component
 */
const CommentItem = ({ comment, currentUserId }) => {
    const [showOptions, setShowOptions] = useState(false)
    const isOwner = comment.userId === currentUserId

    /**
     * Handle comment options (edit/delete)
     */
    const handleOptions = () => {
        setShowOptions(prev => !prev)
    }

    /**
     * Handle comment deletion
     */
    const handleDelete = async () => {
        try {
            await commentService.deleteComment(comment.id)
            // TODO: Remove from parent state
        } catch (error) {
            console.error('Failed to delete comment:', error)
        }
    }

    return (
        <div className="comment-item">
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

                    {isOwner && (
                        <button
                            className="comment-options"
                            onClick={handleOptions}
                        >
                            Options
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PhotoComments