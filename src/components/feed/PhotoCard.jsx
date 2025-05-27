/**
 * PHOTO CARD COMPONENT - CLEAN ARCHITECTURE
 * Purpose: Display individual photo with interactions
 * Responsibilities:
 * - Render photo card UI
 * - Handle user interactions via callbacks
 * - Manage card-specific state
 * - One module, one responsibility
 */

import { useState } from 'react'
import PhotoHeader from './PhotoHeader'
import PhotoImage from './PhotoImage'
import PhotoActions from './PhotoActions'
import PhotoStats from './PhotoStats'
import PhotoCaption from './PhotoCaption'
import PhotoComments from './PhotoComments'
import './PhotoCard.css'

const PhotoCard = ({
                       photo,
                       onLike,
                       onComment,
                       onShare,
                       onSave,
                       currentUser
                   }) => {
    // Local state for this specific photo
    const [showComments, setShowComments] = useState(false)
    const [commentText, setCommentText] = useState('')

    /**
     * Handle like toggle
     */
    const handleLike = () => {
        onLike(photo.id)
    }

    /**
     * Handle comment submission
     */
    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        if (commentText.trim()) {
            const success = await onComment(photo.id, commentText.trim())
            if (success) {
                setCommentText('')
            }
        }
    }

    /**
     * Handle comments section toggle
     */
    const handleCommentsToggle = () => {
        setShowComments(prev => !prev)
    }

    /**
     * Handle share
     */
    const handleShare = () => {
        onShare(photo.id)
    }

    /**
     * Handle save/bookmark
     */
    const handleSave = () => {
        onSave(photo.id)
    }

    return (
        <article className="photo-card">
            {/* Photo Header */}
            <PhotoHeader
                username={photo.username}
                userImageUrl={photo.userImageUrl}
                createdAt={photo.createdAt}
                userId={photo.userId}
            />

            {/* Photo Image */}
            <PhotoImage
                imageURL={photo.imageURL}
                caption={photo.caption}
                username={photo.username}
            />

            {/* Photo Actions */}
            <PhotoActions
                isLiked={photo.isLikedByCurrentUser}
                onLike={handleLike}
                onComment={handleCommentsToggle}
                onShare={handleShare}
                onSave={handleSave}
            />

            {/* Photo Stats */}
            <PhotoStats
                likesCount={photo.likesCount}
                photoId={photo.id}
            />

            {/* Photo Caption */}
            <PhotoCaption
                username={photo.username}
                caption={photo.caption}
                tags={photo.tags}
                userId={photo.userId}
            />

            {/* Comments Section */}
            <PhotoComments
                photoId={photo.id}
                commentsCount={photo.commentsCount}
                showComments={showComments}
                onToggleComments={handleCommentsToggle}
                commentText={commentText}
                onCommentTextChange={setCommentText}
                onCommentSubmit={handleCommentSubmit}
                currentUser={currentUser}
            />
        </article>
    )
}

export default PhotoCard