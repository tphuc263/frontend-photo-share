/**
 * UPDATED PHOTO COMMENTS COMPONENT
 * Purpose: Handle comments display and input with modal integration
 * Responsibilities:
 * - Show comments count and toggle
 * - Open comments modal for full view
 * - Handle comment input and submission
 * - Display recent comments inline
 */

import {useEffect, useState} from 'react'
import {commentService} from '../../../services/commentService.js'
import PhotoCommentsModal from './PhotoCommentsModal.jsx'
import Avatar from '../../common/Avatar.jsx'
import {LoadingSpinner} from '../../common/LoadingSpinner.jsx'
import {formatRelativeTime} from '../../../utils/helpers.js'

const PhotoComments = ({
                           photoId,
                           commentsCount,
                           showComments,
                           onToggleComments,
                           commentText,
                           onCommentTextChange,
                           onCommentSubmit,
                           currentUser,
                           photo,
                           onLike
                       }) => {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [showModal, setShowModal] = useState(false)

    /**
     * Load recent comments when section is expanded
     */
    useEffect(() => {
        if (showComments && comments.length === 0) {
            loadRecentComments()
        }
    }, [showComments, photoId])

    /**
     * Load recent comments (first 3-5 comments)
     */
    const loadRecentComments = async () => {
        try {
            setLoading(true)
            const response = await commentService.getPhotoComments(photoId)
            // Show only first 3 comments inline, rest in modal
            const recentComments = response.data?.slice(0, 3) || []
            setComments(recentComments)
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
                setComments(prev => [...prev.slice(-2), response.data])
                await onCommentSubmit(e)
            }
        } catch (error) {
            console.error('Failed to submit comment:', error)
        } finally {
            setSubmitting(false)
        }
    }

    /**
     * Open comments modal
     */
    const handleOpenModal = () => {
        setShowModal(true)
    }

    /**
     * Close comments modal
     */
    const handleCloseModal = () => {
        setShowModal(false)
    }

    /**
     * Render comments count button
     */
    const renderCommentsCount = () => {
        if (commentsCount === 0) return null

        return (
            <button
                className="view-comments-btn"
                onClick={handleOpenModal}
                aria-expanded={showComments}
            >
                {commentsCount === 1
                    ? 'View 1 comment'
                    : `View all ${commentsCount} comments`
                }
            </button>
        )
    }

    /**
     * Render recent comments list (inline)
     */
    const renderRecentComments = () => {
        if (!showComments) return null

        return (
            <div className="comments-section">
                {loading ? (
                    <div className="comments-loading">
                        <LoadingSpinner size="small" message="Loading comments..."/>
                    </div>
                ) : (
                    <div className="comments-list">
                        {comments.map(comment => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                currentUserId={currentUser?.id}
                                isInline={true}
                            />
                        ))}
                        {commentsCount > 3 && (
                            <button
                                className="view-more-comments"
                                onClick={handleOpenModal}
                            >
                                View all {commentsCount} comments
                            </button>
                        )}
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
            {renderRecentComments()}
            {renderCommentInput()}

            {/* Comments Modal */}
            <PhotoCommentsModal
                photo={photo}
                isOpen={showModal}
                onClose={handleCloseModal}
                onLike={onLike}
                currentUser={currentUser}
            />
        </div>
    )
}

/**
 * Individual Comment Item Component
 */
const CommentItem = ({comment, currentUserId, isInline = false}) => {
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

    const commentClass = isInline ? 'comment-item' : 'comment-item-modal'

    return (
        <div className={commentClass}>
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